// import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoRender } from "plasmo"
// import type { FC } from "react"
// import { createRoot } from "react-dom/client"

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
//   root.render(<PlasmoOverlay />)
// }
