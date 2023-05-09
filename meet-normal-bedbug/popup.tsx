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
  const scraperPlug = new ScraperPlugin()
  const listElements = scraperPlug.scrape(contentTypes);
  console.log("list elements: ", listElements);
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://cs210.github.io/2023-87Capital/" target="_blank">
          xTen
        </a>{" "}
        sion!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://cs210.github.io/2023-87Capital/" target="_blank">
        View Docs
      </a>
      <h3>{listElements[0]}</h3>
    </div>
  )
} 

export default IndexPopup
