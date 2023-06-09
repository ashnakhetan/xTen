import { useState, useEffect } from "react";
import React from "react";
import xten from "@xten/xten";
import { chatBotPlugin } from "../@xten/src/plugins/chatbot/chatbotPlugin.js";

const apiKey = "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";

// Chatbot PLugin
const chatbot = new chatBotPlugin(apiKey);

const ChatbotSetupScreen = ({ setScreen }) => {
    const [loading, setLoading] = useState(false);
    const [personality, setPersonality] = useState('');
    const [startSession, setStartSession] = useState(false);

    const handleClick = (screen) => {
        setScreen(screen);
      };
  
    useEffect(() => {
      const initializeChatbot = async () => {
        if (startSession) {
          try {
            setLoading(true);
            chatbot.setPersonality(personality);
            await chatbot.initializeSession();
          } catch (error) {
            console.error(error);
          } finally {
            handleClick('chat');
            setStartSession(false);
            setLoading(false);
          }
        }
      };
      initializeChatbot();
    }, [startSession]);
  
    const handlePersonalityChange = (e) => {
      setPersonality(e.target.value);
    };
  
    const handleStartChat = () => {
      setStartSession(true);
    };
  
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 16,
          fontFamily: "monospace",
          minWidth: 400
        }}
      >
        <h2>Setup Chatbot</h2>
        <textarea
          style={{ width: "100%", minHeight: 200, marginBottom: 8 }}
          placeholder="Describe the chatbot's personality here (optional)"
          value={personality}
          onChange={handlePersonalityChange}
        />
        <button 
        style={{ marginBottom: 8 }}
        onClick={()=>handleStartChat()}
        disabled={loading}
        >Start Chat</button>
        <button onClick={()=> handleClick('home')}>Close</button>
      </div>
    );
  };

  export default ChatbotSetupScreen;