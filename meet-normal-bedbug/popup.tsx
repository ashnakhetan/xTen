import { useState } from "react"
import xten from '@xten/xten';
import { urlRecommenderPlugin } from "../@xten/src/plugins/recommender/urlRecommenderPlugin";

const apiKey = "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";
const recommenderPlugin = new urlRecommenderPlugin(apiKey);

function IndexPopup() {
  const [data, setData] = useState("")
  
  const suggestWebsites = () => {
    // DEBUG Add the logic for suggesting websites here
    console.log("Suggesting websites...");
    recommenderPlugin.recommendUrlsMonth();
  };

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
      <button onClick={suggestWebsites}>Suggest Websites</button>
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
} 

export default IndexPopup
