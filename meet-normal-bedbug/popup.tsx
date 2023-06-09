import { useState, useEffect } from "react";
import xten from "@xten/xten";

import React from 'react';
import Home from './components/Home'
import PluginCreation from "~PluginCreation";
import ChatbotSetupScreen from "~ChatbotSetupScreen";
import './popup.css'

const Main: React.FC = () => {
  const [screen, setScreen] = useState("home");

//   const handleClick = (page) => {
//     setScreen(page);
//   };

  return (
    <div className="main-page">
      {/* <h1>Welcome to My Browser Extension</h1> */}
      {screen === 'home' && <Home setScreen={setScreen} />}
      {screen === 'pluginCreation' && <PluginCreation setScreen={setScreen}/>}
      {screen === 'chatbotSetup' && <ChatbotSetupScreen setScreen={setScreen}/>}
    </div>
  );
};

export default Main;