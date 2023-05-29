import {collectBrowsingHistoryWeek} from '../utils/colllect_browsing_history.js'

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
    }
    // More dataSources
];