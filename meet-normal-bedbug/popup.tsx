import { useState, useEffect } from "react";
import xten from "@xten/xten";

import React from 'react';
import Card from './components/Card';
import PluginCreation from "~PluginCreation";
import ChatbotSetupScreen from "~ChatbotSetupScreen";

const Main: React.FC = () => {
  const [screen, setScreen] = useState("home");

  const handleClick = (page) => {
    setScreen(page);
  };

  return (
    <div className="main-page">
      {/* <h1>Welcome to My Browser Extension</h1> */}
      {screen === 'home' && <Card setScreen={setScreen} />}
      {screen === 'pluginCreation' && <PluginCreation />}
      {screen === 'chatbotSetup' && <ChatbotSetupScreen />}
    </div>
  );
};

export default Main;