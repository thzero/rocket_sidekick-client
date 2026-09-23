import { describe, expect, it } from 'vitest';

import { buildFlightPathModel, modelForBranch } from '@/service.app/tools/flightPath/model/builder';
import { bearingDegrees, distanceMeters, kmlColor, prefix } from '@/service.app/tools/flightPath/model/geo';
import { AltitudeReference, FlightPathExportOptions, Presets, Waypoint, presetMatching } from '@/service.app/tools/flightPath/options';
import { csvEscape, escaperFor, renderFlightPath, rewriteForCsv } from '@/service.app/tools/flightPath/output/exporter';
import { allTemplates, findTemplate, parseTemplateFileName, userTemplate } from '@/service.app/tools/flightPath/output/templates/index';

// Hand-built fixtures with known coordinates, so the expected output can be computed by
// hand. Altitudes are in meters and velocities in m/s so the identity converters apply.

const LAT0 = 30.6146;
const LON0 = -97.4966;
const DEG_PER_100M_LAT = 100 / 111132;

function row(index, time, agl, asl, latOffsetMeters, velocityV) {
	return {
		index,
		time,
		altitude: agl,
		altitudeAGL: agl,
		altitudeASL: asl,
		latitude: LAT0 + latOffsetMeters * DEG_PER_100M_LAT / 100,
		longitude: LON0,
		velocityV,
		velocityH: 0
	};
}

/** A flight that climbs to 300 m, drifts 45 m north at its farthest, and lands 30 m north. */
function singleFlight(overrides = {}) {
	const rows = [
		row(0, 1000, 0, 0, 0, 0),
		row(1, 1001, 100, 100, 5, 50),
		row(2, 1002, 220, 220, 15, 40),
		row(3, 1003, 300, 300, 25, 5),
		row(4, 1004, 250, 250, 35, -20),
		row(5, 1005, 120, 120, 45, -15),
		row(6, 1006, 40, 40, 40, -10),
		row(7, 1007, 0, 0, 30, 0)
	];
	return {
		id: 1,
		name: null,
		rows,
		liftoffIndex: 1,
		hasLanding: true,
		events: [{ type: 'drogue', rowIndex: 4 }, { type: 'main', rowIndex: 6 }],
		...overrides
	};
}

function aglOnlyFlight() {
	const flight = singleFlight();
	for (const r of flight.rows)
		r.altitudeASL = null;
	return flight;
}

function build(flights, options, extra = {}) {
	return buildFlightPathModel({
		flights,
		options: new FlightPathExportOptions(options),
		info: { title: 'Sod Blaster', date: '2026-09-20T10:00:00', location: 'Hearne', processorName: 'Featherweight' },
		...extra
	});
}

function render(model, id) {
	return renderFlightPath(model, findTemplate(allTemplates([]), id));
}

function parseXml(text) {
	const doc = new DOMParser().parseFromString(text, 'application/xml');
	const error = doc.getElementsByTagName('parsererror')[0];
	if (error)
		throw new Error(error.textContent);
	return doc;
}

describe('geo helpers', () => {
	it('measures distance and bearing north of the origin', () => {
		const d = distanceMeters(LAT0, LON0, LAT0 + DEG_PER_100M_LAT, LON0);
		expect(d).toBeGreaterThan(99);
		expect(d).toBeLessThan(101);
		expect(Math.round(bearingDegrees(LAT0, LON0, LAT0 + DEG_PER_100M_LAT, LON0))).toBe(0);
		expect(Math.round(bearingDegrees(LAT0, LON0, LAT0, LON0 + 0.001))).toBe(90);
	});

	it('converts web colors to KML aabbggrr', () => {
		expect(kmlColor('#112233')).toBe('ff332211');
		expect(kmlColor('#112233FF')).toBe('ff332211');
		expect(kmlColor('not a color')).toBe('ff000000');
	});

	it('does not prefix a label that already starts with the qualifier', () => {
		expect(prefix('Booster', 'Booster Chute')).toBe('Booster Chute');
		expect(prefix('booster', 'Booster Chute')).toBe('Booster Chute');
		expect(prefix('Sustainer', 'Apogee')).toBe('Sustainer Apogee');
		expect(prefix('', 'Apogee')).toBe('Apogee');
	});
});

describe('options', () => {
	it('normalizes bad values at the door', () => {
		const options = new FlightPathExportOptions({ pathStride: 0, altitudeReference: 'bogus', missionName: '  Sod Blaster  ', filterMaxSpeedMps: -5 });
		expect(options.pathStride).toBe(1);
		expect(options.altitudeReference).toBe(AltitudeReference.AUTOMATIC);
		expect(options.missionName).toBe('Sod Blaster');
		expect(options.filterMaxSpeedMps).toBe(0);
	});

	it('does not persist the mission name', () => {
		const options = new FlightPathExportOptions({ missionName: 'Sod Blaster' });
		expect(options.toStored().missionName).toBeUndefined();
		expect(options.toObject().missionName).toBe('Sod Blaster');
	});

	it('starts on the flight path preset and no preset draws the shadow', () => {
		expect(presetMatching(new FlightPathExportOptions())).toBe('flightPath');
		for (const preset of Object.values(Presets))
			expect(preset.drawShadow).toBe(false);
	});

	it('presets are reachable from one another', () => {
		const options = new FlightPathExportOptions();
		options.applyPreset('landing');
		expect(options.waypoints).toEqual([Waypoint.LANDING]);
		expect(presetMatching(options)).toBe('landing');
		options.applyPreset('flightPath');
		expect(options.waypoints.length).toBe(8);
		expect(presetMatching(options)).toBe('flightPath');
		options.drawShadow = true;
		expect(presetMatching(options)).toBeNull();
	});
});

describe('builder', () => {
	it('places every waypoint and the path from GPS rows', () => {
		const model = build([singleFlight()]);
		expect(model.branches.length).toBe(1);
		const branch = model.branches[0];
		const types = branch.waypoints.map(w => w.type);
		expect(types).toEqual(['pad', 'liftoff', 'maxAcceleration', 'maxVelocity', 'apogee', 'drogue', 'main', 'landing']);
		expect(branch.waypoints.find(w => w.type === 'apogee').altitudeAglMeters).toBe(300);
		expect(branch.waypoints.find(w => w.type === 'maxVelocity').velocity).toBe('50');
		expect(branch.path.length).toBe(8);
		expect(branch.hasLanding).toBe(true);
	});

	it('single flight labels are unqualified and a multi tracker file qualifies them', () => {
		const single = build([singleFlight()]);
		expect(single.branches[0].waypoints.find(w => w.type === 'apogee').qualifiedLabel).toBe('Apogee');

		const multi = build([singleFlight({ name: 'Booster' }), singleFlight({ id: 2, name: 'Sustainer' })]);
		expect(multi.branches[0].waypoints.find(w => w.type === 'apogee').qualifiedLabel).toBe('Booster Apogee');
		expect(multi.branches[1].waypoints.find(w => w.type === 'apogee').qualifiedLabel).toBe('Sustainer Apogee');
		expect(multi.branches[1].colorRgb).not.toBe(multi.branches[0].colorRgb);
		expect(multi.branches[1].groundColorRgb).not.toBe(multi.branches[1].colorRgb);
	});

	it('the mission name leads the document and is not repeated when it already does', () => {
		const model = build([singleFlight()], { missionName: 'Sod Blaster' });
		expect(model.documentName).toBe('Sod Blaster');
		const other = build([singleFlight()], { missionName: 'Hearne 2026' });
		expect(other.documentName).toBe('Hearne 2026 Sod Blaster');
		expect(other.branches[0].waypoints[0].name).toBe('Pad');
		const onPins = build([singleFlight()], { missionName: 'Hearne 2026', labelWaypointsWithMission: true });
		expect(onPins.branches[0].waypoints[0].name).toBe('Hearne 2026 Pad');
	});

	it('max range is not the landing distance', () => {
		const branch = build([singleFlight()]).branches[0];
		expect(Number(branch.maxRangeMeters)).toBeGreaterThan(40);
		expect(Number(branch.landingDistanceMeters)).toBeLessThan(35);
	});

	it('a flight that never landed reports no landing', () => {
		const branch = build([singleFlight({ hasLanding: false })]).branches[0];
		expect(branch.hasLanding).toBe(false);
		expect(branch.waypoints.find(w => w.type === 'landing')).toBeUndefined();
		expect(branch.landingDistance).toBe('');
		expect(branch.maxRange).not.toBe('');
	});

	it('path stride keeps the first and last point', () => {
		const branch = build([singleFlight()], { pathStride: 3 }).branches[0];
		expect(branch.path.length).toBe(4);
		expect(branch.path[0].latitude).toBe(LAT0);
		expect(branch.path[3].latitudeStr).toBe(branch.waypoints.find(w => w.type === 'landing').latitudeStr);
	});

	it('drops no-fix rows but keeps a single zero coordinate', () => {
		const flight = singleFlight();
		flight.rows[2].latitude = 0;
		flight.rows[2].longitude = 0;
		const branch = build([flight]).branches[0];
		expect(branch.pointCount).toBe(7);
		expect(branch.droppedCount).toBe(1);

		const equator = singleFlight();
		for (const r of equator.rows)
			r.latitude = 0;
		expect(build([equator], { filterMaxSpeedMps: 0 }).branches[0].pointCount).toBe(8);
	});

	it('an outlier costs one point, not two', () => {
		const flight = singleFlight();
		flight.rows[3].longitude = LON0 + 1; // ~90 km east
		const branch = build([flight]).branches[0];
		expect(branch.pointCount).toBe(7);
		expect(branch.droppedCount).toBe(1);
	});

	it('automatic reference follows whether sea level is known', () => {
		const withAsl = build([singleFlight()]);
		expect(withAsl.kmlAltitudeMode).toBe('absolute');
		const withoutAsl = build([aglOnlyFlight()]);
		expect(withoutAsl.kmlAltitudeMode).toBe('relativeToGround');
		expect(withoutAsl.branches[0].waypoints[0].altitudeMsl).toBe('');
		const elevated = build([aglOnlyFlight()], { launchAltitudeMeters: 1200 });
		expect(elevated.kmlAltitudeMode).toBe('absolute');
		expect(elevated.branches[0].waypoints.find(w => w.type === 'apogee').altitudeMslMeters).toBe(1500);
	});

	it('track and waypoint references are separate and derive the geometry flags', () => {
		const model = build([singleFlight()], { altitudeReference: 'clamped', waypointAltitudeReference: 'ground', drawShadow: true });
		expect(model.kmlAltitudeMode).toBe('clampToGround');
		expect(model.kmlWaypointAltitudeMode).toBe('relativeToGround');
		expect(model.tessellatePath).toBe(true);
		expect(model.extrudePath).toBe(false);
		expect(model.extrudeWaypoints).toBe(true);
	});

	it('cleared waypoint types are not exported', () => {
		const branch = build([singleFlight()], { waypoints: ['landing'] }).branches[0];
		expect(branch.waypoints.map(w => w.type)).toEqual(['landing']);
	});

	it('pins take their type color unless colored by flight', () => {
		const byType = build([singleFlight()], { pinColors: { apogee: '#123456' } }).branches[0];
		expect(byType.waypoints.find(w => w.type === 'apogee').pinColorRgb).toBe('#123456');
		const byFlight = build([singleFlight()], { pinColors: { apogee: '#123456' }, colorWaypointPinsByFlight: true, branchPinColors: { 0: '#abcdef' } }).branches[0];
		expect(byFlight.waypoints.find(w => w.type === 'apogee').pinColorRgb).toBe('#abcdef');
	});
});

describe('templates', () => {
	it('discovers the built-ins first and user templates after', () => {
		const list = allTemplates([{ id: 'zeta.csv.hbs', source: 'x' }, { id: 'alpha.kml.hbs', source: 'y' }, { id: 'bad.txt', source: 'z' }]);
		expect(list.map(t => t.id)).toEqual(['kml', 'waypoints-csv', 'gpx', 'alpha.kml.hbs', 'zeta.csv.hbs']);
		expect(findTemplate(list, 'missing').id).toBe('kml');
	});

	it('the file name is the metadata', () => {
		expect(parseTemplateFileName('my-waypoints.csv.hbs')).toEqual({ id: 'my-waypoints.csv.hbs', displayName: 'my-waypoints (csv)', extension: 'csv' });
		expect(parseTemplateFileName('notes.mustache').extension).toBe('txt');
		expect(parseTemplateFileName('notes.docx')).toBeNull();
		expect(userTemplate('track.GPX.HBS', '<gpx/>').extension).toBe('gpx');
	});

	it('picks escaping by extension', () => {
		expect(escaperFor('kml')).toBe('xml');
		expect(escaperFor('CSV')).toBe('csv');
		expect(escaperFor('txt')).toBe('none');
		expect(csvEscape('say "hi"')).toBe('say ""hi""');
		expect(rewriteForCsv('"{{a}}",{{#each b}}{{c}}{{/each}}{{{raw}}}{{else}}')).toBe('"{{csv a}}",{{#each b}}{{csv c}}{{/each}}{{{raw}}}{{else}}');
	});
});

describe('rendered output', () => {
	it('KML is well formed, carries lon,lat,alt coordinates and per branch styles', () => {
		const kml = render(build([singleFlight()]), 'kml');
		const doc = parseXml(kml);
		expect(doc.getElementsByTagName('Folder').length).toBe(1);
		expect(kml).toContain('<Style id="flightPath0"><LineStyle><color>ffff0000</color>');
		expect(kml).toContain(`${LON0},${LAT0},0`);
		expect(kml).toContain('<altitudeMode>absolute</altitudeMode>');
		expect(kml).toContain('<Snippet maxLines="0"></Snippet>');
		expect(kml).not.toContain('CDATA');
	});

	it('special characters survive the round trip into the balloon HTML', () => {
		const model = build([singleFlight()], {}, { info: { title: 'Bill & Ted <Rocket> \'99' } });
		const kml = render(model, 'kml');
		const doc = parseXml(kml);
		const name = doc.getElementsByTagName('name')[0].textContent;
		expect(name).toBe('Bill & Ted <Rocket> \'99');
		const description = doc.getElementsByTagName('description')[0].textContent;
		expect(description).toContain('<b>Bill & Ted <Rocket> \'99</b>');
	});

	it('every coordinate pair a person reads is marked (lat, lon)', () => {
		const kml = render(build([singleFlight()]), 'kml');
		const pairs = kml.match(/\(-?\d+\.\d{6}, -?\d+\.\d{6}\)/g) || [];
		const descriptions = kml.match(/<description>/g) || [];
		// Document, folder and eight waypoint balloons each carry exactly one pair.
		expect(pairs.length).toBe(descriptions.length);
		expect(pairs.length).toBe(10);
	});

	it('descriptions can be switched off', () => {
		const kml = render(build([singleFlight()], { includeDescriptions: false }), 'kml');
		expect(kml).not.toContain('<description>');
		expect(kml).not.toContain('<Snippet');
	});

	it('geometry toggles gate the lines and the shadow', () => {
		const none = render(build([singleFlight()], { includeFlightPath: false, includeGroundTrack: false }), 'kml');
		expect(none).not.toContain('<LineString>');
		const shadow = render(build([singleFlight()], { drawShadow: true }), 'kml');
		expect(shadow).toContain('<extrude>1</extrude>');
		const clamped = render(build([singleFlight()], { drawShadow: true, altitudeReference: 'clamped', waypointAltitudeReference: 'clamped' }), 'kml');
		expect(clamped).not.toContain('<extrude>');
		expect(clamped).toContain('<tessellate>1</tessellate>');
	});

	it('labels can be hidden and colored pins turned off', () => {
		const kml = render(build([singleFlight()], { showWaypointLabels: false, colorWaypointPins: false }), 'kml');
		expect(kml).toContain('<LabelStyle><scale>0</scale></LabelStyle>');
		expect(kml).not.toContain('wht-pushpin');
	});

	it('GPX always reports elevation above sea level and omits it when unknown', () => {
		const gpx = render(build([singleFlight()], { altitudeReference: 'ground' }), 'gpx');
		parseXml(gpx);
		expect(gpx).toContain('<ele>300</ele>');
		expect(gpx).toContain('<ele>0</ele>');
		const aglOnly = render(build([aglOnlyFlight()]), 'gpx');
		expect(aglOnly).not.toContain('<ele>');
		expect(aglOnly).toContain('<trk>');
	});

	it('waypoint CSV matches the expected shape and escapes quotes', () => {
		const model = build([singleFlight()], {}, { info: { title: 'Say "cheese"' } });
		const csv = render(model, 'waypoints-csv');
		const lines = csv.trim().split('\n');
		expect(lines[0]).toBe('"altitude(m)","latitude","longitude","label","symbol","color","label_color","name"');
		expect(lines.length).toBe(9);
		expect(lines[1]).toContain(`"${LAT0.toFixed(6)}","${LON0.toFixed(6)}","pad"`);
		expect(lines[1]).toContain('Say ""cheese""');
	});

	it('one file per flight renders a document per branch', () => {
		const model = build([singleFlight({ name: 'A' }), singleFlight({ id: 2, name: 'B' })]);
		const kmlB = render(modelForBranch(model, model.branches[1]), 'kml');
		const doc = parseXml(kmlB);
		expect(doc.getElementsByTagName('Folder').length).toBe(1);
		expect(kmlB).toContain('<name>Sod Blaster B</name>');
	});
});
