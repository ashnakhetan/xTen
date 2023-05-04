# Setting up and using the summarizer function(s)

scrape_summarize_data(): Scrape user-specified data from the page
extract_user_profile(): Scrape a standard list of info from every page visited

Steps:
  1. Import summarizer plugin
  ```
  import {SummarizerPlugin } from '../@xten/src/plugins/summarizer/summarizerPlugin';
  ```
  
  2. Paste in your API key and use the imported plugin
  ```
  const summarizerPlugin = new SummarizerPlugin(apiKey);
  ```
  
  3. Attach the imported plugin to the page
  ```
  summarizerPlugin.attach();
  ```
  
  Almost done! Happy building :)
