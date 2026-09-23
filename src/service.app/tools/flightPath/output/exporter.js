// Binds a flight path model to a Handlebars template. The template's extension picks the
// escaping rule, so a user template named mytrack.csv.hbs gets CSV escaping without
// declaring it. Pure module: no services, no Vue.

import Handlebars from 'handlebars';

export const Escaping = Object.freeze({
	XML: 'xml',
	CSV: 'csv',
	NONE: 'none'
});

export function escaperFor(extension) {
	switch ((extension || '').toLowerCase()) {
		case 'kml':
		case 'gpx':
		case 'xml':
			return Escaping.XML;
		case 'csv':
			return Escaping.CSV;
		default:
			return Escaping.NONE;
	}
}

/** CSV escaping doubles interior quotes; templates quote each field themselves. */
export function csvEscape(value) {
	if (value === null || value === undefined)
		return '';
	return String(value).replace(/"/g, '""');
}

const CSV_HELPER = 'csv';

/**
 * Handlebars escapes for HTML on every {{expression}}. For CSV the same automatic
 * behavior is wanted with a different rule, so plain expressions are rewritten to go
 * through the csv helper before compiling with escaping off. Blocks, partials,
 * comments, raw triple-stash output and `else` are left alone.
 */
export function rewriteForCsv(source) {
	return String(source).replace(/(?<!\{)\{\{(?![#/^!>&{~])\s*([^{}]+?)\s*\}\}/g, (match, expression) => {
		const expr = expression.trim();
		if (expr === 'else' || expr.startsWith('else ') || expr.startsWith(CSV_HELPER + ' '))
			return match;
		return `{{${CSV_HELPER} ${expr}}}`;
	});
}

function environment() {
	const env = Handlebars.create();
	env.registerHelper(CSV_HELPER, (value) => csvEscape(value));
	return env;
}

/**
 * Compiles a template source for an output extension. Throws on a syntax error so the
 * caller can tell the user which template is broken; a missing field renders empty.
 */
export function compileTemplate(source, extension) {
	const escaping = escaperFor(extension);
	const env = environment();
	if (escaping === Escaping.XML)
		return env.compile(String(source ?? ''), { strict: false });
	const text = escaping === Escaping.CSV ? rewriteForCsv(source ?? '') : String(source ?? '');
	return env.compile(text, { noEscape: true, strict: false });
}

/** Renders the model through the template and returns the document as a string. */
export function renderFlightPath(model, template) {
	if (!template || typeof template.source !== 'string')
		throw new Error('A template with a source is required.');
	const compiled = compileTemplate(template.source, template.extension);
	return compiled(model);
}

export default renderFlightPath;
