import { time } from "console";
import { ChatBotPlugin } from "~../@xten/src/plugins/chatbot/chatbotPlugin";

let interval;
let sessionActive = false;
let currentTrackedSites = [];
let timeSpentInSeconds = 0;
let popupOpen = false;
let displayingQuote = false;
let quoteLimit = 15


const apiKey = "INSERT API KEY HERE";

// Chatbot PLugin
const chatbot = new ChatBotPlugin(apiKey);



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.command) {
        case "start_tracking":
            chatbot.setHistory(request.history);
            sessionActive = true;
            chrome.storage.local.set({ 'sessionActive': sessionActive });

            currentTrackedSites = request.selectedSites;
            const checkInInterval = request.checkInInterval;
            const timeLimit = checkInInterval * 60;
            const wellnessBot = request.wellnessBot;

            startTracking(currentTrackedSites, timeLimit);
            break;

        case "stop_tracking":
            sessionActive = false;
            chrome.storage.local.set({ 'sessionActive': sessionActive });

            clearInterval(interval);
            break;

        case "popup_open":
            popupOpen = true;
            break;

        case "popup_close":
            popupOpen = false;
            break;
    }
});

const startTracking = (selectedSites, timeLimit) => {
    interval = setInterval(() => {
        // Check if a tab is active
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length > 0) {
                const tab = tabs[0];

                // Check if the current tab is in the list of sites to be tracked
                const matchingSite = selectedSites.find(site => tab.url.includes(site.url));

                // If the current tab is a site being tracked
                if (matchingSite && !displayingQuote) {
                    timeSpentInSeconds += 1;
                    console.log(timeSpentInSeconds);
                    matchingSite.timeSpent = (matchingSite.timeSpent || 0) + 1;

                    // Convert time spent in seconds to minutes
                    const timeSpentInMinutes = matchingSite.timeSpent / 60;

                    // If the time limit is exceeded
                    if (timeSpentInSeconds > timeLimit) {
                        displayingQuote = true;
                        timeSpentInSeconds = 0;
                        let message = "I'm giving you information about the user. The user has been on the following sites for this amount of time: \n";
                    
                        selectedSites.forEach(site => {
                            message += `${site.name}: ${site.timeSpent} minutes\n`;
                        });
                    
                        message += "Please check in with the user and give them an inspirational quote! Your next message will be displayed to them";
                    
                        console.log("Asking chatbot for an inspirational quote");
                        chatbot.askSystemQuestion(message).then(quote => {
                            console.log("Got quote from chatbot");
                            console.log(quote);
                            console.log("Sending message to content script with quote");
                            // Sending message to content script with quote
                            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, {
                                    command: "timesUp",
                                    quote: quote
                                });
                            });
                        });

                    }

                    if (matchingSite && popupOpen && !displayingQuote ) {
                        console.log('popup open');
                        console.log("Sending message to popup");
                        chrome.runtime.sendMessage({
                            command: 'update_sites',
                            selectedSites: selectedSites,
                            newHistory: chatbot.getHistory()
                        });
                    }

                }
            }
        });

        if(displayingQuote) {
            quoteLimit -= 1;
            console.log("Quote limit:");
            console.log(quoteLimit);
            if (quoteLimit === 0) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        command: "removeTimesUp"
                    });
                });
                displayingQuote = false;
                quoteLimit = 15;
            }
        }

    }, 1000);
};

