# Flight Path Export Proposal

A proposal to bring the rocketSidekick flight path tool (Featherweight GPS lat/lng data) up to
the functionality of the OpenRocket 3D Path export (simulated lat/lng data). Written
2026-09-20 against the current `dev` code, revised 2026-09-23 with the full design document.

Companion references: the OpenRocket implementation notes, "The 3D Path Export: Implementation
Notes", and the full design document, "3D Flight Path Export". Both describe a templated
exporter that turns simulated flight data into KML, GPX, waypoint CSV, or any user-supplied
Mustache template. Section 6 of this proposal collects what the full document adds.

---

## 1. Where the two implementations stand

The OpenRocket exporter and the rocketSidekick tool solve the same problem, but OpenRocket has
a clean seam between "compute the flight" and "render a format", and rocketSidekick does not
yet. Today the base processor in `src/service.app/tools/flightPath/processors/index.js` builds
KML coordinate strings while it walks the rows, and the only output is KML through templates
that hardcode `absolute` altitude mode. The template editor in the UI is hidden behind
`v-if="false"`, so the templating that exists is not reachable.

| Capability | OpenRocket | rocketSidekick today |
| --- | --- | --- |
| Formats | KML, GPX, waypoint CSV, user templates | KML only |
| Data model | plain struct, format-agnostic | KML strings built inside the processor |
| Templates | one per format, discovered by filename | main + 4 pin partials, editor hidden |
| Escaping | chosen by extension | Handlebars default only |
| Waypoints | 8 types, per-type toggle | 4 types (launch, max alt, max vel, touchdown) |
| Waypoint labels | mission prefix, stage prefix, hide labels | fixed translated labels |
| Altitude reference | auto / ground / sea level / clamped, track and pins separately | absolute for track, clamped for ground, fixed |
| Shadow and tessellate | derived flags | `extrude="1"` as an attribute, which KML ignores |
| Point thinning | keep every Nth, last point guaranteed | distance outlier filter, max hardcoded at 10 m |
| Multi-track | one document, folder per stage, per-stage colors | one download per flight, one shared style |
| Presets | drift cast, flight path, landing | none |
| Distance and bearing per waypoint | yes | no |
| Tests | 44 headless | none |

### What not to port

Some things in the OpenRocket writeup do not transfer:

- **The meters-over-degrees coordinate trick.** GPS gives degrees directly at 5 to 7 decimals.
  There is no lossy round trip through a saved file.
- **Copied-branch trimming and burnout attribution.** GPS flights are independent tracks, not
  copies of a parent branch. There is no shared ascent to trim and no motor to attribute.
- **The Kennedy Space Center fallback.** A GPS file always has coordinates. The analog is
  dropping no-fix rows (see section 2.6).
- **JMustache.** Handlebars is a superset of Mustache for everything the three OpenRocket
  templates use (`{{#list}}`, `{{^flag}}`, `{{{raw}}}`), so the built-in templates port almost
  verbatim.

---

## 2. Proposal

### 2.1 Split the processor into parser, builder, and exporter

Processors keep only the CSV-to-rows job they do now, plus flight detection. A new builder turns
the normalized flights into a plain model object, and a new exporter binds that model to a
template. Suggested layout:

```
src/service.app/tools/flightPath/
  options.js                 export options, normalizing setters
  model/builder.js           flights -> FlightPathModel (all the logic)
  model/geo.js               haversine, bearing, altitude helpers
  processors/                parse only (IFIP, BlueRaven)
  output/exporter.js         model + template -> string, escaping by extension
  output/templates/index.js  repository: built-ins plus user templates from the store
  output/templates/flightpath.kml.hbs
  output/templates/flightpath.gpx.hbs
  output/templates/waypoints.csv.hbs
```

Vite imports the `.hbs` files as strings with the `?raw` suffix.

The model mirrors OpenRocket's shape:

```js
{
  title, rocketName, missionName,
  launchLatitude, launchLongitude, launchAltitudeMeters,
  altitudeUnit, distanceUnit, velocityUnit,
  includeFlightPath, includeGroundTrack,
  kmlAltitudeMode, kmlWaypointAltitudeMode,
  extrudePath, extrudeWaypoints, tessellatePath,
  showWaypointLabels, colorWaypointPins,
  maxAltitude, maxVelocity, maxAcceleration,      // preformatted in output units
  branches: [{
    name, index,                                  // tracker name or "Flight N"
    colorRgb, groundColorRgb, pinColorRgb,
    pathColorKml, groundColorKml, pinColorKml,
    hasPath, hasWaypoints,                        // booleans, precomputed
    waypoints: [{ type, label, qualifiedLabel, latitude, longitude,
                  latitudeStr, longitudeStr, altitudeMslMeters, altitudeAglMeters,
                  altitudeKmlMeters, altitude, distance, bearing, time, pinColorKml }],
    path:      [{ latitude, longitude, latitudeStr, longitudeStr,
                  altitudeMslMeters, altitudeAglMeters, altitudeKmlMeters, altitude, time }]
  }]
}
```

Each branch is one detected flight or one tracker. Precompute `hasPath` and `hasWaypoints` as
booleans rather than relying on Handlebars calling functions, so the model stays a plain
JSON-able struct that tests can compare directly.

Keep the builder free of `BaseService` and translation lookups by passing the label strings in.
That is what makes it testable without an injector.

### 2.2 Escaping by extension

XML formats (`kml`, `gpx`, `xml`) compile with Handlebars default escaping, which is already
XML-safe. CSV compiles with `noEscape: true` and a registered `csv` helper that doubles interior
quotes; the template quotes every field, which together is correct RFC 4180. Anything else
compiles with `noEscape`.

The template's extension picks the rule and also picks the download filename, exactly as in
OpenRocket. A user template named `mytrack.csv.hbs` gets CSV escaping without declaring it.

### 2.3 Altitude reference, per track and per waypoints

Add the four-value option (`automatic`, `ground`, `seaLevel`, `clamped`) with the same
`resolve` step, and carry the KML altitude mode string on the option definition so nothing
downstream switches on it.

The data makes `automatic` meaningful:

| Source | ASL column | AGL column |
| --- | --- | --- |
| BlueRaven | `ALT` | `Altitude AGL` |
| IFIP tracker file | yes | no |
| IFIP ground station file | no | yes |

When only one exists, derive the other from the first accepted point, or from a new optional
"launch site elevation" input. `automatic` resolves to `seaLevel` when ASL is available or the
launch elevation was set, otherwise `ground`.

The builder then sets `extrudePath`, `extrudeWaypoints`, and `tessellatePath` from the resolved
references, and the KML template emits proper `<extrude>` and `<tessellate>` child elements.
The current `<LineString extrude="1">` is an attribute KML does not recognize.

### 2.4 Waypoints as an enumerated set

| Waypoint | Source in GPS data |
| --- | --- |
| pad | first accepted row |
| liftoff | first row that passed the vertical velocity threshold |
| apogee | max altitude |
| maxVelocity | max vertical velocity |
| maxAcceleration | differentiated vertical velocity, or BlueRaven accelerometer columns when present |
| drogue, main | processor supplied, when the file has event columns |
| landing | last accepted row |

The `_publish` signature already reserves slots for apogee, nose over, drogue, main, and ground
and always passes null, so the plumbing is half there.

Keep the per-type pin colors (OpenRocket lacks that) and add a "color pins by flight" toggle
that switches to the per-branch pin color. Use the white pushpin icon over https for every
colored pin, since KML multiplies the tint against the icon pixels.

Add:

- mission name prefixing, with the "already starts with the prefix" guard
- tracker name qualification only when there is more than one branch, with the same guard
- hide labels via `<LabelStyle><scale>0</scale>`
- distance and bearing from the pad on every waypoint, using haversine and `atan2(east, north)`

JavaScript `toLowerCase()` is locale-independent, so the Java `Locale.ROOT` concern does not
apply.

### 2.5 One document, a folder per flight

Replace the loop of separate downloads with one file whose branches each get their own folder
and their own `flightPath{index}` and `groundTrack{index}` styles from a default palette with
sparse per-branch overrides. Keep a "one file per flight" toggle for people who want the old
behavior.

Name the file from the mission or title plus an ISO date (`yyyy-mm-dd`) so it sorts, with the
extension taken from the template.

Convert colors to KML `aabbggrr` at the last step in the builder. Everything upstream stays
`#rrggbb`. The existing `_reverseRgb` helper moves into `model/geo.js` or a small color helper.

### 2.6 Thinning and filtering

- Add `pathStride` with the append-last-point guard so the track always ends at landing.
- Wire the existing "Filter Distance" field. The UI shows 15 while the filter in
  `processors/filter/simple.js` is hardcoded at 10 and never reads the field.
- Change the filter to compare against the last accepted point rather than the last seen
  point. Today one outlier also drops the good point after it.
- Consider making the filter speed based (distance divided by sample interval) rather than
  distance based, so a fast horizontal drift under drogue is not rejected.
- Drop rows where latitude and longitude are both zero. That is the no-fix case and the direct
  analog of OpenRocket's "both zero means unset" rule. A single zero is a real coordinate.

### 2.7 Presets and preferences

Three preset buttons that set the visible controls and state the complete selection:

| Preset | Track ref | Pin ref | Path | Ground | Shadow | Waypoints |
| --- | --- | --- | --- | --- | --- | --- |
| Drift cast | clamped | clamped | off | on | off | all |
| Flight path | automatic | automatic | on | on | off | all |
| Landing plots | clamped | clamped | off | off | off | landing only |

Presets must be idempotent and order independent, so each one sets every control. No preset
turns on the shadow: under a single pin the extrude is a plumb line that reads as a position,
but under a whole arcing path it is a solid wall that buries the flight. The checkbox stays for
the case it is good at.

Render the presets as a toggle group that stays honest. A `syncPresetSelection` watcher selects
the preset whose every value matches the current controls and clears the selection when none
does, so a manual edit drops the highlight and undoing it brings the highlight back. A fresh
panel must match "Flight path" exactly, so the preset values and the store fallbacks have to
agree.

Persist template id, altitude references, waypoint set, stride, and toggles under a new store
key. Store enum values as their name strings with a tolerant lookup that falls back to the
default on anything unrecognized. Following the OpenRocket decision, do not restore the mission
name between sessions: remember how the tool is set up, not what the last artifact was called.

### 2.8 User templates

Unhide the template panel and switch it to one template per format instead of main plus
partials. Pin markup becomes a registered Handlebars partial (`{{> waypoint}}`) so a user can
override just that.

Accept dropped `<name>.<ext>.hbs` files through the existing drop-file component, and save them
in the store as `{ id, name, extension, source }`. That is the browser equivalent of the
OpenRocket `ExportTemplates` folder. Built-ins list first, user templates follow sorted by name.
A template that fails to compile is logged and dropped from the list, not thrown.

Compile with a fallback for missing fields (Handlebars `strict: false`, which is the default)
so a typo in a user template renders empty instead of failing at a launch site.

### 2.9 Tests

The service layer has no Vue dependency, so add vitest with hand-built row arrays as fixtures
and assert on rendered strings, the way the OpenRocket suite does. Cases to pin first:

- stride keeps the last point, on a single flight and on a multi-branch file
- both-zero rows are dropped, a single-zero row is kept
- GPX elevation ignores the altitude reference setting
- a two-tracker file gets qualified labels and a single-tracker file does not
- a label that already starts with its prefix is not prefixed twice
- CSV quoting and XML escaping
- automatic reference resolves to sea level only when ASL data exists
- extrude is dropped for whichever half is clamped, tessellate is set only when clamped
- second flight in a file gets the second palette entry, not flipped colors

---

## 3. Pre-existing defects to fix in the first phase

These surfaced while reading and would undermine the new work if left:

| Defect | Where |
| --- | --- |
| Colors flip on the second flight. `flight.style` is the same object as `results.style`, and the KML output reverses the RGB in place, so flight two gets un-reversed colors. | `src/service.app/tools/flightPath/output/kml.js:14` |
| Flight end flag is lost. The `_publish` wrapper declares 18 parameters but callers pass 19 and the inner publish expects 19, so `flightEnd` is always undefined. | `src/service.app/tools/flightPath/processors/index.js:257` |
| Sorting never runs. The sort is invoked with one argument against a two-argument signature, and would call sort on the flight object rather than its data array if it did run. | `src/service.app/tools/flightPath/processors/index.js:70` and `:358` |
| Style lookup ignores the processor. The store getter returns the first saved style regardless of id. | `src/store.app/pinia.js:145` |
| Additional pins never render. The KML output checks `this._templatePinsAdditional`, which lives on the template service, not on the output service. | `src/service.app/tools/flightPath/output/kml.js:51` |
| Pin tinting. Launch and touchdown pins use the default yellow pushpin, and KML multiplies the tint against it. | `output/template/handlebars.js` launch and touchdown defaults |
| The description element never renders. It is built as a full `<description>` tag and inserted with double braces, so Handlebars escapes the tag into text inside `<Document>`. | `output/template/handlebars.js:144` and `output/kml.js:31` |
| Escaped values inside CDATA. Every `<name>` wraps an escaped Handlebars value in `<![CDATA[ ]]>`, so a title containing `&` reaches Google Earth as the literal text `&amp;`, and a title containing `]]>` breaks the document. Drop the CDATA and rely on the escaper. | `output/template/handlebars.js`, every `<name>` |
| Touchdown is always the last row. A file that ends mid-flight (lost signal, tracker battery, truncated download) still gets a touchdown pin at wherever the data stopped. | `src/service.app/tools/flightPath/processors/index.js:135` |
| BlueRaven row index never increments, so its last-row publish path is dead and the index stored per row is actually the last column value. | `src/service.app/tools/flightPath/processors/br/featherweight.js` |
| `serviceFlightPath.value.styleDefault` in the process handler: the service is not a ref, so this throws if a color is ever null. | `src/components.app/content/tools/flightPath/flightPathBase.vue` |
| Template refs read `serviceFlightPath.templateMainDefault`, which does not exist on that service. Harmless today because the fallback catches it, but it shows the template plumbing is dead. | same file |

---

## 4. Suggested order and rough size

| Phase | Scope | Estimate |
| --- | --- | --- |
| 1 | options, model, builder, exporter, port KML, fix the defects above | 500 to 600 lines |
| 2 | GPX and CSV templates, escaping, repository, single document, naming | 200 lines plus 3 templates |
| 3 | altitude references, shadow, tessellate, launch elevation input, presets | 250 lines |
| 4 | waypoint set, labels, per-branch colors, stride, filter fixes | 300 lines |
| 5 | user templates and the unhidden editor | 200 lines |
| 6 | vitest and fixtures, grown alongside each phase | 600 to 800 lines |

Phase 1 is the one that pays for everything after it. Each later phase becomes a builder change
plus a template change with no UI-to-KML coupling to unpick.

## 5. Open decisions

- Whether the multi-flight single-document output is the default or an option.
- Whether to add a "launch site elevation" input or only derive AGL/ASL from the data.
- Whether the flight title, date, and location should keep being restored between sessions, or
  follow the OpenRocket rule and only restore setup.

---

## 6. What the full design document adds

The full "3D Flight Path Export" document covers ground the implementation notes only
summarized. These are the parts that change or extend the proposal above.

### 6.1 Balloons and descriptions

Google Earth shows a feature's `description` in a balloon when it is clicked. OpenRocket fills
three levels and gates the whole lot on one `includeDescriptions` toggle:

| Level | Contents for GPS data |
| --- | --- |
| Document | title, date, location, tracker list, peak altitude, velocity, and acceleration, max range, time to apogee, flight time, one line per flight saying where it came down |
| Flight folder | that flight's tracker, max range, landing distance and bearing |
| Waypoint | time since liftoff, altitude above pad and above sea level, distance and bearing from the pad, coordinates marked `(lat, lon)` |

Two KML details to copy:

- Do not emit `<Snippet maxLines="0"/>`. Google Earth for web rejects the `maxLines` attribute
  as an unsupported element, and Earth Pro still prints the opening lines of the description
  under the name in the places tree with it in place, so it buys nothing.
- Where a balloon opens differs by viewer. Earth Pro opens waypoint balloons from the 3D view but
  document and folder balloons only from the Places panel. Earth for web opens all of them from
  the project panel. Worth knowing before concluding a balloon is missing.

The current tool already has the seed of this: `kml.js` composes a date-and-location
description. Section 3 records that it never renders today.

### 6.2 Pre-escaped markup, not CDATA

This is the most directly applicable lesson, because the current templates do the opposite.

A KML `description` holds HTML. Handlebars escapes every substituted value, and inside a CDATA
block those escapes are never decoded, so `Bill & Ted` reaches the balloon as the literal text
`Bill &amp; Ted`. A CDATA block is also breakable: a value containing `]]>` ends it early and
the document is invalid.

The fix is to write the balloon markup pre-escaped in the template, as `&lt;b&gt;` rather than
`<b>`, and to drop CDATA everywhere. Template markup and substituted values are then each
escaped exactly once, the XML parser decodes them together, and the balloon receives the HTML
the template intended and the name the user typed. Use a literal UTF-8 degree sign rather than
`&deg;` for the same reason.

This applies to every `<name>` in the current templates, not only descriptions.

### 6.3 Optional lines vanish rather than render empty

OpenRocket configures Mustache so that an empty string and a zero are falsy in a section, and
four balloon lines rely on it: the configuration when there is none, the sea level altitude when
no launch elevation is known, the recovery device on a non-ejection waypoint, and the landing
lines for a flight that never landed.

Handlebars gives this for free: `{{#if value}}` treats `""`, `0`, `null`, and `[]` as false.
The same sharp edge follows, so a template cannot use `{{#if}}` to test for the presence of a
value that is legitimately zero. Handlebars offers `{{#if value includeZero=true}}` for that
case, which Mustache does not, and the template author notes should say so.

The concrete payoff for GPS data: a flight from an AGL-only file with no launch elevation must
not print "above sea level" lines that are really heights above the pad. Leave
`altitudeMslMeters` empty in the model when it is unknown, and the line disappears.

### 6.4 Summary values, and a landing is a fact, not a default

Add to the model, at flight level: peak altitude, velocity, and acceleration, max range, time
to apogee, flight time. Per branch: max range in meters and display units, `hasLanding`, and the
landing's distance, bearing, time, and coordinates.

Three rules from the document that map directly onto GPS data:

- **Max range is not the landing distance.** A rocket drifts downrange under the chute and can
  come partway back, so the farthest point from the pad is often not where it lands. The
  maximum is the range safety figure. Export both.
- **A flight that never landed must not report a landing.** The GPS analog is a file that stops
  before the consecutive-zero-velocity detection fires: lost signal, dead battery, truncated
  download. Today `touchdownCoords` is set to the last row unconditionally. Put the landing
  behind `hasLanding`, set only when the end-of-flight detection actually fired.
- **Scan the landing from the detected events, not from the emitted waypoints**, so the landing
  line in the document balloon is still correct when the user has switched the landing pin off.

Time to apogee should come from the highest recorded altitude, which for GPS is the honest
answer and is never empty for a non-empty flight.

### 6.5 Coordinate precision and ordering

- Every coordinate a person reads is formatted to six decimal places. Raw doubles print whatever
  digits they need, so one file says `-80.6` where another says `-97.4966`, which reads as if the
  two were surveyed to different accuracies. The model's `latitudeStr` and `longitudeStr` carry
  the fixed form; the raw doubles are for geometry only.
- Every pair in a balloon is marked `(lat, lon)`. KML's own `<coordinates>` are longitude first,
  so anyone reading a bare pair in a KML file has a standing reason to read it backwards, and at
  most launch sites both readings land somewhere plausible.
- A test counts the `(lat, lon)` markers against the number of coordinate pairs in the rendered
  file, so an unmarked pair cannot be added later without failing.

### 6.6 Colors

- The ground track palette is a separate palette, not a shade of the flight path palette. Seen
  from overhead a ground track sits directly under its own flight path, so entry `i` in one is
  chosen to contrast with entry `i` in the other, and saturated enough to hold up over aerial
  imagery.
- The flight path palette is the same one the plot window uses, so a stage keeps its color from
  graph to map. The rocketSidekick analog is the flight info tool's chart colors in
  `src/components.app/content/tools/flightInfo/charts/flightInfoChartBase.vue`. Share one
  palette between the two tools.
- Pins default to the flight path color of their branch.
- Recovery pins are named for the device as well as the event: `Drogue Ejection` and
  `Main Ejection`, because a dual-deploy flight puts two ejection markers hundreds of meters
  apart and the label is the only thing that tells them apart on the map. Keep the label's own
  capitalization.

### 6.7 Template value object and repository

`FlightPathTemplate` is immutable: `id` (stable, remembered in preferences), `displayName`,
`extension`, `source`, and a `builtIn` flag. The extension does double duty, picking the
escaper and forcing the download extension. Carry the same five fields in the store record for
user templates.

The repository builds a fresh list on every call and caches nothing, so a newly saved user
template appears the next time the panel opens without a reload. The default is the first
built-in, which must be KML. Two user templates with the same base name and different extensions
appear under one display name; append the extension to the display name to avoid the ambiguity
OpenRocket lives with.

The Mustache compiler is rebuilt per export because the escaper depends on the chosen template.
The Handlebars equivalent is compiling per export with `noEscape` chosen from the extension,
which is cheap enough not to cache.

The exporter returns a string and does not own the output. In the browser that means the
exporter never touches the download service; the base component turns the string into a Blob.

### 6.8 Preferences and export flow

- Nothing is stored until the file is actually written, so canceling leaves the remembered
  settings alone. The current tool saves style and units on Process, which is the equivalent
  commit point in this UI. Keep that, but do not save on a failed process.
- A corrupt stored color pair is skipped, costing one color rather than the whole panel.
- A ticked but disabled shadow checkbox exports false, so the geometry never disagrees with what
  the panel shows. Derive `drawShadow` in the options from the checkbox and the enabled state,
  not from the checkbox alone.
- The export runs without closing the panel, so the user can change one thing and export again.

### 6.9 Sharp edges to design around

| OpenRocket edge | rocketSidekick guard |
| --- | --- |
| Combo index maps to enum ordinal; reordering silently changes the export | Vuetify selects bind to string values, never to an index. Store the string name. |
| Preset definitions and `load()` fallbacks must agree or the highlight starts empty | Define the "Flight path" preset once and derive the store defaults from it |
| `getTemplates()` order is load-bearing; a failed KML resource would make CSV the default | Look the default up by id, not by position |
| User template display names are not deduplicated | Include the extension in the display name |
| A genuine zero is falsy in a section | Document `includeZero=true` in the template author notes |
| A stale javadoc claims a success dialog that does not exist | Keep the success notification the tool already shows, and keep the comment honest |

### 6.10 Tests to add from the full document

Beyond the list in section 2.9:

- Render a title containing `&`, `'`, `<`, and `>`, parse the KML with `DOMParser` (available
  in vitest through jsdom), and assert the name comes back intact inside the intended HTML.
  That proves both the escaping rule and that the document stays well formed.
- Count `(lat, lon)` markers against coordinate pairs.
- A file that ends mid-flight produces no landing waypoint and no landing line, and
  `hasLanding` is false.
- Max range and landing distance differ on a fixture that drifts out and back.
- Descriptions can be switched off and every `<description>` disappears.
- Component tests against the base composable: the starting preset is "Flight path", no preset
  turns on the shadow, the highlight clears on a manual edit and returns when it is undone, and
  no preset touches the descriptions toggle.

### 6.11 Rules for template authors

These belong in the tool's instructions panel, which already renders markdown per processor,
under a "Creating your own templates" heading:

- KML and GPX want coordinates in the order longitude, latitude, altitude.
- Pair `altitudeKmlMeters` with `kmlAltitudeMode`, or the geometry is measured against the wrong
  datum.
- Use `latitudeStr` and `longitudeStr` for anything a person reads, and the raw doubles only for
  machine-read geometry.
- Write balloon HTML pre-escaped and never wrap a value in CDATA.
- `{{#if}}` treats zero as false; use `includeZero=true` when zero is a real value.
- Name the file `<name>.<ext>.hbs`; the extension picks the escaping and the download name.

### 6.12 Revisions to the phase plan

| Phase | Added scope |
| --- | --- |
| 1 | drop CDATA, fix the escaped description element, `hasLanding` |
| 2 | descriptions at all three levels, `includeDescriptions` toggle, six-decimal strings, `(lat, lon)` markers |
| 3 | preset toggle group with `syncPresetSelection`, shadow off in every preset |
| 4 | max range and landing as separate values, device-named recovery pins, shared palette with flight info charts, separate ground palette |
| 5 | extension in user template display names, template author notes in the instructions panel |
| 6 | DOM-parse escaping test, marker count test, mid-flight truncation test, composable preset tests |

The estimate for phase 2 grows by roughly 150 lines for the balloon content, and phase 6 by
roughly 150 lines. The rest is absorbed.

---

## 7. Implementation status (2026-09-23)

All six phases are implemented. Where the code landed:

```
src/service.app/tools/palette.js                       shared colors (flight info charts and the map)
src/service.app/tools/flightPath/options.js            FlightPathExportOptions, Waypoint, AltitudeReference, Presets
src/service.app/tools/flightPath/model/geo.js          haversine, bearing, KML color, fixed precision, prefix, slug
src/service.app/tools/flightPath/model/builder.js      flights -> model (filtering, datums, waypoints, stride, summary)
src/service.app/tools/flightPath/output/exporter.js    Handlebars binding, escaping by extension
src/service.app/tools/flightPath/output/templates/     index.js repository, flightpath.kml.hbs, flightpath.gpx.hbs, waypoints.csv.hbs
src/service.app/tools/flightPath/processors/index.js   base processor: shared flight detection, units, labels, FlightPath rows
src/service.app/tools/flightPath/processors/br/        BlueRaven parser (columns only)
src/service.app/tools/flightPath/processors/ifip/      IFIP parser (columns only)
src/service.app/tools/flightPath/index.js              orchestrator: processors, templates, options, presets
src/components.app/content/tools/flightPath/           panel, base composable, validation, templateInstructions.md
test/flightPath/export.test.js                         31 tests over the core
test/flightPath/processors.test.js                     7 tests over parsing and detection
vitest.config.js                                       jsdom, path alias, thzero packages inlined
```

Removed: `output/kml.js`, `output/index.js`, `output/template/*`, `processors/filter/*`, and
their injector keys.

Decisions taken on the open questions in section 5:

- One document with a folder per flight is the default; "One file per flight" is a checkbox.
- A "Launch site elevation" input was added, in the input altitude unit, stored in meters.
- Title, date, and location keep being restored between sessions as before. The mission
  name is not.

Three changes beyond the proposal that the tests and a real BlueRaven export forced:

- **The outlier filter is a maximum horizontal speed, not a distance.** A distance per
  sample cannot tell a 10 Hz boost from a glitch: the comparison is always against the last
  accepted point, so once one sample is rejected the distance keeps growing while the
  allowance does not, and the rejection cascades through the whole ascent. On the sample
  file it dropped 235 of 336 points and halved the apogee. The filter now compares the
  implied speed since the last accepted point (default 300 m/s, 0 disables) and accepts the
  next sample after three rejections in a row. The same file now keeps every point.
- **Rows at rest are held, not dropped.** The old detection discarded every row whose
  vertical velocity was within one unit of zero, which is exactly the sample at apogee. Rows
  at rest are now held back and published if the flight continues; when the flight ends, the
  first held row is the landing. The last row before liftoff is published too, so the pad has
  a position and an AGL datum on the ground.
- **BlueRaven flags drive detection when present.** Newer exports carry `Launch detection`,
  `Apogee detection` and `Landing detection` columns that flip once and stay set. The parser
  uses their transitions for the start, the apogee pin and the end of a flight, and drops rows
  whose `FIX` is 0. The sample file ends four rows after touchdown, fewer than the five rows at
  rest the velocity rule needs, so without the flags it would have had no landing.

Verified against a real export (`thzero5_11-08-2024_13_51_53.csv`, 363 rows, 10 Hz during
boost and 1 Hz during descent): one flight, no dropped points, apogee 7,894 ft at T+21.5 s
on the flagged row, max velocity 788 ft/s, landing at T+154.6 s 3,644 ft from the pad, max
range 3,816 ft. KML, GPX and CSV all rendered and the KML parsed.

Done since:

- The replacement instructions content in `content/tools.flightPath/` has been loaded into
  the API's content collection. The template author notes ship in the app bundle as
  `templateInstructions.md`.

TODO:

- **Drogue and main pins.** There is no source for deployment events in the data available
  today. The BlueRaven export carries launch, apogee and landing flags but no deployment
  columns, and the iFIP layout has no flags at all. The pins cannot be offered until a
  firmware or app update adds deployment columns to the export. When that happens, the only
  change needed is in the BlueRaven parser: detect the new columns in `_check`, and publish
  a `{ type: 'drogue' }` or `{ type: 'main' }` event on the row where the flag turns on, the
  same way the apogee flag is handled in `_detectFlightsByFlags`. The options, builder,
  templates, panel checkboxes and pin colors for both pins already exist and are tested
  against synthetic events.

Known limitation, accepted:

- Per-flight color pickers appear after a file is processed, and a change takes effect on
  the next Process rather than updating the rendered file in place.
