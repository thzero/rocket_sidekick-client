import AppConstants from '@/constants';

import checklistsService from '@/service/checklists';
import countriesService from '@/service/countries';
import downloadService from '@/service.app/download';
import featuresService from '@/service.app/features';
import launchesService from '@/service/launches';
import locationsService from '@/service/locations';
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
import flightPathProcessorFilterToolsService from '@/service.app/tools/flightPath/processors/filter/simple';
import flightPathProcessorToolsService from '@/service.app/tools/flightPath/index';
import flightPathProcessorFeatherweightToolsServiceBR from '@/service.app/tools/flightPath/processors/br/featherweight';
import flightPathProcessorFeatherweightToolsServicIFIP from '@/service.app/tools/flightPath/processors/ifip/featherweight';
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
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR_FILTER, new flightPathProcessorFilterToolsService());
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT_BR, new flightPathProcessorFeatherweightToolsServiceBR());
		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT_IFIP, new flightPathProcessorFeatherweightToolsServicIFIP());

		this._injectService(AppConstants.InjectorKeys.SERVICE_TOOLS_FOAM, new foamToolsService());
	}

	_initializeChecklists() {
		return new checklistsService();
	}

	_initializeCommunicationRest() {
		return new restCommunicationService();
	}

	_initializeCountries() {
		return new countriesService();
	}

	_initializeFeatures() {
		return new featuresService();
	}

	_initializeLaunches() {
		return new launchesService();
	}

	_initializeLocations() {
		return new locationsService();
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
