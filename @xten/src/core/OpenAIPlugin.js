export default class OpenAIApi {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
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
}
// More OpenAI API functions