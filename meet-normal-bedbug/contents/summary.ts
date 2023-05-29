export {}

import {SummarizerPlugin } from '../../@xten/src/plugins/summarizer/summarizerPlugin';


const apiKey = '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';
const summarizerPlugin = new SummarizerPlugin(apiKey, true);

// Attach the imported plugin to the page, deprecated handled in popup.ts, uncomment only if you want to test it
// summarizerPlugin.attach();
