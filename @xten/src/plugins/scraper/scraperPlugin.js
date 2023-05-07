// might be cool to use this to show what is being scraped?
import { displayLoading, displayText } from '../../utils/display.js';
import { scrapePage } from '../../utils/scrapePage.js'

export class ScraperPlugin {
  constructor() {
  }
    // get tabs from the dev
  scrape(contentTypes) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => scrapePage(tabs, contentTypes));
  }
}