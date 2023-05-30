export {}

import {SummarizerPlugin } from '../../@xten/src/plugins/summarizer/summarizerPlugin';


const apiKey = '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';
const summarizerPlugin = new SummarizerPlugin(apiKey, true);

// Attach the imported plugin to the page
summarizerPlugin.attach();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command == "attach") {
        // Code for attaching event listener or functionality goes here
        summarizerPlugin.attach();
    } else if (request.command == "detach") {
        // Code for detaching event listener or functionality goes here
        summarizerPlugin.detach();
    }
});
