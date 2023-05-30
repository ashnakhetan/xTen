# SummarizerPlugin

The `SummarizerPlugin` is a class that interacts with the OpenAI API to provide a summary of any selected text on a webpage.

## Constructor

The constructor for `SummarizerPlugin` requires an API key for the OpenAI service.

```javascript
constructor(apiKey)
```

## Methods

### attach()

This method attaches an event listener to the document that listens for `mouseup` events. When such an event is detected, it checks if any text is selected. If there is, it calls the OpenAI API to generate a summary of the selected text, and then displays that summary in a tooltip near the selected text.

## Usage

```javascript
const summarizerPlugin = new SummarizerPlugin(apiKey);
summarizerPlugin.attach();
```

This will initialize a new instance of `SummarizerPlugin` and attach the event listener. Any selected text will then be summarized and displayed in a tooltip. Be sure to replace the apiKey in the constructor with your actual OpenAI API key.

### Note

When using the `attach` method, handle the returned promise appropriately to catch any errors that may occur during the API call.

Ensure you have the correct OpenAI API key and that you handle and secure it appropriately.
