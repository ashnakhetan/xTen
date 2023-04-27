import { useState } from "react"
import xten from '@xten/xten';

function IndexPopup() {
  const [data, setData] = useState("")
  console.log(xten);
  xten.printMsg()
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
} 

export default IndexPopup
