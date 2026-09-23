The <a target="_blank" href="https://www.featherweightaltimeters.com/featherweight-gps-tracker.html">Featherweight GPS tracker</a> can provide tracking data from either the ground station or the tracker itself. With the BlueRaven application, FlightPath uses the log exported from the tracker, as it has been found to be more reliable.

To download the data from the device:

* Open the BlueRaven app on your device.
* Navigate to the Devices screen.
* Select the tracker that you used during the flight.
* At the bottom of the screen there is a list of dates. Each date is a set of flight data; tap the flight date to download it as a CSV file.

The file is named like `Log_MM-DD-YYYY_HH_MM.csv`.

* Drag and drop the CSV file onto the drop zone. FlightPath pulls the data in and checks the headers.
* Set the title, flight date and flight location.
* Choose the output format and any placement, waypoint and path options.
* Click **Process**, then **Export**.

FlightPath needs these columns, by header name: `UNIXTIME`, `ALT`, `Altitude AGL`, `LAT`, `LON`, `HORZV` and `VERTV`. It also uses `FIX` (a sample with no fix is dropped) and the `Launch detection`, `Apogee detection` and `Landing detection` flags when the export has them, which give a more reliable start, apogee and end of flight than vertical velocity alone. Any other columns are ignored.

A BlueRaven log carries both altitude above sea level (`ALT`) and above the ground (`Altitude AGL`), so the **Automatic** altitude reference places the flight against sea level and the balloons show both heights. The launch site elevation is taken from the file, so it does not need to be entered.
