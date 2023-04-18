/**
 * This is an injectable script
 * It is added to the "web_accessible_resources"
 * field in manifest.json and can be injected by
 * the content script.
 *
 * It is useful for modifying the DOM of different
 * tabs easily
 */
import browser, { Cookies } from "webextension-polyfill";

console.log("Injected script");

export const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
    function getCurrentWindowTabs() {
        return browser.tabs.query({ currentWindow: true });
    }

    function listTabs() {
    getCurrentWindowTabs().then((tabs) => {

        for (const tab of tabs) {
            if (tab.active) {
                console.log(tab.url);
                callback(tab.url);
            }
        }
    })}

    listTabs();
}
