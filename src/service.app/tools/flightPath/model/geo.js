// Geographic and formatting helpers for the flight path export. Pure functions only.

const EARTH_RADIUS_METERS = 6371000;
const RAD = Math.PI / 180;

/** Great-circle distance in meters between two WGS84 positions (haversine). */
export function distanceMeters(lat1, lon1, lat2, lon2) {
	const a = 0.5 -
		Math.cos((lat2 - lat1) * RAD) / 2 +
		Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) *
		(1 - Math.cos((lon2 - lon1) * RAD)) / 2;
	return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(a));
}

/**
 * Initial compass bearing in degrees, 0..360, from the first position to the second.
 * atan2 takes the east component first because a bearing is measured clockwise from
 * north, the reverse of the usual math convention.
 */
export function bearingDegrees(lat1, lon1, lat2, lon2) {
	const phi1 = lat1 * RAD;
	const phi2 = lat2 * RAD;
	const dLambda = (lon2 - lon1) * RAD;
	const east = Math.sin(dLambda) * Math.cos(phi2);
	const north = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
	const deg = Math.atan2(east, north) / RAD;
	return (deg + 360) % 360;
}

/** Both coordinates at exactly zero is a receiver without a fix. A single zero is a real place. */
export function isNoFix(latitude, longitude) {
	return latitude === 0 && longitude === 0;
}

export function isFiniteNumber(value) {
	return typeof value === 'number' && Number.isFinite(value);
}

/** Normalizes a color to lowercase '#rrggbb', or null when it is not one. */
export function normalizeRgb(value) {
	if (typeof value !== 'string')
		return null;
	let str = value.trim().toLowerCase();
	if (str.startsWith('#'))
		str = str.substring(1);
	if (str.length === 8)
		str = str.substring(0, 6); // drop an alpha channel from a color picker
	if (str.length === 3)
		str = str.split('').map(c => c + c).join('');
	if (!/^[0-9a-f]{6}$/.test(str))
		return null;
	return '#' + str;
}

/** KML color literals are aabbggrr: alpha first, channels reversed from web notation. */
export function kmlColor(rgb, alpha = 'ff') {
	const str = normalizeRgb(rgb);
	if (!str)
		return alpha + '000000';
	const hex = str.substring(1);
	return alpha + hex.substring(4, 6) + hex.substring(2, 4) + hex.substring(0, 2);
}

/** Fixed-precision string; coordinates that a person reads are always six places. */
export function fixed(value, places) {
	if (!isFiniteNumber(value))
		return '';
	return value.toFixed(places);
}

/** Rounds to a number of decimal places, returning a number. */
export function round(value, places = 2) {
	if (!isFiniteNumber(value))
		return null;
	const factor = Math.pow(10, places);
	return Math.round(value * factor) / factor;
}

/**
 * Prefixes a qualifier to a label unless there is no qualifier or the label already
 * begins with it (case-insensitively), so "Booster Chute" never becomes
 * "Booster Booster Chute". JavaScript toLowerCase is locale independent.
 */
export function prefix(qualifier, label) {
	const safeLabel = label == null ? '' : String(label);
	if (!qualifier)
		return safeLabel;
	const q = String(qualifier).trim();
	if (!q)
		return safeLabel;
	if (safeLabel.toLowerCase().startsWith(q.toLowerCase()))
		return safeLabel;
	return safeLabel ? q + ' ' + safeLabel : q;
}

/** A file-name-safe slug: letters, digits, dashes. */
export function slug(value, fallback = 'flight-path') {
	if (value == null)
		return fallback;
	const str = String(value).trim().toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return str || fallback;
}

/** yyyy-mm-dd for a Date, so exported file names sort. */
export function isoDate(date) {
	const d = date instanceof Date ? date : new Date(date);
	if (Number.isNaN(d.getTime()))
		return isoDate(new Date());
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${d.getFullYear()}-${m}-${day}`;
}
