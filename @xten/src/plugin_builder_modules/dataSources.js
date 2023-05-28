import {collectBrowsingHistoryWeek} from '../utils/colllect_browsing_history.js'
import { scrapePage } from '../utils/scrapePage.js';

export const dataSources = [
    {
        id: 'dataSource1',
        name: 'Browser History',
        type: 'dataSource',
        description: 'Retreives your browser history.',
        // This is the function that will be called when the user clicks on the dataSource
        execute: async function () {
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
    {
        id: 'dataSource2',
        name: 'Scraped Data',
        type: 'dataSource',
        description: 'Uses information that the user scrapes from the page.',
        // This is the function that will be called when the user clicks on the dataSource
        execute: async function () {
            console.log('dataSource2 was clicked');
            /* Add a wrapper to retreive this as text*/
            chrome.tabs.query({}, function(tabs) {
                // tabs is an array of Tab objects representing the current open tabs
                tabs.forEach(function(tab) {
                  console.log(tab.title, tab.url);
                });
              });
            const history = await scrapePage();
            const urls = [];
            for (let i = 0; i < history.length; i++) {
                urls.push(history[i].url);
            }
            return urls;
        }
    }
    // More dataSources
];