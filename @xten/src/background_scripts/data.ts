// Methods to allow background scripts to fetch data from multiple browser api calls

interface tab {
    id?: number;
    url?: string;
}

interface ChangeInfo {
    url?: string;
}

/// Method to fetch the current tab
export const getCurrentTab = async () => {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            resolve(tabs[0]);
        });
    });
};

// Method to fetch the current tab's URL as a string
export const getCurrentTabUrl = async () => {
    let tab = await getCurrentTab();
    return `The current tab URL is ${tab.url}`;
};

// Method to fetch the current tab's title as a string
export const getCurrentTabTitle = async () => {
    let tab = await getCurrentTab();
    return `The title of the current tab is "${tab.title}"`;
};

// Method to fetch the user's current browsing state as a string
export const getCurrentState = async () => {
    return new Promise((resolve) => {
        chrome.idle.queryState(60, (state) => {
            let humanReadableState = (state === 'active') ? 'actively using the device' : (state === 'idle') ? 'idle' : 'locked';
            resolve(`The user is currently ${humanReadableState}`);
        });
    });
};

// Method to fetch the user's current location as a string
export const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve(`The user's current location is latitude ${position.coords.latitude} and longitude ${position.coords.longitude}`);
        }, reject);
    });
};

// Example usage:
const fetchDataForChatGPT = async () => {
    let currentTabUrl = await getCurrentTabUrl();
    let currentTabTitle = await getCurrentTabTitle();
    let currentState = await getCurrentState();
    let currentLocation = await getCurrentLocation();

    // Combine data into a single string for ChatGPT
    let combinedData = `${currentTabUrl}. ${currentTabTitle}. ${currentState}. ${currentLocation}.`;

    // Pass combinedData to ChatGPT
    console.log(combinedData);
}

fetchDataForChatGPT();
