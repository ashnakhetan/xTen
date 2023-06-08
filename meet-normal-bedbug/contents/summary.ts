import { SummarizerPlugin } from '../../@xten/src/plugins/summarizer/summarizerPlugin';

const apiKey = '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';
const summarizerPlugin = new SummarizerPlugin(apiKey, true);

let enabled = true;  // Defaults to enabled

console.log("Background script is running"); // Add this line to your script

// Initially fetch the state from the storage
chrome.storage.local.get(['smartSummarizer'], function(result) {
    console.log('Value currently is ' + result.smartSummarizer);
  enabled = !!result.smartSummarizer;
  console.log("Enabled: " + enabled);
    if (enabled) {
        summarizerPlugin.attach();
        }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command == "attach") {
    enabled = true;
    summarizerPlugin.attach();
  } else if (request.command == "detach") {
    enabled = false;
    summarizerPlugin.detach();
  }
  
  // Update the state in the storage
  chrome.storage.local.set({ 'smartSummarizer': enabled });
});