// src/index.js
import { summarize } from './src/plugins/summarizer/summarize';
import SummarizerPlugin from './src/plugins/summarizer/summarizerPlugin';

export {
  summarize,
  SummarizerPlugin,
};

const xten = {
  printMsg: () => {
    console.log("Hello from xten!");
  },
  // Other methods and properties...
};

export default xten;