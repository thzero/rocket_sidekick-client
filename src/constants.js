const Constants = {
	FlightInfo: {
		Errors: {
			NonQuantum: 'nonQuantum',
			NoProcessor: 'noProcessor',
			WithoutHeaders: 'withoutHeaders'
		},
		Resolution: 1024
	},
	FlightPath: {
		Errors: {
			NonBR: 'nonBR',
			NonIFIP: 'nonIFIP',
			NoProcessor: 'noProcessor',
			WithoutHeaders: 'withoutHeaders'
		}
	},
	InjectorKeys: {
		SERVICE_DOWNLOAD: 'serviceDownload',
		SERVICE_TOOLS_FOAM: 'serviceToolsFoam',
		SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR: 'serviceToolsFlightInfoProcessor',
		SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR_EGGTIMER: 'serviceToolsFlightInfoProcessorEggtimer',
		SERVICE_TOOLS_FLIGHT_PATH_OUTPUT: 'serviceToolsFlightPathOutput',
		SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_KML: 'serviceToolsFlightPathOutputKml',
		SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_TEMPLATE: 'serviceToolsFlightPathOutputTemplate',
		SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_TEMPLATE_HANDLEBARS: 'serviceToolsFlightPathOutputTemplateHandlebars',
		SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR: 'serviceToolsFlightPathProcessor',
		SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT_IFIP: 'serviceToolsFlightPathProcessorFeatherweightIFIP',
		SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT_BR: 'serviceToolsFlightPathProcessorFeatherweightBR',
	},
	ChecklistMoveDirection: {
		down: 'down',
		left: 'left',
		in: 'in',
		out: 'out',
		up: 'up'
	}
};

export default Constants;
