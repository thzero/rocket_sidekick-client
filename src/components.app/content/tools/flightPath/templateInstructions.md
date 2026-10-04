### Creating your own templates

The output format is a Handlebars template rendered against the processed flight. Drop a file named `<name>.<ext>.hbs` into the template box and it appears in the format list; the extension picks both the exported file's extension and its escaping rule (`kml`, `gpx` and `xml` escape for XML, `csv` doubles quotes inside quoted fields, anything else is written raw).

Fields at the top level: `documentName`, `title`, `missionName`, `date`, `location`, `processorName`, `altitudeUnit`, `velocityUnit`, `accelerationUnit`, `distanceUnit`, `kmlAltitudeMode`, `kmlWaypointAltitudeMode`, `includeFlightPath`, `includeGroundTrack`, `includeDescriptions`, `showWaypointLabels`, `colorWaypointPins`, `extrudePath`, `extrudeWaypoints`, `tessellatePath`, `summary` (`maxAltitude`, `maxVelocity`, `maxAcceleration`, `maxRange`, `timeToApogee`, `flightTime`), `labels` and `branches`.

Each branch (one per flight or tracker) has `name`, `index`, `tracker`, `pathColorKml`, `groundColorKml`, `pinColorKml`, `colorRgb`, `groundColorRgb`, `pinColorRgb`, `hasPath`, `hasWaypoints`, `hasLanding`, `maxRange`, `landingDistance`, `landingBearing`, `landingTime`, `landingLatitudeStr`, `landingLongitudeStr`, `waypoints` and `path`.

Each waypoint has `type`, `label`, `qualifiedLabel`, `name`, `detail`, `device`, `latitude`, `longitude`, `latitudeStr`, `longitudeStr`, `altitudeMslMeters`, `altitudeAglMeters`, `altitudeKmlMeters`, `altitude` (formatted for people), `altitudeValue` (a plain number in the output unit, for machine-read columns), `altitudeMsl`, `velocity`, `acceleration`, `distance`, `distanceMeters`, `bearing`, `time`, `seconds`, `pinColorRgb` and `pinColorKml`. Each path point has `latitude`, `longitude`, `latitudeStr`, `longitudeStr`, `altitudeMslMeters`, `altitudeAglMeters`, `altitudeKmlMeters`, `altitude`, `altitudeValue`, `time` and `seconds`.

Rules worth respecting:

- KML and GPX want coordinates in the order longitude, latitude, altitude.
- Pair `altitudeKmlMeters` with `kmlAltitudeMode` (or `kmlWaypointAltitudeMode` for pins), or the geometry is measured against the wrong datum. GPX elevation is always `altitudeMslMeters`, which is empty when sea level is unknown.
- Use `latitudeStr` and `longitudeStr` for anything a person reads, and the raw numbers only for machine-read geometry.
- Write balloon HTML pre-escaped (`&lt;b&gt;` rather than `<b>`) and never wrap a value in CDATA; every substituted value is escaped for you.
- `{{#if value}}` treats an empty string and zero as false; use `{{#if value includeZero=true}}` when zero is a real value.
- Inside `{{#each branches}}` and `{{#each waypoints}}`, reach the top level with `@root`, for example `{{@root.altitudeUnit}}`.
