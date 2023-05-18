import { Injector } from "./src/injectUI/index.js";
import type { Injection } from './src/injectUI/index.js';

import { summarizeText } from './src/plugins/summarizer/summarize';
import { SummarizerPlugin } from './src/plugins/summarizer/summarizerPlugin';

export type { Injection };

export default { Injector, summarizeText, SummarizerPlugin };
