The <a target="_blank" href="https://www.featherweightaltimeters.com/featherweight-gps-tracker.html">Featherweight GPS tracker</a> can provide tracking data from either the ground station or the tracker itself. FlightPath reads both kinds of iFIP export, and tells them apart by the first column header: `TRACKER` for a ground station log, `UTCTIME` for a tracker log. The tracker log is recommended, as it has been found to be more reliable.

To download the data from the device:

* Open the iFIP app on your iOS device.
* Navigate to the Devices screen.
* Select the tracker that you used during the flight.
* At the bottom of the screen there is a list of dates. Each date is a set of flight data; tap the flight date to download it as a CSV file.

Then:

* Drag and drop the CSV file onto the drop zone. FlightPath pulls the data in and checks the headers.
* Set the title, flight date and flight location.
* Choose the output format and any placement, waypoint and path options.
* Click **Process**, then **Export**.

The two logs report altitude differently, and the tool handles each:

* A **tracker log** reports altitude above sea level only. Heights above the pad are measured from the first sample of the flight, so the **Automatic** altitude reference places the flight against sea level. Entering the **Launch site elevation** makes the heights above the pad exact.
* A **ground station log** reports altitude above the ground only. **Automatic** places the flight above the ground, and the balloons show no sea level height unless you enter the **Launch site elevation**, which then allows placing the flight against sea level.

A ground station log can carry several trackers. Each tracker becomes its own flight in the output, with its own color and folder, and its pins are named after the tracker. Tick **One file per flight** for separate downloads instead.
