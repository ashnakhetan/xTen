import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css'
// import logo from '../assets/logo.png'
import icon from '../assets/icon.png'
import CustomPlugins from './CustomPlugins';
import { dataSources } from '~../@xten/src/plugin_builder_modules/dataSources';
import { scrapeTypes } from '~../@xten/src/plugin_builder_modules/scrapeTypes';
import { aiPrompts } from '~../@xten/src/plugin_builder_modules/aiPrompts';
import { displayMethods } from '~../@xten/src/plugin_builder_modules/displayMethods';

const Home = ({ setScreen }) => {

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
        <p><strong>Demo</strong> our features. Create a sample browser extension or utilize one of our examples.</p>
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
      <div className="box" style={{ display: "flex", flexDirection: "column" }}>
      <button
          className="try-chatbot"
          onMouseEnter={() => setIsButtonHovered_4(true)}
          onMouseLeave={() => setIsButtonHovered_4(false)}
          onClick={() => {
            handleSetScreen('chatbotSetup');
            setIsButtonHovered_4(false);
          }}>Try Chatbot</button>
              </div>
      <div className="box" style={{ display: "flex", flexDirection: "column" }}>
        <CustomPlugins dataSources={dataSources} dataTypes={scrapeTypes} aiPrompts={aiPrompts} displayMethods={displayMethods} />
      </div>
      <h3 className="title">Console</h3>
      <div className="box">
      </div>
    </div>

  );
};

export default Home;