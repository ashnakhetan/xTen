/* Plugin to chat with ChatGPT */
import OpenAIPlugin from "../../core/OpenAIPlugin";
// Ask me anything chatbot, feed the entire scraped webpage to the AI, and it will answer your questions

export class chatBotPlugin {
    constructor(apiKey, conversationContext, history, maxHistory, maxMessageLength, personality) {
        this.openAIPlugin = new OpenAIPlugin(apiKey);
        // Start conversation history
        
        if (history === undefined) {
            this.history = [];
        }
        else {
            if (Array.isArray(history)) {
                this.history = history;
                // feed the history to the AI
            }
            else {
                error = "History must be an array";
                console.error(error);
                throw error;
            }
        }

        // Initialize conversation context
        if (conversationContext === undefined) {
            this.context = "This is a conversation between a user and a chatbot.";
        }
        else {
            if(typeof conversationContext === 'string') {
                this.context = conversationContext;
            }
            else {
                error = "Conversation context must be a string";
                console.error(error);
                throw error;
            }
        }

        // Initialize personality
        if (personality === undefined) {
            this.personality = "Friendly, helpful, and kind.";
        }
        else {
            if(typeof personality === 'string') {
                this.personality = personality;
            }
            else {
                error = "Personality must be a string";
                console.error(error);
                throw error;
            }
        }

        // Initialize max history
        if (maxHistory === undefined) {
            this.maxHistory = 1000;
        }
        else {
            if(typeof maxHistory === 'number') {
                this.maxHistory = maxHistory;
            }
            else {
                error = "Max history must be a number";
                console.error(error);
                throw error;
            }
        }

        // Initialize max message length
        if (maxMessageLength === undefined) {
            this.maxMessageLength = 256;
        }
        else {
            if(typeof maxMessageLength === 'number') {
                this.maxMessageLength = maxMessageLength;
            }
            else {
                error = "Max message length must be a number";
                console.error(error);
                throw error;
            }
        }
    };

    async askQuestion(userQuestion) {
        try {
            userRole = "User";
            // add the question to the history
            this.addMessageToHistory(userRole , userQuestion + " \n");
            const response = await this.openAIPlugin.chat(this.history);     
        }
        catch (error) {
            console.error(`Error asking question: ${error}`);
        }
        // add the response to the history
        botRole = response.choices[0].role;
        botMessage = response.choices[0].message.content;
        this.addMessageToHistory(botRole, botMessage);
        // return the response's body from the AI
        return botMessage;
    }

    async initializeSession() {
        // Send the context to the AI to initialize the session as a system message
        systemRole = "System";
        systemMessage = this.context + " The chatbot is " + this.personality + " The conversation goes as follows: "
        try {
            // add the context to the history
            this.addMessageToHistory(systemRole, systemMessage);
            const sessionMessage = await this.openAIPlugin.chat(this.history);
        }
        catch (error) {
            console.error(`Error initializing chat session: ${error}`);
        }
        // Process the response
        botRole = sessionMessage.choices[0].role;
        botMessage = sessionMessage.choices[0].message.content;
        // add the message to the history
        this.addMessageToHistory(botRole, botMessage);
        // return the response's body from the AI
        return botMessage;
    }

    addMessageToHistory(role, message) {
        // TODO: if the chat is over a certain size, use chatgpt to summarize it and add it to the history
        this.history.push(`${role}: ${message}`);
    }

    async refreshContext() {
        // TODO: if number of messages in history is greater than maxHistory, use chatgpt to summarize it and add it to the context
    }

    async processMessage(message) {
        // TODO: if the message length is greater than maxMessageLength, use chatgpt to summarize it and add it to the history
    }
}
