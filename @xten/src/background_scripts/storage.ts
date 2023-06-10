import { ChatBotPlugin } from '../plugins/chatbot/chatBotPlugin.js'

// Store chat, stores the chat in the local storage
// Takes in a storage method and an instance of the chatbot class
// Returns a promise that resolves when the chat is stored

export const storeLocalChat = async (chatbot) => {
    chrome.storage.local.set({chat: chatbot.getHistory()});
}
