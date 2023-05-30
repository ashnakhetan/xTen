import { displayLoading, displayText, hideTooltip } from '../../utils/display.js';
import OpenAIPlugin from '../../core/OpenAIPlugin.js';

// This particular plugin instantiates an openAIPlugin and attaches an event listener to the document
// to listen for mouseup events. When a mouseup event is detected, the plugin checks if there is any
// selected text. If there is, it calls the summarizeText function from @xten/src/plugins/summarizer/summarize
// to get the summary of the selected text. It then calls the displayText function from @xten/src/utils/display
// to display the summary in a tooltip.

export class SummarizerPlugin {
  constructor(apiKey, useContextMenu = false) {
    this.openAIPlugin = new OpenAIPlugin(apiKey);
    this.useContextMenu = useContextMenu;
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  async handleMouseUp(event) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      console.log(`Selected text: ${selectedText}`);

      /* Display in the left middle of the page */
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const x = rect.left + rect.width / 2 + window.scrollX;
      const y = rect.top + rect.height / 2 + window.scrollY;

      if (this.useContextMenu) {
        if (window.confirm("Would you like to summarize the selected text?")) {
          await this.summarizeAndDisplay(selectedText, x, y);
        }
      } else {
        await this.summarizeAndDisplay(selectedText, x, y);
      }
    }
  }

  async summarizeAndDisplay(selectedText, x, y) {
    displayLoading(x, y);
    try {
      const summary = await this.openAIPlugin.summarizeText(selectedText);
      hideTooltip();
      // Format the summary
      displayText(`Summary:\n\n${summary}`, x, y);
      console.log(`Summary: ${summary}`);
    } catch (error) {
      console.error(`Error getting summary: ${error}`);
      displayText(`Error getting summary: \n${error}`, x, y);
      hideTooltip();
    }
  }

  attach() {
    console.log('Attaching SummarizerPlugin event listener');
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  attachWithContextMenu() {
    console.log('Attaching SummarizerPlugin event listener with context menu');
    this.useContextMenu = true;
    this.attach();
  }

  detach() {
    console.log('Detaching SummarizerPlugin event listener');
    document.removeEventListener('mouseup', this.handleMouseUp);
  }
}
