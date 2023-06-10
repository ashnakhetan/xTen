import { useState, useEffect } from "react";
import React from "react";
import './PluginCreation.css'
import icon from './assets/icon.png'

// Plugin builder modules, we want to be able to dynamically add to them in the future
import { aiPrompts as initialAiPrompts} from "../@xten/src/plugin_builder_modules/aiPrompts";
import { scrapeTypes as inititalScrapeTypes } from "../@xten/src/plugin_builder_modules/scrapeTypes";
import { dataSources as initialDataSources } from "../@xten/src/plugin_builder_modules/dataSources";
import { timePeriods as timePeriods } from "../@xten/src/plugin_builder_modules/timePeriods";
import { displayMethods as initialDisplayMethods} from "../@xten/src/plugin_builder_modules/displayMethods";

const apiKey = "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";

const PluginCreation = ({setScreen}) => {

    // useEffect(() => {
    // // Get the stored screen when the component is loaded
    // chrome.storage.local.get('screen', function(result) {
    //     if (result.screen) {
    //     setScreen(result.screen);
    //     }
    // });
    // }, []);

    const handleSetScreen = (screen) => {
      setScreen(screen);
      chrome.storage.local.set({ 'screen': screen });
    };

    // get the stored custom plugins by default when the component is loaded
    // Array of loading states for each plugin
    const [customPlugins, setCustomPlugins] = useState([]);
    const [loadingStates, setLoadingStates] = useState([]);

    useEffect(() => {
        chrome.storage.local.get(['customPlugins'], function(result) {
        if (result.customPlugins) {
            const parsedPlugins = JSON.parse(result.customPlugins);
            console.log("parsed plugins: ", parsedPlugins);
            setCustomPlugins(parsedPlugins);
            // Initialize the loading states
            const initialLoadingStates = parsedPlugins.map(() => {
            return false;
            });
            setLoadingStates(initialLoadingStates); // <- This is the part that was missing
        }
        });
    }, []);

    useEffect(() => {
        console.log("loadingStates updated:", loadingStates);
    }, [loadingStates]);


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

    /* Initialie the modules for the plugin builder */
    const [scrapeTypes, setScrapeTypes] = useState([]);
    const [aiPrompts, setAiPrompts] = useState([]);
    const [dataSources, setDataSources] = useState([]);
    const [displayMethods, setDisplayMethods] = useState([]);

    // Initialize local copies of modules when the component mounts
    useEffect(() => {
        setScrapeTypes([...inititalScrapeTypes]);
        setAiPrompts([ ...initialAiPrompts ]);
        setDataSources([ ...initialDataSources ]);
        setDisplayMethods([ ...initialDisplayMethods ]);
    }, []);

    const [pluginName, setPluginName] = useState("")

    const handlePluginNameChange = (e) => {
      setPluginName(e.target.value);
    };

    
    const [selectedType, setSelectedType] = useState("");
    const [selectedData, setSelectedData] = useState("");
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const [selectedDisplay, setSelectedDisplay] = useState("");
    const [inputData, setInputData] = useState('');
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputData(event.target.value);
      const selectedDataSource = dataSources.find((source) => source.name === selectedData);
      selectedDataSource.manual = inputData;
      console.log("selectedDataSource.manual: ", selectedDataSource.manual)
    };
    
    // Iterate over the names of the data sources from the dataSources array
    // and display them as options in the dropdown, same for prompts and displays
    const dataOption = Object.values(dataSources).map((source) => source.name);
    const timeOption = Object.values(timePeriods).map((source) => source.name);
    const displayOption = Object.values(displayMethods).map((display) => display.name);
    const promptOption = Object.values(aiPrompts).map((prompt) => prompt.name);
    const scrapeOption = Object.values(scrapeTypes).map((type) => type.name);


    const saveCustomPlugin = () => {
      // Get the names of the selected data source, prompt, and display method
      const selectedDataType = scrapeTypes.find(type => type.name === selectedType);
      const selectedDataSource = dataSources.find((source) => source.name === selectedData);
      const selectedAiPrompt = aiPrompts.find((prompt) => prompt.name === selectedPrompt);
      const selectedDisplayMethod = displayMethods.find((display) => display.name === selectedDisplay);
      
      const newPlugin = {
        name: pluginName,
        dataSourceName : selectedDataSource.name,
        dataTypeName: selectedDataType.name,
        aiPromptName: selectedAiPrompt.name,
        displayMethodName: selectedDisplayMethod.name,
        loading: false
      };

      // Update the state with the new plugin
      console.log("previous custom plugins: ", customPlugins);
      const updatedCustomPlugins = [...customPlugins, newPlugin];
      console.log("updated custom plugins: ", updatedCustomPlugins);
      setCustomPlugins(updatedCustomPlugins);
      // Store the updated list in local storage
      chrome.storage.local.set({ customPlugins: JSON.stringify(updatedCustomPlugins) });
    };
    

  
    return (
      <div className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          // padding: 16,
        }}>
          <div className="header">
        <div className="logo"></div>
        {/* <h2 className="title">Browser Extension</h2> */}
        <a href="https://cs210.github.io/2023-87Capital/" target="_blank" rel="noopener noreferrer">
          <img src={icon} width={180}></img>
        </a>
      </div>
        <h1>Create a Custom Plugin</h1>
        <div style={{ 
          marginBottom: 8,
          display: "flex",
          flexDirection: "row"
          // overflow:"auto"
          }}>
          <select className="dropdown"
            value={selectedData}
            onChange={(e) => {
              setSelectedData(e.target.value);
              console.log('New selectedData: ', e.target.value);
            }}
          >
            <option value="">Select data source</option>
            {dataOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span style={{ margin: "0 8px" }}>+</span>


          {/* if the selected method was manual: have an input box; if scraping: dropdown; if browsing history, time period dropdown! */}
          {selectedData === 'Scraping' ? (
            <select className="dropdown"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                console.log('New selectedType: ', e.target.value);
              }}
            >
              <option value="">Select data type</option>
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
            <select className="dropdown"
            value={selectedData}
            onChange={(e) => {
              setSelectedType(e.target.value);
              console.log('New selectedData: ', e.target.value);
            }}
          >
            <option value="">Select time period</option>
            {timeOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          )}
        </div>
        <div style={{ 
          marginBottom: 8,
          display: "flex",
          flexDirection: "row"
          // overflow:"auto"
          }}>
          {/* <span style={{ margin: "0 8px" }}>+</span> */}

          <select className="dropdown"
            value={selectedPrompt}
            onChange={(e) => {
              setSelectedPrompt(e.target.value);
              console.log('New selectedPrompt: ', e.target.value);
            }}
          >
            <option value="">Select an AI query</option>
            {promptOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span style={{ margin: "0 8px" }}>+</span>
          <select className="dropdown"
            value={selectedDisplay}
            onChange={(e) => {
              setSelectedDisplay(e.target.value);
              console.log('New selectedDisplay: ', e.target.value);
            }}
          >
            <option value="">Select display option</option>
            {displayOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          className="ai-button"
          onClick={() => handleSetScreen('aiPromptCreation')}
        >
          + Create AI Prompt
        </button>
        <h2>Name your Plugin</h2>
        <input className="input"
          // style={{ width: "100%", marginBottom: 8}}
          type="text"
          placeholder="Plugin Name"
          value={pluginName}
          onChange={handlePluginNameChange}
        />
        <button className="add-button"
        style={{ marginBottom: 8 }}
        disabled={!pluginName || !selectedData || !selectedPrompt || !selectedDisplay}
        onClick={saveCustomPlugin}>Save Plugin
        </button>
        <button className="back-button"onClick={() =>handleSetScreen('home')}></button>
      </div>
    );
  };


export default PluginCreation;