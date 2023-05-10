"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./src/injectUI/index.js");
var summarize_1 = require("./src/plugins/summarizer/summarize");
var summarizerPlugin_1 = require("./src/plugins/summarizer/summarizerPlugin");
var printMsg = function () {
    console.log("This is a message from the demo package");
};
exports.default = { Injector: index_js_1.Injector, summarizeText: summarize_1.summarizeText, SummarizerPlugin: summarizerPlugin_1.SummarizerPlugin, printMsg: printMsg };
