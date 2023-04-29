// Collects the browsing history of the user, history is returned as an array of objects 

/* Need to add history persmission to manifest.json for this to work
permissions": [
    "history"
    ],
*/

// Declare time constants, day, week, month, year
const day = 86400000;
const week = 604800000;
const month = 2629800000;
const year = 31557600000;

// Collects history for the past 24 hours
export async function collectBrowsingHistoryDay() {
    const history = await browser.history.search({
        text: '',
        startTime: (new Date()).getTime() - day,
        maxResults: 1000000000
    });
    return history;
}

// Collects history for the past week
export async function collectBrowsingHistoryWeek() {
    const history = await browser.history.search({
        text: '',
        startTime: (new Date()).getTime() - week,
        maxResults: 1000000000
    });
    return history;
}

// Collects history for the past month
export async function collectBrowsingHistoryMonth() {
    const history = await browser.history.search({
        text: '',
        startTime: (new Date()).getTime() - month,
        maxResults: 1000000000
    });
    return history;
}

// Collects history for the past year
export async function collectBrowsingHistoryYear() {
    const history = await browser.history.search({
        text: '',
        startTime: (new Date()).getTime() - year,
        maxResults: 1000000000
    });
    return history;
}