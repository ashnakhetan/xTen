import { SummarizerPlugin } from '../../@xten/src/plugins/summarizer/summarizerPlugin';

const apiKey = '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';
const summarizerPlugin = new SummarizerPlugin(apiKey, true);

let enabled = true;  // Defaults to enabled

console.log("Page content script is running"); 

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
// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('message received');

    switch (request.command) {
        case "attach":
            enabled = true;
            summarizerPlugin.attach();
            chrome.storage.local.set({ 'smartSummarizer': enabled });
            break;

        case "detach":
            enabled = false;
            summarizerPlugin.detach();
            chrome.storage.local.set({ 'smartSummarizer': enabled });
            break;

        case "timesUp":
            console.log("Displaying times up message");
            displayTimesUpMessage(request.quote);
            break;

        case "removeTimesUp":
            console.log("Removing times up message");
            removeTimesUpMessage();
            break;
    }
});


const displayTimesUpMessage = (quote) => {
    const timesUpDiv = document.createElement('div');
    
    // Assign ID
    timesUpDiv.id = 'timesUpDiv';

    // Assign styles
    Object.assign(timesUpDiv.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: '10000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '2em'
    });
    
    // Set inner HTML
    timesUpDiv.innerHTML = `
        <p>Time's Up</p>
        <p>${quote}</p>
    `;

    // Append to body
    document.body.appendChild(timesUpDiv);
};


const removeTimesUpMessage = () => {
    const timesUpDiv = document.getElementById("timesUpDiv");
    if (timesUpDiv) {
        timesUpDiv.remove();
    }
};


