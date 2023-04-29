import { Configuration, OpenAIApi } from 'openai';

export default class OpenAIPLugin {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.apiEndpoint = 'https://api.openai.com/v1/completions';
      this.configuration = new Configuration({ apiKey });
      this.openai = new OpenAIApi(this.configuration);
    }
    
    // OpenAI API summarize text function
    // Currently only supports the Davinci model.

    async summarizeText(text) {
        const prompt = text + "\n\nTl;dr";
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 500,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 1,
          }),
        });
    
        if (!response.ok) {
          const errorBody = await response.json();
          console.log(errorBody);
          throw new Error(`Error during API request: ${response.statusText}`);
        }
    
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse.choices[0].text;
      }
    // More OpenAI API functions
    // Get list of avilable models
    async getAvailableModels() {
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
    }
}