
# Scraping information from webpages

This utility function allows you to scrape information of your choice from a site.

Input: list of elements you wish to extract:
Output: array of elements on page matching the input

For example, if you want to extract:
Text: “title”, “h1”, “p”, “ul” “ol”, “li”
Links: “a”
Images: “img”
Tables: “table”, “tr”, “td”
Forms: “form”, “input”, “select”, “textarea”
Metadata: “title”, “meta name=”description””, info in “head”
Social Media Embeds
Comments
Product information: might be something like “'.product-price'”
Structured Data

Steps:
Import the utility function
```
import { scrapePage } from '../@xten/src/utils/scrapePage';
```


Define a list of content types
```
const contentTypes = ['title, h1, h2, h3, h4'];
```

Then, in your app’s function, you can call:
```
ScraperPlugin.scrape(contentTypes);
```



