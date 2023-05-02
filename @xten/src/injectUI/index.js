"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inejctUI = exports.getRootContainer = exports.config = void 0;
// import fs from 'fs';
// Search for package.json starting from the current directory
var currentPath = __dirname;
console.log(currentPath);
console.log(process.cwd());
// while (!fs.existsSync(`${currentPath}/package.json`) && currentPath !== '/') {
//   currentPath = require('path').normalize(`${currentPath}/..`);
// }
// if (currentPath === '/') {
//   console.log('Root directory not found');
// } else {
//   console.log(`Root directory is ${currentPath}`);
// }
var getOverlayAnchor = function (point) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, document.querySelector(point)];
}); }); };
var getOverlayAnchorList = function (point) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, document.querySelectorAll(point)];
}); }); };
exports.config = {
    matches: ["https://www.utu.fi/*"]
};
var getRootContainer = function () {
    return new Promise(function (resolve) {
        var checkInterval = setInterval(function () {
            var rootContainer = document.getElementById("block-herotitleblock");
            if (rootContainer) {
                clearInterval(checkInterval);
                resolve(rootContainer);
            }
        }, 137);
    });
};
exports.getRootContainer = getRootContainer;
// const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
//   return (
//     <span
//       style={{
//         background: "yellow",
//         padding: 12
//       }}>
//       HELLO WORLD ROOT CONTAINER
//     </span>
//   )
// }
// export const render: PlasmoRender = async ({ createRootContainer }) => {
//   const rootContainer = await createRootContainer()
//   const root = createRoot(rootContainer)
//   root.render()
// }
// export const Hook = async (point: HookPoint) => {
//   if (typeof point === "string") {
//     const anchor = await getOverlayAnchor(point);
//     mountShadowHost({ host, anchor, observer });
//   } 
// }
// const mountShadowHost: PlasmoMountShadowHost = ({
//   shadowHost,
//   anchor,
//   observer
// }) => {
//   anchor?.element?.appendChild(shadowHost)
//   // observer.disconnect() // OPTIONAL DEMO: stop the observer as needed
// }
// export const createShadowRoot: PlasmoCreateShadowRoot = (shadowHost) =>
//   shadowHost.attachShadow({ mode: "open" })
var inejctUI = function (elem, querySelector, website) {
    if (elem === void 0) { elem = ""; }
    var config = "export const config: PlasmoCSConfig = {\n    matches: [\"".concat(website, "\"]\n  }");
    var getRootConfig = "export const getRootContainer = () =>\n    new Promise((resolve) => {\n      const checkInterval = setInterval(() => {\n        const rootContainer = document.getElementById(\"".concat(querySelector, "\")\n        if (rootContainer) {\n          clearInterval(checkInterval)\n          resolve(rootContainer)\n        }\n      }, 137)\n    })");
    var Overlay = "\n      const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {\n        return (\n          <span\n            style={{\n              background: \"yellow\",\n              padding: 12\n            }}>\n            HELLO WORLD ROOT CONTAINER\n          </span>\n        )\n      }";
    var render = "export const render: PlasmoRender = async ({ createRootContainer }) => {\n        const rootContainer = await createRootContainer()\n        const root = createRoot(rootContainer)\n        root.render(<PlasmoOverlay />)\n      }";
    var currentPath = __dirname;
    console.log(currentPath);
    console.log(process.cwd());
};
exports.inejctUI = inejctUI;
