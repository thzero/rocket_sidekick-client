// Template discovery: the built-ins bundled with the app, followed by the user's own
// templates saved in the store. A template is an immutable value: a stable id (remembered
// as the user's selection), a display name, an output extension, the source, and whether
// it is built in. The extension does double duty: it picks the escaping rule and the
// exported file's extension.

import kmlSource from './flightpath.kml.hbs?raw';
import gpxSource from './flightpath.gpx.hbs?raw';
import csvSource from './waypoints.csv.hbs?raw';

export const TEMPLATE_SUFFIXES = Object.freeze(['.hbs', '.handlebars', '.mustache']);
export const DEFAULT_TEMPLATE_ID = 'kml';
const DEFAULT_EXTENSION = 'txt';

function template(id, displayName, extension, source, builtIn) {
	return Object.freeze({
		id: String(id),
		displayName: String(displayName),
		extension: String(extension || DEFAULT_EXTENSION).toLowerCase(),
		source: String(source ?? ''),
		builtIn: builtIn === true
	});
}

const BUILT_INS = Object.freeze([
	template(DEFAULT_TEMPLATE_ID, 'KML (Google Earth)', 'kml', kmlSource, true),
	template('waypoints-csv', 'Waypoint CSV', 'csv', csvSource, true),
	template('gpx', 'GPX track', 'gpx', gpxSource, true)
]);

export function builtInTemplates() {
	return [...BUILT_INS];
}

/** The suffix a template file name ends with, matched case-insensitively, or null. */
export function templateSuffix(fileName) {
	const lower = String(fileName || '').toLowerCase();
	return TEMPLATE_SUFFIXES.find(s => lower.endsWith(s)) ?? null;
}

/**
 * The file name is the metadata: `<name>.<ext>.hbs` gives display name `<name>` and
 * extension `<ext>`. With no inner dot the extension defaults to txt, which means no
 * escaping at all. The extension is included in the display name so two templates with
 * the same base name and different extensions can be told apart in a dropdown.
 */
export function parseTemplateFileName(fileName) {
	const suffix = templateSuffix(fileName);
	if (!suffix)
		return null;
	const name = String(fileName).trim();
	const base = name.substring(0, name.length - suffix.length);
	if (!base)
		return null;
	let extension = DEFAULT_EXTENSION;
	let display = base;
	const dot = base.lastIndexOf('.');
	if (dot > 0 && dot < base.length - 1) {
		extension = base.substring(dot + 1).toLowerCase();
		display = base.substring(0, dot);
	}
	return {
		id: name,
		displayName: `${display} (${extension})`,
		extension
	};
}

/** Builds a user template record from a dropped file, or null when the name does not qualify. */
export function userTemplate(fileName, source) {
	const parsed = parseTemplateFileName(fileName);
	if (!parsed)
		return null;
	return template(parsed.id, parsed.displayName, parsed.extension, source, false);
}

/**
 * Built-ins in display order, then user templates sorted case-insensitively by id. A
 * stored user template that does not parse is skipped rather than failing the list, so
 * one bad record costs one template and not the tool.
 */
export function allTemplates(storedUserTemplates) {
	const users = [];
	for (const stored of Array.isArray(storedUserTemplates) ? storedUserTemplates : []) {
		if (!stored || typeof stored !== 'object')
			continue;
		const t = userTemplate(stored.id, stored.source);
		if (t)
			users.push(t);
	}
	users.sort((a, b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));
	return [...BUILT_INS, ...users];
}

/** Looks a template up by id, falling back to the KML built-in, never to a position. */
export function findTemplate(templates, id) {
	const list = Array.isArray(templates) ? templates : BUILT_INS;
	return list.find(t => t.id === id) ?? list.find(t => t.id === DEFAULT_TEMPLATE_ID) ?? BUILT_INS[0];
}

export default allTemplates;
