import type { PlasmoGetOverlayAnchor, PlasmoGetOverlayAnchorList, PlasmoMountShadowHost, PlasmoCreateShadowRoot } from "plasmo"

import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoRender } from "plasmo"
import type { FC } from "react"
import { createRoot } from "react-dom/client";


// import fs from 'fs';


// while (!fs.existsSync(`${currentPath}/package.json`) && currentPath !== '/') {
//   currentPath = require('path').normalize(`${currentPath}/..`);
// }

// if (currentPath === '/') {
//   console.log('Root directory not found');
// } else {
//   console.log(`Root directory is ${currentPath}`);
// }

const getOverlayAnchor: PlasmoGetOverlayAnchor = async (point) => document.querySelector(point)

const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async (point) => document.querySelectorAll(point)

type HookPoint = FC<PlasmoCSUIProps>;

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

class Inject {
  config: PlasmoCSConfig
  render: PlasmoRender
  getRootContainer: () => Promise<unknown>
  constructor() { }

  configure = (options: PlasmoCSConfig) => {
    this.config = options
  }

  getConfig = (): PlasmoCSConfig => this.config

  getRootContainerConfig = () => this.getRootContainer

  injectById = (id) => {
    this.getRootContainer = () =>
      new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          const rootContainer = document.getElementById(id)
          if (rootContainer) {
            clearInterval(checkInterval)
            resolve(rootContainer)
          }
        }, 137)
      })
  }

  getRenderer = () => this.render

  renderElem = (elem: JSX.Element) => {
    this.render = async ({ createRootContainer }) => {
      const rootContainer = await createRootContainer()
      const root = createRoot(rootContainer)
      root.render(elem)
    }
  }
}

export type Injection = typeof Injector;

export const Injector = new Inject()