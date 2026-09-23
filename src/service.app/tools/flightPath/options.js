// What the user asked for from a flight path export. A plain settings bag whose only
// behavior is normalization, so the builder never has to defend against a bad value.

import { normalizeRgb } from './model/geo';

export const Waypoint = Object.freeze({
	PAD: 'pad',
	LIFTOFF: 'liftoff',
	MAX_ACCELERATION: 'maxAcceleration',
	MAX_VELOCITY: 'maxVelocity',
	APOGEE: 'apogee',
	DROGUE: 'drogue',
	MAIN: 'main',
	LANDING: 'landing'
});

/** Display and export order. */
export const WaypointOrder = Object.freeze([
	Waypoint.PAD,
	Waypoint.LIFTOFF,
	Waypoint.MAX_ACCELERATION,
	Waypoint.MAX_VELOCITY,
	Waypoint.APOGEE,
	Waypoint.DROGUE,
	Waypoint.MAIN,
	Waypoint.LANDING
]);

export const AltitudeReference = Object.freeze({
	AUTOMATIC: 'automatic',
	GROUND: 'ground',
	SEA_LEVEL: 'seaLevel',
	CLAMPED: 'clamped'
});

export const AltitudeReferenceOrder = Object.freeze([
	AltitudeReference.AUTOMATIC,
	AltitudeReference.GROUND,
	AltitudeReference.SEA_LEVEL,
	AltitudeReference.CLAMPED
]);

// The reference carries its own KML wire format so nothing downstream switches on it.
const KML_ALTITUDE_MODE = Object.freeze({
	[AltitudeReference.GROUND]: 'relativeToGround',
	[AltitudeReference.SEA_LEVEL]: 'absolute',
	[AltitudeReference.CLAMPED]: 'clampToGround'
});

export function isAltitudeReference(value) {
	return AltitudeReferenceOrder.includes(value);
}

/**
 * Resolves AUTOMATIC against whether the data can be placed against sea level; any other
 * value is returned as-is, except that SEA_LEVEL without sea level data falls back to
 * GROUND, because placing heights above the pad against sea level draws the whole flight
 * underground where Google Earth shows nothing at all.
 */
export function resolveAltitudeReference(reference, hasSeaLevel) {
	const value = isAltitudeReference(reference) ? reference : AltitudeReference.AUTOMATIC;
	if (value === AltitudeReference.AUTOMATIC)
		return hasSeaLevel ? AltitudeReference.SEA_LEVEL : AltitudeReference.GROUND;
	if (value === AltitudeReference.SEA_LEVEL && !hasSeaLevel)
		return AltitudeReference.GROUND;
	return value;
}

export function kmlAltitudeMode(resolvedReference) {
	return KML_ALTITUDE_MODE[resolvedReference] ?? KML_ALTITUDE_MODE[AltitudeReference.GROUND];
}

/**
 * Presets are named points in the existing option space, not a fourth mode. Each one
 * states the whole selection it covers, so any preset is reachable from any other and the
 * result never depends on click history. No preset turns on the shadow: under a whole
 * arcing path the extrude is a solid wall that buries the flight it is meant to explain.
 */
export const Presets = Object.freeze({
	/** What the rocket drifts over: everything flat on the terrain. */
	driftCast: Object.freeze({
		id: 'driftCast',
		altitudeReference: AltitudeReference.CLAMPED,
		waypointAltitudeReference: AltitudeReference.CLAMPED,
		includeFlightPath: false,
		includeGroundTrack: true,
		drawShadow: false,
		waypoints: WaypointOrder
	}),
	/** How high it went: suspended in the air. The default state of a fresh panel. */
	flightPath: Object.freeze({
		id: 'flightPath',
		altitudeReference: AltitudeReference.AUTOMATIC,
		waypointAltitudeReference: AltitudeReference.AUTOMATIC,
		includeFlightPath: true,
		includeGroundTrack: true,
		drawShadow: false,
		waypoints: WaypointOrder
	}),
	/** Where it comes down, and nothing else. */
	landing: Object.freeze({
		id: 'landing',
		altitudeReference: AltitudeReference.CLAMPED,
		waypointAltitudeReference: AltitudeReference.CLAMPED,
		includeFlightPath: false,
		includeGroundTrack: false,
		drawShadow: false,
		waypoints: [Waypoint.LANDING]
	})
});

export const PresetOrder = Object.freeze(['driftCast', 'flightPath', 'landing']);

function sameWaypoints(a, b) {
	const setA = new Set(a);
	const setB = new Set(b);
	if (setA.size !== setB.size)
		return false;
	for (const item of setA) {
		if (!setB.has(item))
			return false;
	}
	return true;
}

/** The preset whose every value matches the options, or null when none does. */
export function presetMatching(options) {
	for (const id of PresetOrder) {
		const preset = Presets[id];
		if (options.altitudeReference === preset.altitudeReference &&
			options.waypointAltitudeReference === preset.waypointAltitudeReference &&
			options.includeFlightPath === preset.includeFlightPath &&
			options.includeGroundTrack === preset.includeGroundTrack &&
			options.drawShadow === preset.drawShadow &&
			sameWaypoints(options.waypoints, preset.waypoints))
			return id;
	}
	return null;
}

function toBoolean(value, fallback) {
	if (value === true || value === false)
		return value;
	if (value === 'true')
		return true;
	if (value === 'false')
		return false;
	return fallback;
}

function toColorMap(value) {
	const result = {};
	if (!value || typeof value !== 'object')
		return result;
	for (const [key, color] of Object.entries(value)) {
		const rgb = normalizeRgb(color);
		if (rgb)
			result[key] = rgb;
	}
	return result;
}

export class FlightPathExportOptions {
	constructor(init) {
		// Defaults are the "flightPath" preset; the panel's fresh state must match it.
		this._waypoints = new Set(WaypointOrder);
		this._includeFlightPath = true;
		this._includeGroundTrack = true;
		this._pathStride = 1;
		this._altitudeReference = AltitudeReference.AUTOMATIC;
		this._waypointAltitudeReference = AltitudeReference.AUTOMATIC;
		this._drawShadow = false;
		this._missionName = '';
		this._labelWaypointsWithMission = false;
		this._showWaypointLabels = true;
		this._colorWaypointPins = true;
		this._colorWaypointPinsByFlight = false;
		this._includeDescriptions = true;
		this._oneFilePerFlight = false;
		this._filterMaxSpeedMps = 300;
		this._launchAltitudeMeters = null;
		this._branchColors = {};
		this._branchGroundColors = {};
		this._branchPinColors = {};
		this._pinColors = {};

		if (init)
			this.assign(init);
	}

	/** Applies any subset of fields from a plain object (a stored preference or a preset). */
	assign(init) {
		if (!init || typeof init !== 'object')
			return this;
		if ('waypoints' in init)
			this.waypoints = init.waypoints;
		if ('includeFlightPath' in init)
			this.includeFlightPath = init.includeFlightPath;
		if ('includeGroundTrack' in init)
			this.includeGroundTrack = init.includeGroundTrack;
		if ('pathStride' in init)
			this.pathStride = init.pathStride;
		if ('altitudeReference' in init)
			this.altitudeReference = init.altitudeReference;
		if ('waypointAltitudeReference' in init)
			this.waypointAltitudeReference = init.waypointAltitudeReference;
		if ('drawShadow' in init)
			this.drawShadow = init.drawShadow;
		if ('missionName' in init)
			this.missionName = init.missionName;
		if ('labelWaypointsWithMission' in init)
			this.labelWaypointsWithMission = init.labelWaypointsWithMission;
		if ('showWaypointLabels' in init)
			this.showWaypointLabels = init.showWaypointLabels;
		if ('colorWaypointPins' in init)
			this.colorWaypointPins = init.colorWaypointPins;
		if ('colorWaypointPinsByFlight' in init)
			this.colorWaypointPinsByFlight = init.colorWaypointPinsByFlight;
		if ('includeDescriptions' in init)
			this.includeDescriptions = init.includeDescriptions;
		if ('oneFilePerFlight' in init)
			this.oneFilePerFlight = init.oneFilePerFlight;
		if ('filterMaxSpeedMps' in init)
			this.filterMaxSpeedMps = init.filterMaxSpeedMps;
		if ('launchAltitudeMeters' in init)
			this.launchAltitudeMeters = init.launchAltitudeMeters;
		if ('branchColors' in init)
			this.branchColors = init.branchColors;
		if ('branchGroundColors' in init)
			this.branchGroundColors = init.branchGroundColors;
		if ('branchPinColors' in init)
			this.branchPinColors = init.branchPinColors;
		if ('pinColors' in init)
			this.pinColors = init.pinColors;
		return this;
	}

	applyPreset(presetId) {
		const preset = Presets[presetId];
		if (!preset)
			return this;
		return this.assign(preset);
	}

	get waypoints() { return WaypointOrder.filter(w => this._waypoints.has(w)); }
	set waypoints(value) {
		const list = Array.isArray(value) ? value : (value instanceof Set ? [...value] : []);
		this._waypoints = new Set(list.filter(w => WaypointOrder.includes(w)));
	}
	hasWaypoint(type) { return this._waypoints.has(type); }
	setWaypoint(type, selected) {
		if (!WaypointOrder.includes(type))
			return;
		if (selected)
			this._waypoints.add(type);
		else
			this._waypoints.delete(type);
	}

	get includeFlightPath() { return this._includeFlightPath; }
	set includeFlightPath(value) { this._includeFlightPath = toBoolean(value, true); }

	get includeGroundTrack() { return this._includeGroundTrack; }
	set includeGroundTrack(value) { this._includeGroundTrack = toBoolean(value, true); }

	get pathStride() { return this._pathStride; }
	set pathStride(value) {
		const n = Math.trunc(Number(value));
		this._pathStride = Number.isFinite(n) ? Math.max(1, n) : 1; // 0 would be an infinite loop
	}

	get altitudeReference() { return this._altitudeReference; }
	set altitudeReference(value) {
		this._altitudeReference = isAltitudeReference(value) ? value : AltitudeReference.AUTOMATIC;
	}

	get waypointAltitudeReference() { return this._waypointAltitudeReference; }
	set waypointAltitudeReference(value) {
		this._waypointAltitudeReference = isAltitudeReference(value) ? value : AltitudeReference.AUTOMATIC;
	}

	get drawShadow() { return this._drawShadow; }
	set drawShadow(value) { this._drawShadow = toBoolean(value, false); }

	get missionName() { return this._missionName; }
	set missionName(value) { this._missionName = value == null ? '' : String(value).trim(); }

	get labelWaypointsWithMission() { return this._labelWaypointsWithMission; }
	set labelWaypointsWithMission(value) { this._labelWaypointsWithMission = toBoolean(value, false); }

	get showWaypointLabels() { return this._showWaypointLabels; }
	set showWaypointLabels(value) { this._showWaypointLabels = toBoolean(value, true); }

	/** Colored pushpin icons need a network to load; off gives the viewer's default marker. */
	get colorWaypointPins() { return this._colorWaypointPins; }
	set colorWaypointPins(value) { this._colorWaypointPins = toBoolean(value, true); }

	/** Pins take their flight's color rather than their waypoint type's color. */
	get colorWaypointPinsByFlight() { return this._colorWaypointPinsByFlight; }
	set colorWaypointPinsByFlight(value) { this._colorWaypointPinsByFlight = toBoolean(value, false); }

	get includeDescriptions() { return this._includeDescriptions; }
	set includeDescriptions(value) { this._includeDescriptions = toBoolean(value, true); }

	get oneFilePerFlight() { return this._oneFilePerFlight; }
	set oneFilePerFlight(value) { this._oneFilePerFlight = toBoolean(value, false); }

	/** A sample whose implied horizontal speed from the last accepted sample exceeds this is dropped as a glitch; 0 disables. */
	get filterMaxSpeedMps() { return this._filterMaxSpeedMps; }
	set filterMaxSpeedMps(value) {
		const n = Number(value);
		this._filterMaxSpeedMps = Number.isFinite(n) && n > 0 ? n : 0;
	}

	/** Launch site elevation above sea level, or null when unknown. */
	get launchAltitudeMeters() { return this._launchAltitudeMeters; }
	set launchAltitudeMeters(value) {
		if (value === null || value === undefined || value === '') {
			this._launchAltitudeMeters = null;
			return;
		}
		const n = Number(value);
		this._launchAltitudeMeters = Number.isFinite(n) ? n : null;
	}

	get branchColors() { return { ...this._branchColors }; }
	set branchColors(value) { this._branchColors = toColorMap(value); }
	getBranchColor(index) { return this._branchColors[index] ?? null; }

	get branchGroundColors() { return { ...this._branchGroundColors }; }
	set branchGroundColors(value) { this._branchGroundColors = toColorMap(value); }
	getBranchGroundColor(index) { return this._branchGroundColors[index] ?? null; }

	get branchPinColors() { return { ...this._branchPinColors }; }
	set branchPinColors(value) { this._branchPinColors = toColorMap(value); }
	getBranchPinColor(index) { return this._branchPinColors[index] ?? null; }

	/** Per waypoint type overrides, keyed by Waypoint value. */
	get pinColors() { return { ...this._pinColors }; }
	set pinColors(value) { this._pinColors = toColorMap(value); }
	getPinColor(type) { return this._pinColors[type] ?? null; }

	/**
	 * The plain object that is persisted. The mission name is deliberately left out: it
	 * describes one particular flight, not how the user likes the exporter set up, and a
	 * stale one would quietly mislabel the next file.
	 */
	toStored() {
		return {
			waypoints: this.waypoints,
			includeFlightPath: this._includeFlightPath,
			includeGroundTrack: this._includeGroundTrack,
			pathStride: this._pathStride,
			altitudeReference: this._altitudeReference,
			waypointAltitudeReference: this._waypointAltitudeReference,
			drawShadow: this._drawShadow,
			labelWaypointsWithMission: this._labelWaypointsWithMission,
			showWaypointLabels: this._showWaypointLabels,
			colorWaypointPins: this._colorWaypointPins,
			colorWaypointPinsByFlight: this._colorWaypointPinsByFlight,
			includeDescriptions: this._includeDescriptions,
			oneFilePerFlight: this._oneFilePerFlight,
			filterMaxSpeedMps: this._filterMaxSpeedMps,
			launchAltitudeMeters: this._launchAltitudeMeters,
			branchColors: this.branchColors,
			branchGroundColors: this.branchGroundColors,
			branchPinColors: this.branchPinColors,
			pinColors: this.pinColors
		};
	}

	/** Everything, mission name included, for handing to the builder or a test. */
	toObject() {
		return { ...this.toStored(), missionName: this._missionName };
	}
}

export default FlightPathExportOptions;
