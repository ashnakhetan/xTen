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
exports.Injector = void 0;
var client_1 = require("react-dom/client");
// import fs from 'fs';
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
// export const config: PlasmoCSConfig = {
//   matches: ["https://www.utu.fi/*"]
// }
// export const getRootContainer = () =>
//   new Promise((resolve) => {
//     const checkInterval = setInterval(() => {
//       const rootContainer = document.getElementById("block-herotitleblock")
//       if (rootContainer) {
//         clearInterval(checkInterval)
//         resolve(rootContainer)
//       }
//     }, 137)
//   })
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
// export const injectUI = (elem = "", querySelector, website) => {
//   const config: PlasmoCSConfig = {
//     matches: ["${website}"]
//   };
//   const getRootConfig = () =>
//     new Promise((resolve) => {
//       const checkInterval = setInterval(() => {
//         const rootContainer = document.getElementById("${querySelector}")
//         if (rootContainer) {
//           clearInterval(checkInterval)
//           resolve(rootContainer)
//         }
//       }, 137)
//     });
// const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
//       return (
//         <span
//           style={{
//             background: "yellow",
//             padding: 12
//           }}>
//           HELLO WORLD ROOT CONTAINER
//         </span>
//       )
//     };
// const render = async ({ createRootContainer }) => {
//       const rootContainer = await createRootContainer()
//       const root = createRoot(rootContainer)
//       root.render(<PlasmoOverlay />)
// };
// const config = `export const config: PlasmoCSConfig = {
//   matches: ["${website}"]
// }`;
// const getRootConfig = `export const getRootContainer = () =>
//   new Promise((resolve) => {
//     const checkInterval = setInterval(() => {
//       const rootContainer = document.getElementById("${querySelector}")
//       if (rootContainer) {
//         clearInterval(checkInterval)
//         resolve(rootContainer)
//       }
//     }, 137)
//   })`;
// const Overlay = `
//     const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
//       return (
//         <span
//           style={{
//             background: "yellow",
//             padding: 12
//           }}>
//           HELLO WORLD ROOT CONTAINER
//         </span>
//       )
//     }`;
// const render = `export const render: PlasmoRender = async ({ createRootContainer }) => {
//       const rootContainer = await createRootContainer()
//       const root = createRoot(rootContainer)
//       root.render(<PlasmoOverlay />)
//     }`;
// return { config, getRootConfig, Overlay, render }
// let currentPath = __dirname;
// console.log("curr path", currentPath);
// console.log("process cwd", process.cwd());
// console.log("pathname", new URL(import.meta.url).pathname); // prints the directory path of this file
// }
// import fs from 'fs-extra';
// import path from 'path';
// function modifyDevFile(devFilePath) {
//   const rootPath = path.resolve(__dirname, '../');
//   const filePath = path.join(rootPath, devFilePath);
//   const content = fs.readFileSync(filePath, 'utf8');
//   const modifiedContent = content.replace(/some-regex/g, 'replacement');
//   fs.writeFileSync(filePath, modifiedContent, 'utf8');
// };
var Inject = /** @class */ (function () {
    function Inject() {
        var _this = this;
        this.configure = function (options) {
            _this.config = options;
        };
        this.getConfig = function () { return _this.config; };
        this.getRootContainerConfig = function () { return _this.getRootContainer; };
        this.injectById = function (id) {
            _this.getRootContainer = function () {
                return new Promise(function (resolve) {
                    var checkInterval = setInterval(function () {
                        var rootContainer = document.getElementById(id);
                        if (rootContainer) {
                            clearInterval(checkInterval);
                            resolve(rootContainer);
                        }
                    }, 137);
                });
            };
        };
        this.getRenderer = function () { return _this.render; };
        this.renderElem = function (elem) {
            _this.render = function (_a) {
                var createRootContainer = _a.createRootContainer;
                return __awaiter(_this, void 0, void 0, function () {
                    var rootContainer, root;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, createRootContainer()];
                            case 1:
                                rootContainer = _b.sent();
                                root = (0, client_1.createRoot)(rootContainer);
                                root.render(elem);
                                return [2 /*return*/];
                        }
                    });
                });
            };
        };
    }
    return Inject;
}());
exports.Injector = new Inject();
