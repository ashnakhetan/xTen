import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css'
// import logo from '../assets/logo.png'
import icon from '../assets/icon.png'
import CustomPlugins from './CustomPlugins';
import SuggestWebsites from '~SuggestWebsites';
import { dataSources } from '~../@xten/src/plugin_builder_modules/dataSources';
import { scrapeTypes } from '~../@xten/src/plugin_builder_modules/scrapeTypes';
import { aiPrompts } from '~../@xten/src/plugin_builder_modules/aiPrompts';
import { displayMethods } from '~../@xten/src/plugin_builder_modules/displayMethods';
import { urlRecommenderPlugin } from "~../@xten/src/plugins/recommender/urlRecommenderPlugin";
import { SummarizerPlugin } from "~../@xten/src/plugins/summarizer/summarizerPlugin";

const apiKey = "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";

// Recommender plugin
const recommenderPlugin = new urlRecommenderPlugin(apiKey);
// Summarizer plugin
let summarizerPlugin = new SummarizerPlugin(apiKey, true);

const Home = ({ setScreen }) => {

    // Sumarizer plugin
    const [smartSummarizer, setSmartSummarizer] = useState(false);

    // Use effect to set the smart summarizer state
    useEffect(() => {
      chrome.storage.local.get(['smartSummarizer'], function(result) {
        setSmartSummarizer(!!result.smartSummarizer);
      });
    }, []);
    
    function handleSmartSummarizerToggle() {
      setSmartSummarizer((prevState) => {
        console.log("Smart Summarizer toggle, current state: ", prevState);
        console.log("Smart Summarizer toggle, new state: ", !prevState)
  
        const newState = !prevState;
    
        // If the new state is true, attach the plugin, otherwise detach
        if (newState) {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "attach"});
        });
        } else {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "detach"});
        });
        }
        // Set local storage
        chrome.storage.local.set({ 'smartSummarizer': newState });
        return newState;
      });
    }

    // Set the screen in local storage when it changes
    const handleSetScreen = (screen) => {
      setScreen(screen);
      chrome.storage.local.set({ 'screen': screen });
    };

    // Main screen buttons
    // State to handle button hover
    const [isButtonHovered_1, setIsButtonHovered_1] = useState(false);
    const [isButtonHovered_2, setIsButtonHovered_2] = useState(false);
    const [isButtonHovered_3, setIsButtonHovered_3] = useState(false);
    const [isButtonHovered_4, setIsButtonHovered_4] = useState(false);


    // useEffect(() => {
    //     // Get the stored screen when the component is loaded
    //     chrome.storage.local.get('screen', function(result) {
    //     if (result.screen) {
    //         setScreen(result.screen);
    //     }
    //     });
    // }, []);

    const [recommendedUrls, setRecommendedUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const suggestSites = async () => {
        setLoading(true);
        console.log("Suggesting websites...");
        const urls = await recommenderPlugin.recommendUrlsMonth();
        console.log("Printing suggested websites!");
        console.log(urls);
        console.log("Setting suggested websites array");
        const new_arr = urls.split('\n').filter(url => url.trim() !== '');
        console.log("New array of urls:");
        /* Delete the first 3 characters of every entry */
        new_arr.forEach((url, index) => {
            new_arr[index] = url.substring(3);
        });
        console.log(new_arr);
        setRecommendedUrls(new_arr);
        console.log("Recommended URLs state after setting:");
        console.log(recommendedUrls);
        setLoading(false);
    }

  return (
    <div className="card">
      <div className="header">
        <div className="logo"></div>
        {/* <h2 className="title">Browser Extension</h2> */}
        <a href="https://cs210.github.io/2023-87Capital/" target="_blank" rel="noopener noreferrer">
          <img src={icon} width={180}></img>
        </a>
      </div>
      <div className="text-section">
        <p><span className="big">Demo our features</span>. Create a sample browser extension or utilize one of our <span className="highlighted">examples</span>.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title">Plugins</h3>
        <button
          className="add-button"
          onClick={() => handleSetScreen('pluginCreation')}
          // style={{ marginLeft: "10px" }}
        >
          + Add New
        </button>
      </div>
      <div className="box" style={{ display: "flex", flexDirection: "row" }}>
        <button
            className="try-chatbot"
            style={{ 
              marginBottom: 8,
              padding: "3px 10px",
              backgroundColor: isButtonHovered_4 ? "#f95d6a" : "#ef9d9d", // change color on hover
              color: "#ffffff" // White color for the text
          }}
            onMouseEnter={() => setIsButtonHovered_4(true)}
            onMouseLeave={() => setIsButtonHovered_4(false)}
            onClick={() => {
              handleSetScreen('chatbotSetup');
              setIsButtonHovered_4(false);
            }}>Try Chatbot
        </button>
        <button 
              className="try-chatbot"
              style={{ 
                  marginBottom: 8,
                  padding: "3px 10px",
                  backgroundColor: isButtonHovered_3 ? "#f95d6a" : "#ef9d9d", // change color on hover
                  color: "#ffffff" // White color for the text
              }}
              onMouseEnter={() => setIsButtonHovered_3(true)}
              onMouseLeave={() => setIsButtonHovered_3(false)}
              disabled={loading}
              onClick={()=> {
                  suggestSites();
                  setIsButtonHovered_3(false);
              }}>{loading? "Loading..." : "Suggest Websites"}
        </button>
        <div style={{ display: "flex", alignItems: "center" }}>
            <label className="switch">
              <input 
                type="checkbox"
                checked={smartSummarizer}
                onChange={handleSmartSummarizerToggle}
              />
              <span className="slider round"></span>
            </label>
            <span style={{ marginLeft: 8 }}>
              {smartSummarizer ? 'Smart Summarizer Enabled' : 'Smart Summarizer Disabled'}
            </span>
          </div>
      </div>
      <div className="box" style={{ display: "flex", flexDirection: "column" }}>
        <CustomPlugins dataSources={dataSources} dataTypes={scrapeTypes} aiPrompts={aiPrompts} displayMethods={displayMethods} />
      </div>
      <h3 className="title">Console</h3>
      <div className="box">
        {recommendedUrls.length > 0 ? 
        <div>
          <h3>Recommended Websites:</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <div style={{ width: 150, overflow: "auto" }}>
              {recommendedUrls.map((url, index) => (
                  <p key={index}>
                  <a href={url} target="_blank" rel="noreferrer">
                      {url}
                  </a>
                  </p>
              ))}
            </div>
            <span className="curly-brace">&#123;</span>
            <div style={{ display: "flex", flexDirection: "column", marginLeft:20 }}>
              <p>You can then use <br/> these sites in <br/> your xTension.</p>
            </div>
          </div>
        </div> : 
        <div>
        </div>
        }
      </div>
    </div>

  );
};

export default Home;