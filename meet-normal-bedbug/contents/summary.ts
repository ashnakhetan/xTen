export {}

import {SummarizerPlugin } from '../../@xten/src/plugins/summarizer/summarizerPlugin';


const apiKey = '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';
const summarizerPlugin = new SummarizerPlugin(apiKey);

// Attach the imported plugin to the page
summarizerPlugin.attach();

