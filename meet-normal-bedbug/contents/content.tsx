// import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoRender } from "plasmo"
// import type { FC } from "react"
// import { createRoot } from "react-dom/client"
// import xten from "@xten/xten"

// class Inject {
//   config: PlasmoCSConfig
//   render: PlasmoRender
//   getRootContainer: () => Promise<unknown>
//   constructor() {}

//   configure = (options: PlasmoCSConfig) => {
//     this.config = options
//   }

//   getConfig = (): PlasmoCSConfig => this.config

//   getRootContainerConfig = () => this.getRootContainer

//   injectById = (id) => {
//     this.getRootContainer = () =>
//       new Promise((resolve) => {
//         const checkInterval = setInterval(() => {
//           const rootContainer = document.getElementById(id)
//           if (rootContainer) {
//             clearInterval(checkInterval)
//             resolve(rootContainer)
//           }
//         }, 137)
//       })
//   }

//   getRenderer = () => this.render

//   renderElem = (elem: JSX.Element) => {
//     this.render = async ({ createRootContainer }) => {
//       const rootContainer = await createRootContainer()
//       const root = createRoot(rootContainer)
//       root.render(elem)
//     }
//   }
// }

import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoRender } from "plasmo"
import type { FC } from "react"
import { createRoot } from "react-dom/client"

import xten from "~../@xten"

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
}

const i = xten.Injector

// configure url matches
i.configure({
  matches: ["https://www.utu.fi/*"]
})
// get root container by id
i.injectById("block-herotitleblock")
// inject element
i.renderElem(<PlasmoOverlay />)
//

// i.configure({
//   matches: ["https://www.utu.fi/*"]
// })

// i.injectById("block-herotitleblock")

// i.renderElem(<PlasmoOverlay />)

export const config = (() => i.getConfig())()

export const getRootContainer = (() => i.getRootContainerConfig())()

export const render = (() => i.getRenderer())()

// dropping the Promise all together
// export default (($export) => {
// await async dependencies
// export the module
// var config: PlasmoCSConfig = {
//   matches: ["https://www.utu.fi/*"]
// }

// const { config, getRootConfig, Overlay, render } = xten.injectUI(
//   "",
//   "block-herotitleblock",
//   "https://www.utu.fi/"
// )

// var getRootContainer = () =>
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

// var render: PlasmoRender = async ({ createRootContainer }) => {
//   const rootContainer = await createRootContainer()
//   const root = createRoot(rootContainer)
//   root.render(<PlasmoOverlay />)
// }

// return { config, getRootContainer, render }
// })()

// export { i.config, getRootContainer, render }
