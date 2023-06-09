import {collectBrowsingHistoryWeek} from '../utils/colllect_browsing_history.js'
import { ScraperPlugin } from "../plugins/scraper/scraperPlugin";

export var dataSources = [
    {
        id: 'dataMethod1',
        name: 'Manual',
        type: 'dataMethod',
        description: 'Input your data manually.',
        manual: '',
        // This is the function that will be called when the user clicks on the dataSource
        execute: async function (types=[]) {
            console.log('dataMethod1 was clicked');
            console.log("should be", this.manual);
            return this.manual;
        }
    },
    {
        id: 'dataMethod2',
        name: 'Scraping',
        type: 'dataMethod',
        description: 'Collect specific information from the page.',
        manual:'',
        // This is the function that will be called when the user clicks on the dataSource
        execute: async function (dataType) {
            console.log('we are inside dataSources');
            console.log("dataType:", dataType);
            /* Add a wrapper to retreive this as text*/
            const scraperPlug = new ScraperPlugin()
            return scraperPlug.scrape(dataType.tags);
        }
    },
    {
        id: 'dataSource1',
        name: 'Browser History',
        type: 'dataSource',
        description: 'Retreives your browser history.',
        manual:'',
        // This is the function that will be called when the user clicks on the dataSource
        execute: async function (dataType) {
            console.log('dataSource1 was clicked');
            /* Add a wrapper to retreive this as text*/
            const history = await collectBrowsingHistoryWeek();
            const urls = [];
            for (let i = 0; i < history.length; i++) {
                urls.push(history[i].url);
            }
            return urls;
        }
    },
    // More dataSources
];