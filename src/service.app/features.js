import FeaturesService from '@/service/features';

class WebFeatureService extends FeaturesService {
	_featuresOverride(features) {
		features.Yours.value = true;
		features.Yours.Checklists = true;
	}
}

export default WebFeatureService;
