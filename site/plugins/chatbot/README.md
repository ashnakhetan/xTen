# ChatBotPlugin

The `ChatBotPlugin` is a class that interacts with the OpenAI API to create a chatbot. This chatbot can be asked questions and it responds based on a defined personality and context. 

## Constructor

The constructor takes several parameters:

- `apiKey`: The API key for the OpenAI service.
- `conversationContext`: Initial context for the chat session.
- `history`: Initial conversation history.
- `maxHistory`: Maximum number of messages to store in the chat history.
- `maxMessageLength`: Maximum length of a chat message.
- `personality`: Personality for the chatbot.

If some of these parameters are not provided, the constructor will set default values.

## Methods

### askQuestion(userQuestion)

Takes a user's question as an argument and adds it to the conversation history. It then asks the question to the OpenAI API and adds the chatbot's response to the history.

### initializeSession()

Initializes the chat session by sending a system message to the OpenAI API with the conversation context and personality.

### addMessageToHistory(role, message)

Adds a message to the conversation history. The role and message are parameters that need to be passed to this method.

### refreshContext()

This method should be used to update the context when the conversation history becomes too large.

### processMessage(message)

Processes a message and if its length is greater than the defined maximum, it is summarized before being added to the history.

### setPersonality(personality), setContext(context), setMaxHistory(maxHistory), setMaxMessageLength(maxMessageLength)

Setter methods for setting the personality, context, maximum history, and maximum message length.

### getPersonality(), getContext(), getHistory()

Getter methods for getting the current personality, context, and conversation history.

### clearHistory()

Clears the conversation history.

## Usage

```javascript
const chatBotPlugin = new chatBotPlugin(apiKey, conversationContext, history, maxHistory, maxMessageLength, personality);
chatBotPlugin.askQuestion("What's the weather today?");
```

This will initialize a new instance of ChatBotPlugin and ask it a question. Be sure to replace the constructor parameters with your actual value
