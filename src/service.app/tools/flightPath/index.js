import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import BaseService from '@thzero/library_client/service/index';

import { BranchColors, GroundColors, PinColors } from '../palette';
import { AltitudeReferenceOrder, FlightPathExportOptions, PresetOrder, Presets, WaypointOrder, presetMatching } from './options';
import { allTemplates, findTemplate, userTemplate } from './output/templates/index';

/**
 * Orchestrates a flight path export: picks the processor for the file format, resolves the
 * template, and hands both to the processor. The panel talks to this service only.
 */
class FlightPathProcessorService extends BaseService {
	constructor() {
		super();

		this._serviceProcessors = [];
	}

	async init(injector) {
		await super.init(injector);

		const serviceFlightPathProcessorFeatherweightBR = injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT_BR);
		this.registerProcessor(serviceFlightPathProcessorFeatherweightBR);
		const serviceFlightPathProcessorFeatherweightIFIP = injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT_IFIP);
		this.registerProcessor(serviceFlightPathProcessorFeatherweightIFIP);
	}

	get altitudeReferences() {
		return AltitudeReferenceOrder;
	}

	get branchColorsDefault() {
		return BranchColors;
	}

	get groundColorsDefault() {
		return GroundColors;
	}

	get pinColorsDefault() {
		return PinColors;
	}

	get presets() {
		return PresetOrder.map(id => Presets[id]);
	}

	get serviceProcessors() {
		return this._serviceProcessors;
	}

	get waypointTypes() {
		return WaypointOrder;
	}

	check(correlationId, data, processorId) {
		this._enforceNotNull('FlightPathProcessorService', 'check', data, 'data', correlationId);

		if (String.isNullOrEmpty(processorId))
			return this._error('FlightPathProcessorService', 'check', 'No processor id', null, AppConstants.FlightPath.Errors.NoProcessor, null, correlationId);

		const processor = this._determineProcessor(correlationId, processorId);
		if (!processor)
			return this._error('FlightPathProcessorService', 'check', 'Invalid processor', null, AppConstants.FlightPath.Errors.NoProcessor, null, correlationId);

		return processor.check(correlationId, data);
	}

	/** A fresh options object; the panel's default state must match it. */
	options(correlationId, init) {
		return new FlightPathExportOptions(init);
	}

	presetMatching(correlationId, options) {
		return presetMatching(options);
	}

	process(correlationId, data, processorId, flightInfo, measurementUnits, exportOptions, templateId, userTemplates) {
		this._enforceNotNull('FlightPathProcessorService', 'process', data, 'data', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', processorId, 'processorId', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', flightInfo, 'flightInfo', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', measurementUnits, 'measurementUnits', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsId, 'measurementUnitsId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsAltitudeId, 'measurementUnitsAltitudeId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsVelocityId, 'measurementUnitsVelocityId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsOutputId, 'measurementUnitsOutputId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsAltitudeOutputId, 'measurementUnitsAltitudeOutputId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsVelocityOutputId, 'measurementUnitsVelocityOutputId', correlationId);

		const processor = this._determineProcessor(correlationId, processorId);
		if (!processor)
			return this._error('FlightPathProcessorService', 'process', 'Invalid processor', null, AppConstants.FlightPath.Errors.NoProcessor, null, correlationId);

		const template = this.template(correlationId, templateId, userTemplates);
		if (!template)
			return this._error('FlightPathProcessorService', 'process', 'Invalid template', null, AppConstants.FlightPath.Errors.NoTemplate, null, correlationId);

		const results = this._initialize(correlationId, flightInfo);
		const response = processor.process(correlationId, this, results, data, measurementUnits, exportOptions, template);
		if (this._hasFailed(response))
			return response;

		LibraryClientUtility.debug2('results.flightPath', results.flightPath);
		return this._successResponse(results, correlationId);
	}

	registerProcessor(service) {
		this._enforceNotNull('FlightPathProcessorService', 'registerProcessor', service, 'service');

		this._serviceProcessors.push(service);
	}

	/** Looks a template up by id among the built-ins and the user's stored templates. */
	template(correlationId, templateId, userTemplates) {
		return findTemplate(this.templates(correlationId, userTemplates), templateId);
	}

	templates(correlationId, userTemplates) {
		return allTemplates(userTemplates);
	}

	/** Builds a user template from a dropped file, or fails when the name does not qualify. */
	userTemplate(correlationId, fileName, source) {
		const template = userTemplate(fileName, source);
		if (!template)
			return this._error('FlightPathProcessorService', 'userTemplate', 'Invalid template file name', null, AppConstants.FlightPath.Errors.TemplateName, null, correlationId);
		return this._successResponse(template, correlationId);
	}

	_determineProcessor(correlationId, processorId) {
		this._enforceNotEmpty('FlightPathProcessorService', '_determineProcessor', processorId, 'processorId', correlationId);

		const processor = this._serviceProcessors.find(s => {
			return s.id.toLowerCase() === processorId.toLowerCase();
		});
		return processor;
	}

	_initialize(correlationId, flightInfo) {
		this._enforceNotNull('FlightPathProcessorService', '_initialize', flightInfo, 'flightInfo', correlationId);

		flightInfo.flightPath = null;
		flightInfo.flightPaths = [];
		flightInfo.flightPathsOutput = [];
		return flightInfo;
	}
}

export default FlightPathProcessorService;
