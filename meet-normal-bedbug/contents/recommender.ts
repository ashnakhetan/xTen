export {}

import {urlRecommenderPlugin} from '../../@xten/src/plugins/recommender/urlRecommenderPlugin';


const apiKey = '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';
const recommenderPlugin = new urlRecommenderPlugin(apiKey);

// Call a function from the imported plugin when a button is clicked
// TODO: Waiting on UI injection
