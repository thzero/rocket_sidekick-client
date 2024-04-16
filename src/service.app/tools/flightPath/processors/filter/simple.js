import FlightPathProcessorFilterService from '@/service.app/tools/flightPath/processors/filter/index';

class DistanceFlightPathProcessorFilterService extends FlightPathProcessorFilterService {
	constructor() {
		super();

		this.results.maxDistnace = null;

		this._max = 10;
		this._previous = null;
	}
	
	initialize() {
		super.initialize();

		this.results.maxDistnace = 0;

		this._previous = null;
	}

	filter(data) {
		try {
			if (!this._previous)
				return { ignore: false, distance: 0 };

			// console.log();
			// console.log(this._previous);
			// console.log(data);
			const distance = this._getDistanceFromLatLon(data.latitude, data.longitude, this._previous.latitude, this._previous.longitude);
			if (distance > this.results.maxDistnace)
				this.results.maxDistnace = distance;
			// console.log(distance);
			const delta = (distance > this._max);
			if (delta)
				this.results.count++;
			// console.log(distance - this._max);
			// console.log(delta);
			return { ignore: delta, distance: distance };
		}
		finally {
			this._previous = data;
		}
	}

	// _getDistanceFromLatLon(lat1,lon1,lat2,lon2) {
	// 	const R = 6371000; // Radius of the earth in m
	// 	const dLat = this._deg2rad(lat2-lat1);
	// 	const dLon = this._deg2rad(lon2-lon1); 
	// 	const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	// 		Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * 
	// 		Math.sin(dLon/2) * Math.sin(dLon/2); 
	// 	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	// 	const d = R * c; // Distance in km
	// 	return d;
	//   }
	_getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
		const r = 6371000; // m
		const p = Math.PI / 180;

		const a = 0.5 - 
			Math.cos((lat2 - lat1) * p) / 2 + 
			Math.cos(lat1 * p) * Math.cos(lat2 * p) *
			(1 - Math.cos((lon2 - lon1) * p)) / 
			2;

		return 2 * r * Math.asin(Math.sqrt(a));
	}
	  
	_deg2rad(deg) {
		return deg * (Math.PI/180)
	}
}

export default DistanceFlightPathProcessorFilterService;
