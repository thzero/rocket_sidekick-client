const Constants = {
	DateTime: {
		DEFAULT_DATE_FORMAT: 'MM/DD/YYYY',
		DEFAULT_TIME_FORMAT: 'HH:mm'
	},
	External: {
		github: 'https://github.com/thzero/rocket_sidekick-client',
		imnages: 'https://imagesrocketsidekick.thzero.com',
		store: {
			android: null,
			ios: null,
		},
		thrustCurve: 'https://thrustcurve.org',
		imnages: 'https://imagesrocketsidekick.thzero.com'
	},
	ExternalKeys: {
		MotorSearch: 'motorSearch'
	},
	ExtractTypes: {
		Csv: 'csv',
		Text: 'text'
	},
	Features: {
		Auth: false,
		MobileApp: false,
		Rockets: true,
		Favorites: true,
		RememberMe: false,
		Statistics: false,
		Yours: {
			value: false,
			Altimeters: false,
			Checklists: false,
			Launches: false,
			Parachutes: false,
			Rockets: false
		}
	},
	FlightInfo: {
		Resolution: 1024
	},
	InjectorKeys: {
		SERVICE_API: 'serviceApi',
		SERVICE_DOWNLOAD: 'serviceDownload',
		SERVICE_EXTERNAL_MOTOR_SEARCH: 'serviceExternalMotorSearch',
		SERVICE_ROCKETS: 'serviceRockets',
		SERVICE_TOOLS_CALCULATION_ENGINE: 'serviceToolsCalculationEngine',
		SERVICE_TOOLS_FOAM: 'serviceToolsFoam',
		SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR: 'serviceToolsFlightInfoProcessor',
		SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR_EGGTIMER: 'serviceToolsFlightInfoProcessorEggtimer',
		SERVICE_TOOLS_FLIGHT_PATH_OUTPUT: 'serviceToolsFlightPathOutput',
		SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_KML: 'serviceToolsFlightPathOutputKml',
		SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_TEMPLATE: 'serviceToolsFlightPathOutputTemplate',
		SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_TEMPLATE_HANDLEBARS: 'serviceToolsFlightPathOutputTemplateHandlebars',
		SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR: 'serviceToolsFlightPathProcessor',
		SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT: 'serviceToolsFlightPathProcessorFeatherweight',
		SERVICE_TOOLS_PARACHUTE_SIZING: 'serviceToolsParachuteSizing',
		SERVICE_TOOLS_THRUST2WEIGHT: 'serviceToolsThrust2Weight',
		SERVICE_TOOLS_WEATHERCOCKING: 'serviceToolsWeathercocking'
	},
	MeasurementUnits: {
		acceleration: {
			id: 'acceleration'
		},
		area: {
			id: 'area'
		},
		density: {
			id: 'density'
		},
		distance: {
			id: 'distance'
		},
		fluid: {
			id: 'fluid'
		},
		length: {
			id: 'length'
		},
		velocity: {
			id: 'velocity'
		},
		volume: {
			id: 'volume'
		},
		weight: {
			id: 'weight'
		},
		english: {
			id: 'english',
			acceleration: {
				default: 'fts2',
				fts2: 'ft/s^2'
			},
			area: {
				default: 'in2',
				in2: 'in^2',
				ft2: 'ft^2'
			},
			density: {
				default: 'lbmft3',
				lbmft3: 'lbm/ft3'	
			},
			distance: {
				default: 'ft',
				ft: 'ft',
				mi: 'mi'
			},
			fluid: {
				default: 'floz',
				floz: 'floz'
			},
			length: {
				default: 'in',
				in: 'in',
				ft: 'ft'
			},
			velocity: {
				default: 'fts',
				fts: 'ft/s',
				mph: 'mile/h'
			},
			volume: {
				default: 'in3',
				in3: 'in^3',
				ft3: 'ft^3'
			},
			weight: {
				default: 'oz',
				oz: 'oz',
				lb: 'lb'
			}
		},
		metrics: {
			id: 'metrics',
			acceleration: {
				default: 'ms2',
				ms2: 'm/s^2'
			},
			area: {
				default: 'mm2',
				cm2: 'cm^2',
				m2: 'm^2',
				mm2: 'mm^2'
			},
			density: {
				default: 'kgm3',
				kgm3: 'kg/m^3'
			},
			distance: {
				default: 'm',
				m: 'm',
				km: 'km'
			},
			fluid: {
				default: 'ml',
				ml: 'ml',
				l: 'l'
			},
			length: {
				default: 'mm',
				mm: 'mm',
				cm: 'cm',
				m: 'm'
			},
			velocity: {
				default: 'ms',
				ms: 'm/s',
				kph: 'km/h'
			},
			volume: {
				default: 'mm3',
				cm3: 'cm^3',
				m3: 'm^3',
				mm3: 'mm^3'
			},
			weight: {
				default: 'g',
				g: 'g',
				kg: 'kg'
			}
		},
		types: {
			acceleration: 'acceleration',
			area: 'area',
			fluid: 'fluid',
			density: 'density',
			distance: 'distance',
			length: 'length',
			velocity: 'velocity',
			volume: 'volume',
			weight: 'weight'
		}
	},
	RocketTypes: {
		Site: 'site',
		Yours: 'yours'
	}
};

export default Constants;
