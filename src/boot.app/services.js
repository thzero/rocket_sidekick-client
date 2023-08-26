import AppConstants from '@/constants';

import checklistsService from '@/service/checklists';
import downloadService from '@/service.app/download';
import featuresService from '@/service.app/features';
import manufacturersService from '@/service/manufacturers';
import partsService from '@/service/parts';
import rocketsService from '@/service/rockets';
import rocketSetupsService from '@/service/rocketSetups';
import flightInfoProcessorToolsService from '@/service.app/tools/flightInfo/index';
import flightInfoProcessorEggtimerToolsService from '@/service.app/tools/flightInfo/processors/eggtimer';
import flightPathOutputToolsService from '@/service.app/tools/flightPath/output/index';
import flightPathOutputKmlToolsService from '@/service.app/tools/flightPath/output/kml';
import flightPathOutputTemplateToolsService from '@/service.app/tools/flightPath/output/template/index';
import flightPathOutputTemplateHandlebarsToolsService from '@/service.app/tools/flightPath/output/template/handlebars';
import flightPathProcessorToolsService from '@/service.app/tools/flightPath/index';
import flightPathProcessorFeatherweightToolsService from '@/service.app/tools/flightPath/processors/featherweight';
import foamToolsService from '@/service.app/tools/foam';
import restCommunicationService from '@thzero/library_client_service_rest_fetch';
import utilityService from '@/service.app/utility';

import BaseServiceBoot from '@/boot/services';

class AppServiceBoot extends BaseServiceBoot {
	_initialize() {
		super._initialize();

		this._injectService(AppConstants.InjectorKeys.SERVICE_DOWNLOAD, new downloadService());

		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR, new flightInfoProcessorToolsService());
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR_EGGTIMER, new flightInfoProcessorEggtimerToolsService());
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_OUTPUT, new flightPathOutputToolsService());
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_KML, new flightPathOutputKmlToolsService());
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_TEMPLATE, new flightPathOutputTemplateToolsService());
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_TEMPLATE_HANDLEBARS, new flightPathOutputTemplateHandlebarsToolsService());
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR, new flightPathProcessorToolsService());
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT, new flightPathProcessorFeatherweightToolsService());

		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FOAM, new foamToolsService());
	}

	_initializeChecklists() {
		return new checklistsService();
	}

	_initializeCommunicationRest() {
		return new restCommunicationService();
	}

	_initializeFeatures() {
		return new featuresService();
	}

	_initializeManufacturers() {
		return new manufacturersService();
	}

	_initializeParts() {
		return new partsService();
	}

	_initializeRockets() {
		return new rocketsService();
	}

	_initializeRocketSetups() {
		return new rocketSetupsService();
	}

	_initializeUtility() {
		return new utilityService();
	}
}

export default AppServiceBoot;
