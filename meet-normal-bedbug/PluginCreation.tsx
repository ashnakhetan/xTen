import { useState, useEffect } from "react";
import React from 'react'
import xten from "@xten/xten";
import { urlRecommenderPlugin } from "../@xten/src/plugins/recommender/urlRecommenderPlugin.js";
import { ScraperPlugin } from "../@xten/src/plugins/scraper/scraperPlugin"
import { scrapePage } from "../@xten/src/utils/scrapePage"
import { saveAs } from "file-saver";
import OpenAIPLugin from "../@xten/src/core/OpenAIPlugin"
import { SummarizerPlugin } from "../@xten/src/plugins/summarizer/summarizerPlugin";
import './popup.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Plugin builder modules, we want to be able to dynamically add to them in the future
import { aiPrompts as initialAiPrompts } from "../@xten/src/plugin_builder_modules/aiPrompts";
import { scrapeTypes as inititalScrapeTypes } from "../@xten/src/plugin_builder_modules/scrapeTypes";
import { dataSources as initialDataSources } from "../@xten/src/plugin_builder_modules/dataSources";
import { timePeriods as timePeriods } from "../@xten/src/plugin_builder_modules/timePeriods";
import { displayMethods as initialDisplayMethods } from "../@xten/src/plugin_builder_modules/displayMethods";
import { displayLoading } from "~../@xten/src/utils/display";
import { hideTooltip } from "~../@xten/src/utils/display";

const apiKey = "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";

// Base chatgpt plugin used for plugin builder
const chatGptPlugin = new OpenAIPLugin(apiKey);

// Recommender plugin
const recommenderPlugin = new urlRecommenderPlugin(apiKey);

// Summarizer plugin
let summarizerPlugin = new SummarizerPlugin(apiKey, true);



const PluginCreation = () => {
  // Main screen buttons
  // State to handle button hover
  const [isButtonHovered_1, setIsButtonHovered_1] = useState(false);
  const [isButtonHovered_2, setIsButtonHovered_2] = useState(false);
  const [isButtonHovered_3, setIsButtonHovered_3] = useState(false);
  const [isButtonHovered_4, setIsButtonHovered_4] = useState(false);
  const [isButtonHovered_5, setIsButtonHovered_5] = useState(false);

  const [customPlugins, setCustomPlugins] = useState([])

  /* TODO: Add backend for custom plugins
  * user plugin structure:
  * chat gpt plugin call + some sort of data to pupulate the prompt + a method to interact with the plugin = responde and a way of displaying the response
  * chat gpt plugin call = user completion or chat plugin
  * data to populate the prompt = util function that accesses some sort of api to get the data from the browser
  * method to interact with the plugin = a way to send the data to the plugin and get the response back
  * response = the response from the plugin displayed using one of the display components
  * The plugin should then be saved and displayed in the main popup screen under the other plugins
  * Still trying to figure out how to pipe the data from one piece to another
  */

  /* TODO: Break down popup.tsx into components */

  /* Initialize the modules for the plugin builder */
  const [scrapeTypes, setScrapeTypes] = useState([]);
  const [aiPrompts, setAiPrompts] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [displayMethods, setDisplayMethods] = useState([]);

// Initialize local copies of modules when the component mounts
  useEffect(() => {
    setScrapeTypes([...inititalScrapeTypes]);
    setAiPrompts([...initialAiPrompts]);
    setDataSources([...initialDataSources]);
    setDisplayMethods([...initialDisplayMethods]);
  }, []);

  // const DropdownsScreen = () => {
    const [pluginName, setPluginName] = useState("")

    const handlePluginNameChange = (e) => {
      setPluginName(e.target.value);
    };

    // const [selectedMethod, setSelectedMethod] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedData, setSelectedData] = useState("");
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const [selectedDisplay, setSelectedDisplay] = useState("");
    const [inputData, setInputData] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedData(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputData(event.target.value);
    };

    // Iterate over the names of the data sources from the dataSources array
    // and display them as options in the dropdown, same for prompts and displays
    const dataOption = Object.values(dataSources).map((source) => source.name);
    const timeOption = Object.values(timePeriods).map((source) => source.name);
    // const methodOption = Object.values(dataMethods).map((source) => source.name);
    const displayOption = Object.values(displayMethods).map((display) => display.name);
    const promptOption = Object.values(aiPrompts).map((prompt) => prompt.name);
    const scrapeOption = Object.values(scrapeTypes).map((type) => type.name);

    const saveCustomPlugin = () => {
      // Get the selected data source, AI prompt, and display method
      // const selectedMethod = dataMethods.find(method => method.name === selectedMethod);
      // console.log(selectedMethod);
      const selectedDataType = scrapeTypes.find(type => type.name === selectedType);
      const selectedDataSource = dataSources.find(source => source.name === selectedData);
      const selectedAiPrompt = aiPrompts.find(prompt => prompt.name === selectedPrompt);
      const selectedDisplayMethod = displayMethods.find(display => display.name === selectedDisplay);

      //DEBUG
      console.log('selectedDataSource: ', selectedDataSource);
      console.log('selectedAiPrompt: ', selectedAiPrompt);
      console.log('selectedDisplayMethod: ', selectedDisplayMethod);

      // Define a new function that uses these components
      const newPluginExecute = async function (selectedDataType) {
        // Execute the data source function and pass its output to the AI plugin
        console.log("selectedDataType: ", selectedDataType)
        const data = await selectedDataSource.execute(selectedDataType);
        // We initialize the plugin once, we need to call the customprompt call with the selectedAiPrompt.prompt
        // and the data as the prompt input
        // DEBUG 
        console.log('data: ', data);
        try {
          var requestOutput = await chatGptPlugin.customPrompt(selectedAiPrompt.text, data);
        }
        catch (err) {
          console.log(err);
        }
        // Pass the AI prompt's output to the display method
        console.log("selected display befpre");
        selectedDisplayMethod.execute(requestOutput);
        console.log("selected display afgter");
      };

      const newPlugin = {
        name: pluginName,
        execute: newPluginExecute(selectedDataType)
      };

      setCustomPlugins([...customPlugins, newPlugin]);
    };


    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 16,
          fontFamily: "Poppins",
          minWidth: 400
        }}>
        <h2>Plugin Creation Screen</h2>

        <div style={{
          marginBottom: 8,
          display: "flex",
          flexDirection: "row"
        }}>
          <select
            value={selectedData}
            onChange={(e) => {
              setSelectedData(e.target.value);
              console.log('New selectedMethod: ', e.target.value);
            }}
          >
            <option value="">Select a data source</option>
            {dataOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <span style={{ margin: "0 8px" }}>+</span>

          {/* if the selected method was manual: have an input box; if scraping: dropdown; if browsing history, time period dropdown! */}
          {selectedData === 'Scraping' ? (
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                console.log('New selectedType: ', e.target.value);
              }}
            >
              <option value="">Select a data type</option>
              {scrapeOption.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (selectedData === 'Manual') ? (
            <input type="text" value={inputData} onChange={handleInputChange} />
          ) :
          (
            <select
            value={selectedData}
            onChange={(e) => {
              setSelectedType(e.target.value);
              console.log('New selectedData: ', e.target.value);
            }}
          >
            <option value="">Select a time period</option>
            {timeOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          )}
<br></br>
        <span style={{ margin: "0 8px" }}>+</span>
        {/* </div> */}

          <select
            value={selectedPrompt}
            onChange={(e) => {
              setSelectedPrompt(e.target.value);
              console.log('New selectedPrompt: ', e.target.value);
            }}
          >
            <option value="">Select an AI query...</option>
            {promptOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span style={{ margin: "0 8px" }}>+</span>
          <select
            value={selectedDisplay}
            onChange={(e) => {
              setSelectedDisplay(e.target.value);
              console.log('New selectedDisplay: ', e.target.value);
            }}
          >
            <option value="">Select a display option...</option>
            {displayOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <h2>Name your Plugin</h2>
        <input
          style={{ width: "100%", marginBottom: 8, fontFamily: "monospace" }}
          type="text"
          placeholder="Plugin Name"
          value={pluginName}
          onChange={handlePluginNameChange}
        />
        <button
          style={{ marginBottom: 8 }}
          disabled={!pluginName || !selectedData || !selectedPrompt || !selectedDisplay}
          onClick={saveCustomPlugin}>Save Plugin
        </button>
        {/* <button onClick={() =>handleSetScreen('home')}>Close</button> */}
      </div>
    );
  // };



  // console.log(xten);
  // return(
  //   <div>
  //     {screen === 'dropdowns' && <DropdownsScreen />}
  //   </div>
  // )

}

export default PluginCreation;