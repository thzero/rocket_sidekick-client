import { beforeAll, describe, expect, it } from 'vitest';

import '@thzero/library_common/utility/string';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import FeatherweightBR from '@/service.app/tools/flightPath/processors/br/featherweight';
import FeatherweightIFIP from '@/service.app/tools/flightPath/processors/ifip/featherweight';
import { FlightPathExportOptions } from '@/service.app/tools/flightPath/options';
import { allTemplates, findTemplate } from '@/service.app/tools/flightPath/output/templates/index';

// Exercises the seam the old positional publish call got wrong: a synthetic CSV for each
// Featherweight format goes through parsing, flight detection and rendering.

const LAT0 = 30.6146;
const LON0 = -97.4966;

const units = {
	measurementUnitsId: 'english',
	measurementUnitsAltitudeId: 'ft',
	measurementUnitsVelocityId: 'fts',
	measurementUnitsOutputId: 'english',
	measurementUnitsAltitudeOutputId: 'ft',
	measurementUnitsVelocityOutputId: 'fts'
};

const logger = { debug() {}, error() {}, exception() {}, info() {}, warn() {} };

function service(Clazz) {
	const s = new Clazz();
	s._logger = logger;
	return s;
}

/** Vertical velocities that climb, coast, descend and then sit still long enough to end the flight. */
const VERTICAL = [0, 0, 40, 120, 90, 30, 0, -20, -40, -20, -5, 0, 0, 0, 0, 0, 0, 0];
const AGL = [0, 0, 40, 200, 330, 380, 390, 370, 300, 200, 60, 0, 0, 0, 0, 0, 0, 0];

function blueRavenCsv(launchAsl = 600) {
	const header = ['ID', 'UNIXTIME', 'ALT', 'Altitude AGL', 'LAT', 'LON', 'HORZV', 'VERTV', 'Extra'];
	const rows = VERTICAL.map((v, i) => [
		String(i), String(1700000000 + i), String(launchAsl + AGL[i]), String(AGL[i]),
		String(LAT0 + i * 0.00005), String(LON0), '3', String(v), 'x'
	]);
	return { data: [header, ...rows] };
}

function ifipGroundStationCsv(trackers) {
	const header = ['TRACKER', 'B', 'TIME', 'LAT', 'LON', 'ALT', 'G', 'HORZV', 'VERTV'];
	const rows = [];
	for (const tracker of trackers) {
		VERTICAL.forEach((v, i) => rows.push([
			tracker, 'b', String(1700000000 + i), String(LAT0 + i * 0.00005), String(LON0), String(AGL[i]), 'g', '3', String(v)
		]));
	}
	return { data: [header, ...rows] };
}

function ifipTrackerCsv() {
	const header = ['UTCTIME', 'TIME', 'ALT', 'LAT', 'LON', 'F', 'G', 'HORZV', 'VERTV'];
	const rows = VERTICAL.map((v, i) => [
		'utc', String(1700000000 + i), String(600 + AGL[i]), String(LAT0 + i * 0.00005), String(LON0), 'f', 'g', '3', String(v)
	]);
	return { data: [header, ...rows] };
}

function run(processor, csv, options = {}) {
	const results = { title: 'Test Flight', date: null, location: null };
	const template = findTemplate(allTemplates([]), 'kml');
	const response = processor.process('test', {}, results, csv, units, new FlightPathExportOptions({ filterMaxSpeedMps: 0, ...options }), template);
	return { response, results };
}

beforeAll(() => {
	LibraryClientUtility.$trans = { t: (key) => key.substring(key.lastIndexOf('.') + 1) };
});

describe('BlueRaven processor', () => {
	it('recognizes the columns and rejects a file without them', () => {
		const processor = service(FeatherweightBR);
		expect(processor.check('test', blueRavenCsv()).success).toBe(true);
		expect(processor.check('test', { data: [['A', 'B'], ['1', '2']] }).success).toBe(false);
	});

	it('detects a flight with a landing and both altitude datums', () => {
		const processor = service(FeatherweightBR);
		const { response, results } = run(processor, blueRavenCsv(600));
		expect(response.success).toBe(true);
		expect(results.flightPaths.length).toBe(1);
		const branch = results.flightPaths[0];
		expect(branch.hasLanding).toBe(true);
		expect(branch.waypoints.map(w => w.type)).toContain('apogee');
		expect(branch.waypoints.find(w => w.type === 'apogee').altitudeAglMeters).toBeCloseTo(390 * 0.3048, 1);
		expect(results.flightPath.kmlAltitudeMode).toBe('absolute');
		expect(results.flightPath.launchAltitudeMeters).toBeCloseTo(600 * 0.3048, 1);
		expect(results.flightPathsOutput[0].content).toContain('<kml');
	});

	it('a file that ends mid flight has no landing', () => {
		const processor = service(FeatherweightBR);
		const csv = blueRavenCsv();
		csv.data = csv.data.slice(0, 9); // header plus rows through the descent
		const { results } = run(processor, csv);
		expect(results.flightPaths[0].hasLanding).toBe(false);
		expect(results.flightPaths[0].waypoints.find(w => w.type === 'landing')).toBeUndefined();
	});

	/** The newer export shape: the device's own flags, which flip once and stay set. */
	function blueRavenFlaggedCsv() {
		const header = ['UNIXTIME', 'ALT', 'LAT', 'LON', 'FIX', 'HORZV', 'VERTV', 'Altitude AGL', 'Launch detection', 'Apogee detection', 'Landing detection'];
		const flag = (i, at) => (i >= at ? 'TRUE' : 'FALSE');
		const rows = VERTICAL.map((v, i) => [
			String(1700000000 + i), String(600 + AGL[i]), String(LAT0 + i * 0.00005), String(LON0), i === 5 ? '0' : '3', '3', String(v), String(AGL[i]),
			flag(i, 2), flag(i, 7), flag(i, 12)
		]);
		// Only two rows at rest after the landing flag: the velocity rule alone would miss it.
		return { data: [header, ...rows.slice(0, 14)] };
	}

	it('uses the launch, apogee and landing flags when the export carries them', () => {
		const processor = service(FeatherweightBR);
		const { results } = run(processor, blueRavenFlaggedCsv());
		const branch = results.flightPaths[0];
		expect(branch.hasLanding).toBe(true);
		const byType = Object.fromEntries(branch.waypoints.map(w => [w.type, w]));
		expect(byType.pad.seconds).toBe(-1);
		expect(byType.liftoff.seconds).toBe(0);
		// The flagged row (AGL 370) wins over the highest sample (AGL 390) for the pin.
		expect(byType.apogee.altitudeAglMeters).toBeCloseTo(370 * 0.3048, 1);
		expect(results.flightPath.summary.maxAltitudeMeters).toBeCloseTo(390 * 0.3048, 1);
		expect(byType.landing.seconds).toBe(10);
		// Rows 1 (pad) through 12 (landing) are published, less the row without a fix.
		expect(branch.pointCount).toBe(11);
	});
});

describe('outlier filter on real sampling', () => {
	it('does not cascade through a 10 Hz boost after one rejected sample', () => {
		const processor = service(FeatherweightBR);
		const header = ['UNIXTIME', 'ALT', 'Altitude AGL', 'LAT', 'LON', 'HORZV', 'VERTV'];
		const rows = [];
		// 60 m/s horizontal at 10 Hz, one glitch sample 2 km away in the middle.
		for (let i = 0; i < 60; i++) {
			const lat = LAT0 + (i * 6) / 111132;
			const glitch = i === 20;
			rows.push([String(1700000000 + i / 10), String(600 + i * 20), String(i * 20), String(glitch ? lat + 0.02 : lat), String(LON0), '197', i < 40 ? '600' : '0']);
		}
		const { results } = run(processor, { data: [header, ...rows] }, { filterMaxSpeedMps: 300 });
		const branch = results.flightPaths[0];
		expect(branch.droppedCount).toBe(1);
		// Every boost sample before the flight ends at row 40, less the one glitch.
		expect(branch.pointCount).toBe(40);
	});
});

describe('IFIP processor', () => {
	it('tells the two file types apart', () => {
		const processor = service(FeatherweightIFIP);
		expect(processor.check('test', ifipGroundStationCsv(['A'])).results).toBe('gs');
		expect(processor.check('test', ifipTrackerCsv()).results).toBe('tracker');
		expect(processor.check('test', { data: [['1', '2']] }).success).toBe(false);
	});

	it('a ground station file with two trackers becomes two qualified branches', () => {
		const processor = service(FeatherweightIFIP);
		const { results } = run(processor, ifipGroundStationCsv(['Booster', 'Sustainer']));
		expect(results.flightPaths.length).toBe(2);
		expect(results.flightPaths.map(b => b.name)).toEqual(['Booster', 'Sustainer']);
		expect(results.flightPaths[1].waypoints.find(w => w.type === 'apogee').qualifiedLabel).toBe('Sustainer apogee');
		// Ground station logs are AGL only, so automatic resolves to the ground.
		expect(results.flightPath.kmlAltitudeMode).toBe('relativeToGround');
		expect(results.flightPathsOutput.length).toBe(1);
		expect(results.flightPathsOutput[0].content.match(/<Folder>/g).length).toBe(2);
	});

	it('a tracker file keeps its latitude and longitude in the right columns', () => {
		const processor = service(FeatherweightIFIP);
		const { results } = run(processor, ifipTrackerCsv());
		const pad = results.flightPaths[0].waypoints.find(w => w.type === 'pad');
		expect(pad.longitudeStr).toBe(LON0.toFixed(6));
		expect(Number(pad.latitudeStr)).toBeGreaterThan(30.6);
		// Tracker logs are ASL only; heights above the pad come from the first point.
		expect(results.flightPath.kmlAltitudeMode).toBe('absolute');
		expect(results.flightPaths[0].waypoints.find(w => w.type === 'apogee').altitudeAglMeters).toBeCloseTo(390 * 0.3048, 1);
	});

	it('one file per flight yields one document per tracker', () => {
		const processor = service(FeatherweightIFIP);
		const { results } = run(processor, ifipGroundStationCsv(['A', 'B']), { oneFilePerFlight: true });
		expect(results.flightPathsOutput.length).toBe(2);
		expect(results.flightPathsOutput[1].content).toContain('<name>Test Flight B</name>');
	});
});
