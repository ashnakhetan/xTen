/**
 * This is an injectable script
 * It is added to the "web_accessible_resources"
 * field in manifest.json and can be injected by
 * the content script.
 *
 * It is useful for modifying the DOM of different
 * tabs easily
 */
// var browser = require("webextension-polyfill");
import browser, { Cookies } from "webextension-polyfill";
// browser.tabs.executeScript({file: "browser-polyfill.js"});

console.log("Injected script");

export const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
    // function logTabs(tabs) {
    //     // tabs[0].url requires the `tabs` permission or a matching host permission.
    //     console.log(tabs[0].url);
    //   }
      
    //   function onError(error) {
    //     console.error(`Error: ${error}`);
    //   }
      
    //   browser.tabs
    //     .query({ currentWindow: true, active: true })
    //     .then(logTabs, onError);
    function getCurrentWindowTabs() {
        return browser.tabs.query({ currentWindow: true });
    }

    function listTabs() {
    getCurrentWindowTabs().then((tabs) => {
    //    const tabsList = document.getElementById('tabs-list');
        // const currentTabs = document.createDocumentFragment();
        // const limit = 5;
        // let counter = 0;
    
    //    tabsList.textContent = '';

        for (const tab of tabs) {
            if (tab.active) {
                // && counter <= limit
        //   const tabLink = document.createElement("a");
        
        //   tabLink.textContent = tab.title || tab.id;
                console.log(tab.url);
                callback(tab.url);
        
        //   tabLink.setAttribute("href", tab.id);
        //   tabLink.classList.add("switch-tabs");
        //   currentTabs.appendChild(tabLink);
            }
        
        // counter += 1;
        }
    })}

    listTabs();
    // function logTabs(tabs) {
    //     // tabs[0].url requires the `tabs` permission or a matching host permission.
    //     console.log(tabs[0].url);
    //     callback(tabs[0].url);
    // }
    // const queryInfo = {active: true, lastFocusedWindow: true};
    // browser.tabs && browser.tabs.query({ currentWindow: true, active: true }).then() tabs => {
    //     console.log(tabs[0]);
    //     callback(tabs[0].url);
    // })
    // browser.tabs.query({ currentWindow: true, active: true }).then(logTabs(tabs), onError);
    
    // const queryInfo = {active: true, lastFocusedWindow: true};
    // chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
    //     console.log(tabs[0]);
    //     callback(tabs[0].url);
    // });
    // browser.storage.local.get("urls").then(({urls}) => {
    //     return browser.tabs.query({url: urls});
    //   }).then(tabs => {
    //     console.log(tabs[0]);
    //     callback(tabs[0].url);
    //     return Promise.all(
    //       Array.from(tabs, tab => browser.tabs.reload(tab.id))
    //     );
    //   })
    // //   .then(() => {
    // //     return browser.notifications.create({
    // //       type: "basic",
    // //       iconUrl: "icon.png",
    // //       title: "Tabs reloaded",
    // //       message: "Your tabs have been reloaded",
    // //     });
    // //   })
    //   .catch(error => {
    //     console.error(`An error occurred while reloading tabs: ${error.message}`);
    //   });
}
