// Colors shared by the flight tools, so a flight keeps its color whether it is
// looked at on a chart in the flight info tool or on a map from the flight path tool.

// Chart series in the flight info tool.
export const SeriesColors = Object.freeze({
	altitude: '#00FFFF',
	altitudeF: '#0000FF',
	velocity: '#00FF00',
	velocityF: '#00AA00'
});

// Flight events, used for chart markers and for the matching map pins.
export const EventColors = Object.freeze({
	apogee: '#000000',
	drogue: '#FF0000',
	main: '#FF8C00'
});

// One entry per flight (or tracker) in a flight path export. Entry 0 is the same
// blue the altitude series uses on the chart.
export const BranchColors = Object.freeze([
	'#0000ff',
	'#ff0000',
	'#00aa00',
	'#ff8c00',
	'#8000ff',
	'#00aaaa'
]);

// Ground track colors are a separate palette, not a shade of the flight path palette.
// Seen from overhead a ground track sits directly under its own flight path, so entry i
// here is chosen to contrast with entry i above, and is saturated enough to hold up
// over aerial imagery.
export const GroundColors = Object.freeze([
	'#ffff00',
	'#00ffff',
	'#ff00ff',
	'#0000ff',
	'#c8ff00',
	'#ff0000'
]);

// Default pin color per waypoint type. Pad and landing keep the colors the tool has
// always used; the event pins follow the chart marker colors where they do not collide.
export const PinColors = Object.freeze({
	pad: '#ff0000',
	liftoff: '#ff8c00',
	maxAcceleration: '#ffff00',
	maxVelocity: SeriesColors.velocity,
	apogee: SeriesColors.altitude,
	drogue: '#ff00ff',
	main: '#8000ff',
	landing: '#00aa00'
});
