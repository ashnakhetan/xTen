// might be cool to use this to show what is being scraped?
import { displayLoading, displayText } from '../../utils/display.js';
import { scrapePage } from '../../utils/scrapePage.js'

export class ScraperPlugin {
  constructor() {
  }
  // get tabs and call scrapePage function
  scrape(contentTypes) {
    let listElements = new Array();
    chrome.tabs.query({ active: true, currentWindow: true }, listElements = (tabs => scrapePage(tabs, contentTypes)));
    // console.log(listElements);
    return listElements;
  }
}