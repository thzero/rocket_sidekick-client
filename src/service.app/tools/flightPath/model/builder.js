// Turns normalized GPS flights plus export options into a format-agnostic model that a
// template renders. This is the only place that knows about outlier filtering, altitude
// datums, waypoint detection, coordinate math, or label qualification. Templates know
// nothing except field names, and this module knows nothing about services or Vue.
//
// Input contract:
//
//   flights: [{
//     id,                 // stable per flight
//     name,               // tracker id, or null
//     rows: [{ index, time, altitude, altitudeASL, altitudeAGL, latitude, longitude, velocityV, velocityH }],
//     liftoffIndex,       // position in rows where liftoff was detected, or -1
//     hasLanding,         // true only when the end-of-flight detection fired
//     events: [{ type: 'drogue' | 'main', rowIndex }]
//   }]
//
// Row values are in the processor's input units; `units` converts them:
//
//   units: {
//     altitudeToMeters(v), velocityToMps(v),
//     formatAltitude(m), formatVelocity(mps), formatAcceleration(mps2), formatDistance(m),
//     altitudeUnit, velocityUnit, accelerationUnit, distanceUnit   // display labels
//   }
//
//   labels: { pad, liftoff, maxAcceleration, maxVelocity, apogee, drogue, main, landing,
//             flightPath, groundTrack, flight, time, altitude, altitudeMsl, distance,
//             velocity, acceleration, maxAltitude, maxRange, timeToApogee, flightTime, source }

import {
	bearingDegrees,
	distanceMeters,
	fixed,
	isFiniteNumber,
	isNoFix,
	kmlColor,
	normalizeRgb,
	prefix,
	round
} from './geo';
import {
	AltitudeReference,
	FlightPathExportOptions,
	Waypoint,
	WaypointOrder,
	kmlAltitudeMode,
	resolveAltitudeReference
} from '../options';
import { BranchColors, GroundColors, PinColors } from '../../palette';

const DEFAULT_LABELS = Object.freeze({
	pad: 'Pad',
	liftoff: 'Liftoff',
	maxAcceleration: 'Max. Acceleration',
	maxVelocity: 'Max. Velocity',
	apogee: 'Apogee',
	drogue: 'Drogue',
	main: 'Main',
	ejection: 'Ejection',
	landing: 'Landing',
	flightPath: 'Flight Path',
	groundTrack: 'Ground Path',
	flight: 'Flight',
	time: 'Time',
	altitude: 'Altitude',
	altitudeMsl: 'Altitude (MSL)',
	distance: 'Distance',
	velocity: 'Velocity',
	acceleration: 'Acceleration',
	maxAltitude: 'Max. Altitude',
	maxRange: 'Max. Range',
	timeToApogee: 'Time to Apogee',
	flightTime: 'Flight Time',
	source: 'Source'
});

const identity = (v) => v;
const formatNumber = (v) => (isFiniteNumber(v) ? String(round(v, 2)) : '');

const DEFAULT_UNITS = Object.freeze({
	altitudeToMeters: identity,
	velocityToMps: identity,
	altitudeValue: (v) => round(v, 2),
	formatAltitude: formatNumber,
	formatVelocity: formatNumber,
	formatAcceleration: formatNumber,
	formatDistance: formatNumber,
	altitudeUnit: 'm',
	velocityUnit: 'm/s',
	accelerationUnit: 'm/s2',
	distanceUnit: 'm'
});

function asOptions(options) {
	if (options instanceof FlightPathExportOptions)
		return options;
	return new FlightPathExportOptions(options);
}

function toNumber(value) {
	if (value === null || value === undefined || value === '')
		return null;
	const n = typeof value === 'number' ? value : Number(value);
	return Number.isFinite(n) ? n : null;
}

// After this many consecutive rejections the track has really moved (a gap in the log,
// or a threshold set too low), so the next sample is accepted rather than losing the rest
// of the flight to a stale reference point.
const MAX_CONSECUTIVE_REJECTIONS = 3;

/**
 * Drops rows without a usable position, then rows whose implied horizontal speed from
 * the last accepted point exceeds the filter. A speed rather than a distance, because a
 * fixed distance per sample cannot tell a 10 Hz boost from a glitch: the comparison is
 * always against the last accepted point, so distance and elapsed time have to grow
 * together or one rejected sample makes every later one look like an outlier too. Rows
 * without a usable time difference are accepted.
 */
function acceptRows(rows, filterMaxSpeedMps) {
	const accepted = [];
	let dropped = 0;
	let rejectedInARow = 0;
	let previous = null;
	for (const row of rows || []) {
		const latitude = toNumber(row.latitude);
		const longitude = toNumber(row.longitude);
		if (latitude === null || longitude === null || isNoFix(latitude, longitude)) {
			dropped++;
			continue;
		}
		if (previous && filterMaxSpeedMps > 0 && rejectedInARow < MAX_CONSECUTIVE_REJECTIONS) {
			const d = distanceMeters(previous.latitude, previous.longitude, latitude, longitude);
			const time = toNumber(row.time);
			const previousTime = toNumber(previous.row.time);
			const dt = (time !== null && previousTime !== null) ? time - previousTime : null;
			if (dt !== null && dt > 0 && d / dt > filterMaxSpeedMps) {
				dropped++;
				rejectedInARow++;
				continue;
			}
		}
		rejectedInARow = 0;
		const point = { row, latitude, longitude };
		accepted.push(point);
		previous = point;
	}
	return { accepted, dropped };
}

/**
 * Resolves the altitude datum for a flight. Every point gets both a height above the
 * ground and a height above sea level when either can be known, so that no template
 * ever does arithmetic. What is unknown stays null and the template's line vanishes.
 */
function resolveAltitudes(points, units, launchAltitudeMeters) {
	const first = points.length > 0 ? points[0].row : null;
	const firstAsl = first ? toNumber(first.altitudeASL) : null;
	const firstAgl = first ? toNumber(first.altitudeAGL) : null;

	let launchMeters = isFiniteNumber(launchAltitudeMeters) ? launchAltitudeMeters : null;
	if (launchMeters === null && firstAsl !== null && firstAgl !== null)
		launchMeters = units.altitudeToMeters(firstAsl) - units.altitudeToMeters(firstAgl);

	for (const point of points) {
		const asl = toNumber(point.row.altitudeASL);
		const agl = toNumber(point.row.altitudeAGL);
		const generic = toNumber(point.row.altitude);

		let aglMeters = null;
		if (agl !== null)
			aglMeters = units.altitudeToMeters(agl);
		else if (asl !== null && launchMeters !== null)
			aglMeters = units.altitudeToMeters(asl) - launchMeters;
		else if (asl !== null && firstAsl !== null)
			aglMeters = units.altitudeToMeters(asl) - units.altitudeToMeters(firstAsl);
		else if (generic !== null)
			aglMeters = units.altitudeToMeters(generic);

		let mslMeters = null;
		if (asl !== null)
			mslMeters = units.altitudeToMeters(asl);
		else if (aglMeters !== null && launchMeters !== null)
			mslMeters = aglMeters + launchMeters;

		point.aglMeters = aglMeters;
		point.mslMeters = mslMeters;
	}

	return {
		launchMeters,
		hasSeaLevel: points.some(p => p.mslMeters !== null)
	};
}

function liftoffPosition(flight, points) {
	const liftoffIndex = Number.isInteger(flight.liftoffIndex) ? flight.liftoffIndex : -1;
	if (liftoffIndex < 0 || !flight.rows || !flight.rows[liftoffIndex])
		return points.length > 0 ? 0 : -1;
	const liftoffRow = flight.rows[liftoffIndex];
	const pos = points.findIndex(p => p.row === liftoffRow);
	if (pos >= 0)
		return pos;
	// The liftoff row itself was filtered; take the first accepted row at or after it.
	const after = points.findIndex(p => toNumber(p.row.time) !== null && toNumber(p.row.time) >= toNumber(liftoffRow.time));
	return after >= 0 ? after : 0;
}

function indexOfMax(points, valueOf, start = 0) {
	let best = -1;
	let bestValue = -Infinity;
	for (let i = Math.max(0, start); i < points.length; i++) {
		const v = valueOf(points[i], i);
		if (v !== null && v > bestValue) {
			bestValue = v;
			best = i;
		}
	}
	return best;
}

export function buildFlightPathModel(input) {
	const options = asOptions(input.options);
	const units = { ...DEFAULT_UNITS, ...(input.units || {}) };
	const labels = { ...DEFAULT_LABELS, ...(input.labels || {}) };
	const info = input.info || {};
	const flights = Array.isArray(input.flights) ? input.flights : [];

	const multiple = flights.length > 1;
	const mission = options.missionName;
	const withMission = (text) => prefix(mission, text);
	const qualify = (qualifier, label) => (multiple ? prefix(qualifier, label) : (label == null ? '' : String(label)));

	const branches = [];
	let anySeaLevel = false;
	let launchMeters = null;

	flights.forEach((flight, index) => {
		const { accepted, dropped } = acceptRows(flight.rows, options.filterMaxSpeedMps);
		const datum = resolveAltitudes(accepted, units, options.launchAltitudeMeters);
		anySeaLevel = anySeaLevel || datum.hasSeaLevel;
		if (launchMeters === null && datum.launchMeters !== null)
			launchMeters = datum.launchMeters;

		const branchName = flight.name ? String(flight.name) : `${labels.flight} ${index + 1}`;

		const pathRgb = normalizeRgb(options.getBranchColor(index)) ?? BranchColors[index % BranchColors.length];
		const groundRgb = normalizeRgb(options.getBranchGroundColor(index)) ?? GroundColors[index % GroundColors.length];
		const pinRgb = normalizeRgb(options.getBranchPinColor(index)) ?? pathRgb;

		branches.push({
			flight,
			points: accepted,
			dropped,
			datum,
			index,
			name: qualify(mission, branchName),
			rawName: branchName,
			pathRgb,
			groundRgb,
			pinRgb
		});
	});

	// One resolution for the whole document: the KML altitude mode is a document level
	// choice, so mixing datums between folders would draw one flight against the wrong one.
	const trackReference = resolveAltitudeReference(options.altitudeReference, anySeaLevel);
	const waypointReference = resolveAltitudeReference(options.waypointAltitudeReference, anySeaLevel);
	const kmlAltitude = (point, reference) => {
		const value = reference === AltitudeReference.SEA_LEVEL ? point.mslMeters : point.aglMeters;
		return isFiniteNumber(value) ? round(value, 2) : 0;
	};

	const summary = {
		maxAltitudeMeters: null,
		maxVelocityMps: null,
		maxAccelerationMps2: null,
		maxRangeMeters: null,
		timeToApogeeSeconds: null,
		flightTimeSeconds: null
	};

	const modelBranches = branches.map((branch) => {
		const points = branch.points;
		const n = points.length;
		const liftoffPos = liftoffPosition(branch.flight, points);
		const origin = n > 0 ? points[0] : null;
		const t0 = liftoffPos >= 0 ? toNumber(points[liftoffPos].row.time) : null;

		// Per point derived values, computed once.
		let previous = null;
		for (let i = 0; i < n; i++) {
			const p = points[i];
			const time = toNumber(p.row.time);
			p.seconds = (time !== null && t0 !== null) ? time - t0 : null;
			p.velocityMps = toNumber(p.row.velocityV) !== null ? units.velocityToMps(toNumber(p.row.velocityV)) : null;
			p.distanceMeters = origin ? distanceMeters(origin.latitude, origin.longitude, p.latitude, p.longitude) : 0;
			p.bearing = origin ? bearingDegrees(origin.latitude, origin.longitude, p.latitude, p.longitude) : 0;
			p.accelerationMps2 = null;
			if (previous && p.velocityMps !== null && previous.velocityMps !== null && time !== null) {
				const dt = time - toNumber(previous.row.time);
				if (dt > 0)
					p.accelerationMps2 = (p.velocityMps - previous.velocityMps) / dt;
			}
			previous = p;
		}

		// The device's own apogee flag wins over the highest sample when the file carries
		// one; the summary altitude below still reports the highest sample.
		const apogeeEvent = (branch.flight.events || []).find(e => e && e.type === Waypoint.APOGEE);
		const apogeeEventRow = apogeeEvent && branch.flight.rows ? branch.flight.rows[apogeeEvent.rowIndex] : null;
		const apogeeEventPos = apogeeEventRow ? points.findIndex(p => p.row === apogeeEventRow) : -1;
		const highestPos = indexOfMax(points, p => p.aglMeters);
		const apogeePos = apogeeEventPos >= 0 ? apogeeEventPos : highestPos;
		const maxVelocityPos = indexOfMax(points, p => p.velocityMps, liftoffPos);
		const maxAccelerationPos = indexOfMax(points, p => p.accelerationMps2, liftoffPos);
		const maxRangePos = indexOfMax(points, p => p.distanceMeters);
		const hasLanding = branch.flight.hasLanding === true && n > 0;
		const landingPos = hasLanding ? n - 1 : -1;

		const pinColorFor = (type) => {
			if (options.colorWaypointPinsByFlight)
				return branch.pinRgb;
			return normalizeRgb(options.getPinColor(type)) ?? PinColors[type] ?? branch.pinRgb;
		};

		const waypoint = (type, pos, label, detail, device) => {
			const p = points[pos];
			const qualifiedLabel = qualify(branch.rawName, label);
			const name = options.labelWaypointsWithMission ? withMission(qualifiedLabel) : qualifiedLabel;
			const rgb = pinColorFor(type);
			return {
				type,
				label,
				qualifiedLabel,
				name: detail ? `${name} (${detail})` : name,
				detail: detail || '',
				device: device || '',
				latitude: p.latitude,
				longitude: p.longitude,
				latitudeStr: fixed(p.latitude, 6),
				longitudeStr: fixed(p.longitude, 6),
				altitudeMslMeters: isFiniteNumber(p.mslMeters) ? round(p.mslMeters, 2) : '',
				altitudeAglMeters: isFiniteNumber(p.aglMeters) ? round(p.aglMeters, 2) : '',
				altitudeKmlMeters: kmlAltitude(p, waypointReference),
				altitude: isFiniteNumber(p.aglMeters) ? units.formatAltitude(p.aglMeters) : '',
				altitudeValue: isFiniteNumber(p.aglMeters) ? units.altitudeValue(p.aglMeters) : '',
				altitudeMsl: isFiniteNumber(p.mslMeters) ? units.formatAltitude(p.mslMeters) : '',
				velocity: isFiniteNumber(p.velocityMps) ? units.formatVelocity(p.velocityMps) : '',
				acceleration: isFiniteNumber(p.accelerationMps2) ? units.formatAcceleration(p.accelerationMps2) : '',
				distanceMeters: round(p.distanceMeters, 2),
				distance: units.formatDistance(p.distanceMeters),
				bearing: fixed(p.bearing, 0),
				seconds: isFiniteNumber(p.seconds) ? round(p.seconds, 2) : '',
				time: isFiniteNumber(p.seconds) ? fixed(p.seconds, 1) : '',
				pinColorRgb: rgb,
				pinColorKml: kmlColor(rgb)
			};
		};

		const waypoints = [];
		const add = (type, pos, detail, device) => {
			if (pos < 0 || pos >= n || !options.hasWaypoint(type))
				return;
			waypoints.push(waypoint(type, pos, labels[type], detail, device));
		};

		const detailAltitude = (pos) => (pos >= 0 && isFiniteNumber(points[pos].aglMeters)
			? `${units.formatAltitude(points[pos].aglMeters)} ${units.altitudeUnit}` : '');

		add(Waypoint.PAD, n > 0 ? 0 : -1);
		add(Waypoint.LIFTOFF, liftoffPos);
		add(Waypoint.MAX_ACCELERATION, maxAccelerationPos,
			maxAccelerationPos >= 0 ? `${units.formatAcceleration(points[maxAccelerationPos].accelerationMps2)} ${units.accelerationUnit}` : '');
		add(Waypoint.MAX_VELOCITY, maxVelocityPos,
			maxVelocityPos >= 0 ? `${units.formatVelocity(points[maxVelocityPos].velocityMps)} ${units.velocityUnit}` : '');
		add(Waypoint.APOGEE, apogeePos, detailAltitude(apogeePos));

		// Recovery pins are named for the device as well as the event, because a dual
		// deploy flight puts two ejection markers hundreds of meters apart.
		const seenEvents = new Set();
		for (const event of branch.flight.events || []) {
			if (!event || (event.type !== Waypoint.DROGUE && event.type !== Waypoint.MAIN))
				continue;
			if (seenEvents.has(event.type))
				continue;
			const row = branch.flight.rows ? branch.flight.rows[event.rowIndex] : null;
			const pos = row ? points.findIndex(p => p.row === row) : -1;
			if (pos < 0)
				continue;
			seenEvents.add(event.type);
			if (!options.hasWaypoint(event.type))
				continue;
			const label = `${labels[event.type]} ${labels.ejection}`;
			waypoints.push(waypoint(event.type, pos, label, detailAltitude(pos), labels[event.type]));
		}

		add(Waypoint.LANDING, landingPos);

		// Keep the export order stable regardless of detection order.
		waypoints.sort((a, b) => WaypointOrder.indexOf(a.type) - WaypointOrder.indexOf(b.type));

		const path = [];
		if (options.includeFlightPath || options.includeGroundTrack) {
			const stride = options.pathStride;
			const pathPoint = (p) => ({
				latitude: p.latitude,
				longitude: p.longitude,
				latitudeStr: fixed(p.latitude, 6),
				longitudeStr: fixed(p.longitude, 6),
				altitudeMslMeters: isFiniteNumber(p.mslMeters) ? round(p.mslMeters, 2) : '',
				altitudeAglMeters: isFiniteNumber(p.aglMeters) ? round(p.aglMeters, 2) : '',
				altitudeKmlMeters: kmlAltitude(p, trackReference),
				altitude: isFiniteNumber(p.aglMeters) ? units.formatAltitude(p.aglMeters) : '',
				altitudeValue: isFiniteNumber(p.aglMeters) ? units.altitudeValue(p.aglMeters) : '',
				seconds: isFiniteNumber(p.seconds) ? round(p.seconds, 2) : '',
				time: isFiniteNumber(p.seconds) ? fixed(p.seconds, 1) : ''
			});
			for (let i = 0; i < n; i += stride)
				path.push(pathPoint(points[i]));
			// Always include the final point so the track ends where the data ends.
			if (n > 0 && (n - 1) % stride !== 0)
				path.push(pathPoint(points[n - 1]));
		}

		const landing = landingPos >= 0 ? points[landingPos] : null;
		const maxRange = maxRangePos >= 0 ? points[maxRangePos] : null;
		const apogee = highestPos >= 0 ? points[highestPos] : null;

		// Whole-flight summary values.
		if (apogee && isFiniteNumber(apogee.aglMeters) && (summary.maxAltitudeMeters === null || apogee.aglMeters > summary.maxAltitudeMeters)) {
			summary.maxAltitudeMeters = apogee.aglMeters;
			summary.timeToApogeeSeconds = isFiniteNumber(apogee.seconds) ? apogee.seconds : summary.timeToApogeeSeconds;
		}
		if (maxVelocityPos >= 0 && (summary.maxVelocityMps === null || points[maxVelocityPos].velocityMps > summary.maxVelocityMps))
			summary.maxVelocityMps = points[maxVelocityPos].velocityMps;
		if (maxAccelerationPos >= 0 && (summary.maxAccelerationMps2 === null || points[maxAccelerationPos].accelerationMps2 > summary.maxAccelerationMps2))
			summary.maxAccelerationMps2 = points[maxAccelerationPos].accelerationMps2;
		if (maxRange && (summary.maxRangeMeters === null || maxRange.distanceMeters > summary.maxRangeMeters))
			summary.maxRangeMeters = maxRange.distanceMeters;
		if (landing && isFiniteNumber(landing.seconds) && (summary.flightTimeSeconds === null || landing.seconds > summary.flightTimeSeconds))
			summary.flightTimeSeconds = landing.seconds;

		return {
			name: branch.name,
			index: branch.index,
			tracker: branch.flight.name ? String(branch.flight.name) : '',
			colorRgb: branch.pathRgb,
			groundColorRgb: branch.groundRgb,
			pinColorRgb: branch.pinRgb,
			pathColorKml: kmlColor(branch.pathRgb),
			groundColorKml: kmlColor(branch.groundRgb),
			pinColorKml: kmlColor(branch.pinRgb),
			hasPath: path.length > 0,
			hasWaypoints: waypoints.length > 0,
			waypoints,
			path,
			pointCount: n,
			droppedCount: branch.dropped,
			hasLanding,
			landingDistance: landing ? units.formatDistance(landing.distanceMeters) : '',
			landingDistanceMeters: landing ? round(landing.distanceMeters, 2) : '',
			landingBearing: landing ? fixed(landing.bearing, 0) : '',
			landingTime: landing && isFiniteNumber(landing.seconds) ? fixed(landing.seconds, 1) : '',
			landingLatitudeStr: landing ? fixed(landing.latitude, 6) : '',
			landingLongitudeStr: landing ? fixed(landing.longitude, 6) : '',
			maxRange: maxRange ? units.formatDistance(maxRange.distanceMeters) : '',
			maxRangeMeters: maxRange ? round(maxRange.distanceMeters, 2) : '',
			maxRangeBearing: maxRange ? fixed(maxRange.bearing, 0) : ''
		};
	});

	const title = info.title == null ? '' : String(info.title).trim();
	const documentName = withMission(title || labels.flightPath);

	let date = '';
	if (info.date) {
		const d = info.date instanceof Date ? info.date : new Date(info.date);
		date = Number.isNaN(d.getTime()) ? String(info.date) : d.toLocaleString();
	}

	return {
		title,
		missionName: mission,
		documentName,
		date,
		location: info.location == null ? '' : String(info.location).trim(),
		processorName: info.processorName == null ? '' : String(info.processorName),
		launchLatitude: modelBranches.length > 0 && branches[0].points.length > 0 ? branches[0].points[0].latitude : '',
		launchLongitude: modelBranches.length > 0 && branches[0].points.length > 0 ? branches[0].points[0].longitude : '',
		launchAltitudeMeters: isFiniteNumber(launchMeters) ? round(launchMeters, 2) : '',
		altitudeUnit: units.altitudeUnit,
		velocityUnit: units.velocityUnit,
		accelerationUnit: units.accelerationUnit,
		distanceUnit: units.distanceUnit,
		includeFlightPath: options.includeFlightPath,
		includeGroundTrack: options.includeGroundTrack,
		includeDescriptions: options.includeDescriptions,
		showWaypointLabels: options.showWaypointLabels,
		colorWaypointPins: options.colorWaypointPins,
		// A waypoint style only has content when it tints the pin or hides the label.
		styleWaypoints: options.colorWaypointPins || !options.showWaypointLabels,
		altitudeReference: trackReference,
		waypointAltitudeReference: waypointReference,
		kmlAltitudeMode: kmlAltitudeMode(trackReference),
		kmlWaypointAltitudeMode: kmlAltitudeMode(waypointReference),
		// Nothing to extrude to once the geometry is already lying on the ground.
		extrudePath: options.drawShadow && trackReference !== AltitudeReference.CLAMPED,
		extrudeWaypoints: options.drawShadow && waypointReference !== AltitudeReference.CLAMPED,
		// KML only honors tessellate on a clamped line; without it a clamped path cuts through hills.
		tessellatePath: trackReference === AltitudeReference.CLAMPED,
		hasSeaLevel: anySeaLevel,
		summary: {
			maxAltitude: isFiniteNumber(summary.maxAltitudeMeters) ? units.formatAltitude(summary.maxAltitudeMeters) : '',
			maxAltitudeMeters: isFiniteNumber(summary.maxAltitudeMeters) ? round(summary.maxAltitudeMeters, 2) : '',
			maxVelocity: isFiniteNumber(summary.maxVelocityMps) ? units.formatVelocity(summary.maxVelocityMps) : '',
			maxVelocityMps: isFiniteNumber(summary.maxVelocityMps) ? round(summary.maxVelocityMps, 2) : '',
			maxAcceleration: isFiniteNumber(summary.maxAccelerationMps2) ? units.formatAcceleration(summary.maxAccelerationMps2) : '',
			maxAccelerationMps2: isFiniteNumber(summary.maxAccelerationMps2) ? round(summary.maxAccelerationMps2, 2) : '',
			maxRange: isFiniteNumber(summary.maxRangeMeters) ? units.formatDistance(summary.maxRangeMeters) : '',
			maxRangeMeters: isFiniteNumber(summary.maxRangeMeters) ? round(summary.maxRangeMeters, 2) : '',
			timeToApogee: isFiniteNumber(summary.timeToApogeeSeconds) ? fixed(summary.timeToApogeeSeconds, 1) : '',
			flightTime: isFiniteNumber(summary.flightTimeSeconds) ? fixed(summary.flightTimeSeconds, 1) : ''
		},
		labels,
		branchCount: modelBranches.length,
		multiple,
		branches: modelBranches
	};
}

/** A copy of the model holding a single branch, for the one-file-per-flight option. */
export function modelForBranch(model, branch) {
	return {
		...model,
		documentName: model.multiple ? prefix(model.documentName, branch.name) : model.documentName,
		branchCount: 1,
		branches: [branch]
	};
}

export default buildFlightPathModel;
