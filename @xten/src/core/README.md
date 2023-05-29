# OpenAIPlugin

The `OpenAIPlugin` class is part of an npm package designed to assist developers in creating intelligent web extensions rapidly and efficiently. This class allows interaction with the OpenAI API to perform various tasks such as summarizing text, recommending URLs, or enabling chat conversations with the AI.

## Constructor

The constructor for `OpenAIPlugin` requires an API key for the OpenAI service.

## constructor(apiKey)

## Properties

- `apiKey`: The API key used to authenticate with the OpenAI service.
- `apiEndpoint`: The endpoint for accessing the OpenAI API's completions.
- `apiChatEndpoint`: The endpoint for accessing the OpenAI API's chat completions.
- `apiEditEndpoint`: The endpoint for making edits through the OpenAI API.
- `configuration`: Configuration object for the OpenAI API.
- `openai`: Instance of OpenAIApi.

## Methods

### `summarizeText(text)`

This method takes a text string and uses the OpenAI API to generate a summary of the text.

## async summarizeText(text)

### `getAvailableModels()`

This method fetches the list of available models from the OpenAI API.

## async getAvailableModels()


### `recommendUrls(urls, numUrls)`

Given a list of URLs, this method recommends a certain number of new websites to visit based on the input URLs.

## async recommendUrls(urls, numUrls)


### `customPrompt(userPrompt, data)`

This method allows for a custom prompt completion. It takes a user prompt and data string, and uses them to generate a response.

## async customPrompt(userPrompt, data)


### `chat(query)`

This method takes a chat query and uses it to generate a chat conversation with the AI.

## async chat(query)


## Example

let plugin = new OpenAIPlugin('<your-api-key>');
plugin.summarizeText('The quick brown fox jumps over the lazy dog.');

The above code initializes a new instance of `OpenAIPlugin` with your API key, then uses the instance to summarize a given text.

## Note

When using any of the methods in this class, handle returned promises appropriately to catch any errors that may occur during the API calls.

Ensure you have the correct OpenAI API key and that you handle and secure it appropriately.

Remember to replace <your-api-key> with your actual OpenAI API key when using the example.





