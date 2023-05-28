export const dataMethods = [
    {
        id: 'dataMethod1',
        name: 'Manual',
        type: 'dataMethod',
        description: 'Input your data manually.',
        // This is the function that will be called when the user clicks on the dataSource
        execute: async function (types=[]) {
            console.log('dataMethod1 was clicked');
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
        id: 'dataMethod2',
        name: 'Scraping',
        type: 'dataMethod',
        description: 'Collect specific information from the page.',
        // This is the function that will be called when the user clicks on the dataSource
        execute: async function (types=[]) {
            console.log('dataMethod2 was clicked');
            /* Add a wrapper to retreive this as text*/
            chrome.tabs.query({}, function(tabs) {
                // tabs is an array of Tab objects representing the current open tabs
                tabs.forEach(function(tab) {
                  console.log(tab.title, tab.url);
                });
            });
            const history = await scrapePage();
        }
    }
    // More dataSources
];