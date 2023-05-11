import { collectBrowsingHistoryDay, collectBrowsingHistoryWeek, collectBrowsingHistoryMonth, collectBrowsingHistoryYear } from "../../utils/colllect_browsing_history";
import { displayLoading, displayText, hideTooltip } from "../../utils/display";
import OpenAIPlugin from "../../core/OpenAIPlugin";

/*
This plug-in recommends websites to browse based on the browsing history of the user
when a button is clicked. It collects the browsing history of the user and then
calls the urlRecommender function from @xten/src/plugins/recommender/urlRecommender.js
to get the recommended websites. It then calls the displayText function from @xten/src/utils/display
to display the recommended websites in a tooltip.
*/

export class urlRecommenderPlugin {
    constructor(apiKey) {
        this.openAIPlugin = new OpenAIPlugin(apiKey);
    }
    // TODO: change the amount of lookback time based on input from the user
    // TODO: change the number of recommended urls based on input from the user
    // TODO: change the number of used urls for the query based on input from the user plus randomize the urls used
    // TODO: change the number of returned urls based on input from the user
    async recommendUrlsMonth() {
        const history = await collectBrowsingHistoryDay();
        const urls = [];
        for (let i = 0; i < history.length; i++) {
            urls.push(history[i].url);
        }
        // display loading message in middle, upper page
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        displayLoading(x, y);

        // try getting the urls, if it fails, display an error message
        try {
            // DEBUG
            console.log("Getting recommended urls")
            // DEBUG print out the request
            console.log(`Request: ${urls}`);
            // TODO: change the number of recommended urls based on input from the user
            const recommendedUrls = await this.openAIPlugin.recommendUrls(urls, 5);
            console.log(`Recommended urls: ${recommendedUrls}`);
            // return recommended urls as an array
            hideTooltip();
            return recommendedUrls;
        }
        catch (error) {
            console.error(`Error getting recommended urls: ${error}`);
            hideTooltip();
        }
    }

}
    
   

