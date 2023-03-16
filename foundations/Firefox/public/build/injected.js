(()=>{console.log("Injected script");var n=o=>{let r={active:!0,lastFocusedWindow:!0};chrome.tabs&&chrome.tabs.query(r,e=>{console.log(e[0]),o(e[0].url)})};})();
