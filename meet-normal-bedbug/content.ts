export {}

import {SummarizerPlugin } from '../@xten/src/plugins/summarizer/summarizerPlugin';


const apiKey = 'Put your API key here';
const summarizerPlugin = new SummarizerPlugin(apiKey);

// Attach the imported plugin to the page
summarizerPlugin.attach();

const apiEndpoint = 'https://api.openai.com/v1/models';

fetch(apiEndpoint, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Error during API request: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  console.log('Available models:', data);
})
.catch(error => {
  console.error('Error:', error);
});


