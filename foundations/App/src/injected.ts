/**
 * This is an injectable script
 * It is added to the "web_accessible_resources"
 * field in manifest.json and can be injected by
 * the content script.
 *
 * It is useful for modifying the DOM of different
 * tabs easily
 */

// console.log("Injected script");

// export {};

export const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
    const queryInfo = {active: true, lastFocusedWindow: true};

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        console.log(tabs[0]);
        callback(tabs[0].url);
    });
}

export const getCurrentTabUId = (callback: (uid: number | undefined) => void): void => {
    const queryInfo = {active: true, lastFocusedWindow: true};

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        // console.log(tabs);
        console.log(tabs[0].id);
        callback(tabs[0].id);
    });
}