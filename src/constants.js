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
			NoFlights: 'noFlights',
			NonBR: 'nonBR',
			NonIFIP: 'nonIFIP',
			NoProcessor: 'noProcessor',
			NoTemplate: 'noTemplate',
			Template: 'template',
			TemplateName: 'templateName',
			WithoutHeaders: 'withoutHeaders'
		}
	},
	InjectorKeys: {
		SERVICE_DOWNLOAD: 'serviceDownload',
		SERVICE_TOOLS_FOAM: 'serviceToolsFoam',
		SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR: 'serviceToolsFlightInfoProcessor',
		SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR_EGGTIMER: 'serviceToolsFlightInfoProcessorEggtimer',
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
