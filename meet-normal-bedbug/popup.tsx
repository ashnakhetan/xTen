import { useState } from "react";
import xten from '@xten/xten';
import { scrapePage } from '../@xten/src/utils/scrapePage';
import { ScraperPlugin } from '../@xten/src/plugins/scraper/scraperPlugin';

const contentTypes = ['title, h1, h2, h3, h4'];
// const contentTypes = ['title, h1, h2, h3, h4, h5, h6, img'];


function IndexPopup() {
  const [data, setData] = useState("")
  console.log(xten);
  xten.printMsg();
  ScraperPlugin.scrape(contentTypes);
  
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
          PlasmoXD
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
