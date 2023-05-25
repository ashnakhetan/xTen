/* Plugin to chat with ChatGPT */
import OpenAIPlugin from "../../core/OpenAIPlugin";
// Ask me anything chatbot, feed the entire scraped webpage to the AI, and it will answer your questions

export class chatBotPlugin {
    constructor(apiKey, conversationContext, history, maxHistory, maxMessageLength, personality) {
        this.openAIPlugin = new OpenAIPlugin(apiKey);
        // Start conversation history
        
        if (Array.isArray(history)) {
            this.history = history.map(msg => typeof msg === 'string' ? { role: 'user', content: msg } : msg);
        } else {
            throw new Error("History must be an array");
        }

        this.context = typeof conversationContext === 'string' ? conversationContext : "This is a conversation between a user and a chatbot.";
        this.personality = typeof personality === 'string' ? personality : "Friendly, helpful, and kind.";
        this.maxHistory = typeof maxHistory === 'number' ? maxHistory : 1000;
        this.maxMessageLength = typeof maxMessageLength === 'number' ? maxMessageLength : 256;
  
    };

    async askQuestion(userQuestion) {
        try {
            let userRole = "user";
            this.addMessageToHistory(userRole , userQuestion);
            // Ask the question
            const response = await this.openAIPlugin.chat(this.history);   
            // Process the response
            let botRole = response.choices[0].role;
            let botMessage = response.choices[0].message.content;
            this.addMessageToHistory(botRole, botMessage);
            // return the response's body
            return botMessage;  
        }
        catch (error) {
            console.error(`Error asking question: ${error}`);
        }
    }

    async initializeSession() {
        let systemRole = "system";
        let systemMessage = `${this.context} The chatbot is ${this.personality}. The conversation goes as follows: `;
        try {
            // Initialize the chat session
            this.addMessageToHistory(systemRole, systemMessage);
            const sessionMessage = await this.openAIPlugin.chat(this.history);
            // Process the response
            let botRole = sessionMessage.choices[0].role;
            let botMessage = sessionMessage.choices[0].message.content;
            this.addMessageToHistory(botRole, botMessage);
            // return the response's body
            return botMessage;
        }
        catch (error) {
            console.error(`Error initializing chat session: ${error}`);
        }
    }

    addMessageToHistory(role, message) {
        // TODO: if the chat is over a certain size, use chatgpt to summarize it and add it to the history
        this.history.push({ role: role, content: message });
    }

    async refreshContext() {
        // TODO: if number of messages in history is greater than maxHistory, use chatgpt to summarize it and add it to the context
    }

    async processMessage(message) {
        // TODO: if the message length is greater than maxMessageLength, use chatgpt to summarize it and add it to the history
    }
}
