import { displayLoading, displayText, hideTooltip } from '../../utils/display.js';
import OpenAIPlugin from '../../core/OpenAIPlugin.js';

// This particular plugin instantiates an openAIPlugin and attaches an event listener to the document
// to listen for mouseup events. When a mouseup event is detected, the plugin checks if there is any
// selected text. If there is, it calls the summarizeText function from @xten/src/plugins/summarizer/summarize
// to get the summary of the selected text. It then calls the displayText function from @xten/src/utils/display
// to display the summary in a tooltip.

export class SummarizerPlugin {
  constructor(apiKey) {
    this.openAIPlugin = new OpenAIPlugin(apiKey);
  }

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
        
        /* Display in the left middle of the page */
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
          const summary = await this.openAIPlugin.summarizeText(selectedText);
          hideTooltip();    
          displayText(summary, x, y);
          console.log(`Summary: ${summary}`);
        } catch (error) {
          console.error(`Error getting summary: ${error}`);
          hideTooltip
        }
      }
    });
  }
}