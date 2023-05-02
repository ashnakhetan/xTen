import type { PlasmoGetOverlayAnchor, PlasmoGetOverlayAnchorList, PlasmoMountShadowHost, PlasmoCreateShadowRoot } from "plasmo"

import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoRender } from "plasmo"
import type { FC } from "react"
import { createRoot } from "react-dom/client"

// import fs from 'fs';

// Search for package.json starting from the current directory
let currentPath = __dirname;
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

const getOverlayAnchor: PlasmoGetOverlayAnchor = async (point) => document.querySelector(point)
 
const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async (point) => document.querySelectorAll(point)

type HookPoint = FC<PlasmoCSUIProps>;

export const config: PlasmoCSConfig = {
  matches: ["https://www.utu.fi/*"]
}

export const getRootContainer = () =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainer = document.getElementById("block-herotitleblock")
      if (rootContainer) {
        clearInterval(checkInterval)
        resolve(rootContainer)
      }
    }, 137)
  })

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


export const inejctUI = (elem = "", querySelector, website) => {
  const config = `export const config: PlasmoCSConfig = {
    matches: ["${website}"]
  }`;

  const getRootConfig = `export const getRootContainer = () =>
    new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const rootContainer = document.getElementById("${querySelector}")
        if (rootContainer) {
          clearInterval(checkInterval)
          resolve(rootContainer)
        }
      }, 137)
    })`;

    const Overlay = `
      const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
        return (
          <span
            style={{
              background: "yellow",
              padding: 12
            }}>
            HELLO WORLD ROOT CONTAINER
          </span>
        )
      }`;

    const render = `export const render: PlasmoRender = async ({ createRootContainer }) => {
        const rootContainer = await createRootContainer()
        const root = createRoot(rootContainer)
        root.render(<PlasmoOverlay />)
      }`;

    
let currentPath = __dirname;
console.log(currentPath);
console.log(process.cwd());
}