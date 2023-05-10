import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoRender } from "plasmo"
import type { FC } from "react"
import { createRoot } from "react-dom/client"

import xten from "~../@xten"

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
  return (
    <span
      style={{
        background: "red",
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

export const config = (() => i.getConfig())()
export const getRootContainer = (() => i.getRootContainerConfig())()
export const render = (() => i.getRenderer())()
