import { Injector } from "./src/injectUI/index.js";
import type { Injection } from './src/injectUI/index.js';

export type { Injection };

const printMsg = function () {
  console.log("This is a message from the demo package");
};

export default { Injector, printMsg };
