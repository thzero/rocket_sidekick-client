import FlightPathOutputService from './index';

class KmlFlightPathOutputService extends FlightPathOutputService {
	get id() {
		return 'kml';
	}

	output(correlationId, results, flightInfo, data, serviceTemplate) {
		this._enforceNotNull('KmlFlightPathOutputService', 'output', results, 'results', correlationId);
		this._enforceNotNull('KmlFlightPathOutputService', 'output', flightInfo, 'flightInfo', correlationId);
		this._enforceNotNull('KmlFlightPathOutputService', 'output', data, 'data', correlationId);
		this._enforceNotNull('KmlFlightPathOutputService', 'output', serviceTemplate, 'serviceTemplate', correlationId);

		// const temp = LibraryCommonUtility.cloneDeep(results);
		flightInfo.style.path.flight.color = this._reverseRgb(results.style.path.flight.color);
		flightInfo.style.path.ground.color = this._reverseRgb(results.style.path.ground.color);
		flightInfo.style.pin.launch.color = this._reverseRgb(results.style.pin.launch.color);
		flightInfo.style.pin.maxAltitude.color = this._reverseRgb(results.style.pin.maxAltitude.color);
		flightInfo.style.pin.maxVelocity.color = this._reverseRgb(results.style.pin.maxVelocity.color);
		flightInfo.style.pin.touchdown.color = this._reverseRgb(results.style.pin.touchdown.color);

		flightInfo.description = '';
		if (results.date || results.location) {
			const temp2 = [];
			if (results.date)
				temp2.push(results.date.toLocaleString());
			if (results.location) {
				temp2.push('@');
				temp2.push(results.location);
			}
			flightInfo.description = `<description><![CDATA[${temp2.join(' ')}]]></description>`;
		}

		flightInfo.titleFull = results.title;
		if (String.isNullOrEmpty(results.title))
			flightInfo.titleFull = '';
		if (!String.isNullOrEmpty(results.titleFull))
			flightInfo.titleFull += ' ';
		flightInfo.titleFull += results.translations.flightPath;

		flightInfo.pins = '';
		if (results.style.pin.launch.selected && flightInfo.launchCoords)
			flightInfo.pins += serviceTemplate.templatePinLaunch(correlationId, flightInfo);
		// if (temp.maxAccelerationCoords)
		// 	flightInfo.pins += serviceTemplate.templatePinsMaxAcceleration(correlationId, flightInfo);
		if (results.style.pin.maxAltitude.selected && flightInfo.maxAltitudeCoords)
			flightInfo.pins += serviceTemplate.templatePinsMaxAltitude(correlationId, flightInfo);
		if (results.style.pin.maxVelocity.selected && flightInfo.maxVelocityCoords)
			flightInfo.pins += serviceTemplate.templatePinsMaxVelocity(correlationId, flightInfo);
		// if (temp.recoveryDrogueCoords)
		// 	flightInfo.pins += serviceTemplate.templatePinsRecoveryDrogue(correlationId, flightInfo);
		// if (temp.recoveryMainCoords)
		// 	flightInfo.pins += serviceTemplate.templatePinsRecoveryMain(correlationId, flightInfo);
		if (results.style.pin.touchdown.selected && flightInfo.touchdownCoords)
			flightInfo.pins += serviceTemplate.templatePinTouchdown(correlationId, flightInfo);
		if (this._templatePinsAdditional)
			flightInfo.pins += serviceTemplate.templatePinsAdditional(correlationId, flightInfo);

		return this._successResponse(serviceTemplate.templateMain(correlationId, flightInfo), correlationId);
	}
}

export default KmlFlightPathOutputService;
