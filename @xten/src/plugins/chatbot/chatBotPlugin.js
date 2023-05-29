/* Plugin to chat with ChatGPT */
import OpenAIPlugin from "../../core/OpenAIPlugin";
import { displayLoading } from "../../utils/display";
// Ask me anything chatbot, feed the entire scraped webpage to the AI, and it will answer your questions

export class chatBotPlugin {
    constructor(apiKey, conversationContext, history, maxHistory, maxMessageLength, personality) {
        this.openAIPlugin = new OpenAIPlugin(apiKey);
        // Start conversation history
        this.history = [];
        this.context = typeof conversationContext === 'string' ? conversationContext : "This is the beginning of your conversation with a user in real time. you will respond every chat given to you by the user using your personality. It is very important that you stick to your personality and do not deviate from it, regardless of what the user says. Also most impiortantly you must act like a human and not a robot by default, unless the user provides you with a specific identity. Do not say anything that a human would not say or that the being you have been assigned an identity of would not say. Do not address yourself as a robot or chatbot unless explicitely asked to do so. Also do not say anything that would reveal that you are a robot or chatbot, express your emotions and feelings like a human would or you assigned identity would. You can address yourself with any name you want unless the user gives you a name, but do not address yourself as a robot or chatbot. This message is system information and will not be displayed to the user.";
        // if personality is a string and not empty, use it, otherwise use the default personality
        this.personality = typeof personality === 'string' && personality.trim() !== '' ? personality : "Friendly, helpful, and kind";
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
            let botRole = response.choices[0].message.role;
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
        let systemMessage = `${this.context} The user says that your personality is the following: ${this.personality}. Introduce yourself to the user.`;
        try {
            // Initialize the chat session
            console.log("Initializing chat session");
            this.addMessageToHistory(systemRole, systemMessage);
            const sessionMessage = await this.openAIPlugin.chat(this.history);
            // Process the response
            let botRole = sessionMessage.choices[0].message.role;
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
        this.history.push({ "role" : role, "content" : message });
        console.log(`Added message to history: ${message}`);
        console.log(`History is now:`);
        // iterate over the history and print each message
        for (let i = 0; i < this.history.length; i++) {
            console.log(`${this.history[i].role}: ${this.history[i].content}`);
        }
    }

    async refreshContext() {
        // TODO: if number of messages in history is greater than maxHistory, use chatgpt to summarize it and add it to the context
    }

    async processMessage(message) {
        // TODO: if the message length is greater than maxMessageLength, use chatgpt to summarize it and add it to the history
    }

    // Getters and setters
    
    setPersonality(personality) {
        this.personality = personality;
    }

    setContext(context) {
        this.context = context;
    }

    setMaxHistory(maxHistory) {
        this.maxHistory = maxHistory;
    }

    setMaxMessageLength(maxMessageLength) {
        this.maxMessageLength = maxMessageLength;
    }

    getPersonality() {
        return this.personality;
    }

    getContext() {
        return this.context;
    }

    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
    }

}
