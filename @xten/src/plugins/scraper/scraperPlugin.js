import { displayLoading, displayText } from '../../utils/display.js';
import { Configuration, OpenAIApi } from 'openai';
import { summarizeText} from '../../core/OpenAIPlugin.js'

export class ScraperPlugin {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiEndpoint = 'https://api.openai.com/v1/completions';
        this.configuration = new Configuration({ apiKey });
        this.openai = new OpenAIApi(this.configuration);
      }

    /* Function moved to OpenAIPlugin.js */
    // async summarizeText(text) {
    //   const prompt = text + "\n\nTl;dr";
    //   const response = await fetch(this.apiEndpoint, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${this.apiKey}`,
    //     },
    //     body: JSON.stringify({
    //       model: 'text-davinci-003',
    //       prompt: prompt,
    //       temperature: 0.7,
    //       max_tokens: 500,
    //       top_p: 1.0,
    //       frequency_penalty: 0.0,
    //       presence_penalty: 1,
    //     }),
    //   });
  
    //   if (!response.ok) {
    //     const errorBody = await response.json();
    //     console.log(errorBody);
    //     throw new Error(`Error during API request: ${response.statusText}`);
    //   }
  
    //   const jsonResponse = await response.json();
    //   console.log(jsonResponse);
    //   return jsonResponse.choices[0].text;
    // }

  attach() {
    console.log('Attaching SummarizerPlugin event listener');
    document.addEventListener('mouseup', async () => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText.length > 0) {
        console.log(`Selected text: ${selectedText}`);

        /* Get the coordinates in the middle of the selected text
         * we want the tooltip to appear in the middle of the selected text
         * update the coordinates every time a new selection is made
         */

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;
        
        /* Call the displaySummary function from @xten/src/utils/display.js
         * with the summary and the x and y coordinates of the mouse click
         * to display the summary.
         */
        
        displayLoading(x, y);

        try {
          const summary = await summarizeText(selectedText);
          document.querySelector('.loading').remove();
  
          displayText(summary, x, y);
          console.log(`Summary: ${summary}`);
        } catch (error) {
          console.error(`Error getting summary: ${error}`);
          document.querySelector('.loading').remove();
        }
      }
    });
  }
}