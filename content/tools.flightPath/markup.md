The FlightPath tool takes data from your GPS tracker and turns it into a geographic file you can open in a map viewer: a Keyhole Markup Language (KML) file for <a target="_blank" href="https://www.google.com/earth/about/versions/">Google Earth Pro</a>, a GPX track for a handheld GPS or a mapping site, a waypoint CSV for a spreadsheet or Google My Maps, or any format you write a template for.

Once you have processed flight data, the Export button downloads the file. With Google Earth Pro installed, double click a KML file to load it. You will see the rocket's path through the air, its track over the ground, and labeled pins at the pad, liftoff, apogee, landing and the other points you asked for. Click a pin, or the flight's name in the Places panel, for a balloon with the numbers behind it.

#### Processing a flight

* Choose the **Flight Data Type** that matches your tracker's export, then drag and drop the CSV file onto the drop zone, or paste it into the "CSV GPS Flight Data" box. FlightPath checks the headers straight away and tells you if the file does not match.
* Set the flight title, date and location. The title becomes the document name; the date and location go into the summary balloon.
* Set the **GPS** measurement units to match the file (the defaults match each tracker) and the **Output** units for the labels in the file.
* Pick an **Output Format** and any placement, waypoint and path options (described below).
* Click **Process**. The rendered file is shown on the right, and **Export** downloads it.

Every option except the mission name is remembered for next time once a file has been processed. The mission name describes one flight, so it is not.

#### Output format

Three formats are built in: KML (Google Earth), Waypoint CSV, and GPX track. The extension of the chosen format is the extension of the downloaded file.

You can add your own format by dropping a Handlebars template file named `<name>.<ext>.hbs` onto the template drop zone. It appears in the format list and is remembered. The "Creating your own templates" notes below the instructions list every field a template can use.

#### Mission

A mission name is put in front of the document title and each flight's name, so that several files loaded into one Google Earth session do not all present a "Flight 1". Tick **Prefix waypoints with mission** to put it on the pins as well; a near-vertical flight already packs its pins into a small patch of screen, so this is off by default.

#### Placements

Three presets set the controls beneath them, so what the file will contain is always what the panel shows. Pick one as a starting point and adjust from there; the preset button stays highlighted only while every control still matches it.

* **Drift cast**: everything laid flat on the terrain, for seeing what the rocket drifted over.
* **Flight path**: the track suspended in the air with pins in the air beside it. This is the default.
* **Landing plots**: the landing pin on the ground and nothing else.

The track and the pins each have their own altitude reference:

* **Automatic** places the flight against sea level when the file (or the launch site elevation) allows it, and above the ground otherwise.
* **Above ground** draws heights above the launch pad on top of the terrain. This is the safe choice for a file that only reports height above ground.
* **Above sea level** draws true elevations. Use it only when the data really is above sea level; heights above the pad placed against sea level draw the whole flight underground, where Google Earth shows nothing.
* **On the ground** drapes the geometry over the terrain.

**Draw shadow** drops a wall from the track (or plumb lines from the pins) to the ground. No preset turns it on: under a whole arcing flight it buries the flight it is meant to explain, but under a single pin it reads as a position.

#### Waypoints

Tick the pins you want: pad, liftoff, max acceleration, max velocity, apogee, drogue, main and landing. Apogee is the highest point in the data, liftoff is the first sample that passed the flight detection threshold, and the landing is only placed when the flight actually came to rest in the data (see flight detection below).

* **Show names** turns the pin labels off when the map is too busy.
* **Color pins** uses colored pushpin icons, which Google Earth loads from the network. Turn it off for a file that has to render offline; you get the viewer's default marker.
* **Color pins by flight** colors every pin with its flight's color instead of the color for its type.
* **Summary balloons** adds the clickable descriptions on the document, each flight and each pin.

#### Flight path

* **Flight path line** and **Ground track** turn the two lines on and off.
* **Keep every Nth point** thins a long track. The first and last points are always kept.
* **Launch site elevation** (in the GPS altitude unit) tells FlightPath how high the pad is above sea level. It is needed to place a height-above-ground file against sea level, and it makes the heights in a sea-level-only file correct rather than measured from the first sample.
* **One file per flight** downloads a separate file for each flight found in the data instead of one document with a folder per flight.

**Max. Horizontal Speed** (in meters per second) drops a GPS sample whose position implies a faster horizontal speed than this since the previous accepted sample. A real glitch jumps hundreds of meters in a fraction of a second, far beyond anything a rocket does, so the default of 300 catches glitches without touching a fast boost. Set it to 0 to keep every sample.

#### Colors

Each pin type has its own color. Each flight has its own path, ground track and pin colors, which come from a palette until you change them; the per-flight pickers appear after a file has been processed, and take effect when you process again. The ground track palette is chosen to contrast with the flight path above it when seen from overhead.

#### Multiple flights and trackers

If FlightPath finds more than one flight in the file, or the file carries more than one tracker, every flight becomes its own folder in one document, in its own color, with its pins named after the tracker ("Booster Apogee", "Sustainer Landing"). Tick **One file per flight** for separate downloads instead.

#### Flight detection

Newer BlueRaven exports carry the device's own `Launch detection`, `Apogee detection` and `Landing detection` columns, and FlightPath uses them when they are present: the flight starts where the launch flag turns on (the sample before it is kept as the pad), the apogee pin sits on the sample where the apogee flag turns on, and the flight ends where the landing flag turns on. A file that ends without the landing flag has no landing.

Older exports and iFIP logs do not mark the start or end of a flight, so FlightPath finds them from vertical velocity:

* A flight begins at the first sample whose vertical velocity is beyond 10 (in the file's velocity unit). The sample before it is kept as the pad.
* Samples at rest (vertical velocity between -1 and 1) are held rather than dropped. If the flight carries on they are kept, which is what keeps the apogee sample, where vertical velocity passes through zero.
* After more than five consecutive samples at rest the flight has ended, and the first of them is the landing.
* A file that simply stops mid flight (lost signal, dead battery, truncated download) gets no landing pin and no landing line in the balloon.

Samples without a GPS fix (latitude and longitude both exactly zero) are dropped. A single zero is a real coordinate and is kept.

If you have troubles with the detection, then manually determine what is a flight and copy-n-paste that section, with headers, into the "CSV GPS Flight Data" box.

#### Troubleshooting

* **The flight is missing in Google Earth, or drawn underground.** The file reports heights above the ground and was placed against sea level. Set the track and pin altitude to **Above ground**, or enter the launch site elevation.
* **No flights were detected.** Vertical velocity never exceeded the threshold, or the units are wrong for the file. Check the GPS units and, if needed, paste just the flight's rows.
* **The track stops short of the landing.** The file ended before the rocket came to rest, so there is no landing. The path still ends at the last sample.
* **Pins are the wrong color.** Colored pins need the network to load the white pushpin icon. Offline, turn **Color pins** off.
