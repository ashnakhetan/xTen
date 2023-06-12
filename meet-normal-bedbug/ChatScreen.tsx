import { useState, useEffect } from "react";
import React from "react";
import { hideTooltip } from "~../@xten/src/utils/display";

import { chatBotPlugin } from "../@xten/src/plugins/chatbot/chatbotPlugin.js";
const apiKey = "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";
// Chatbot PLugin
const chatbot = new chatBotPlugin(apiKey);

const ChatScreen = ({ setScreen }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [startSession, setStartSession] = useState(false);

    const handleSetScreen = (screen) => {
        setScreen(screen);
        chrome.storage.local.set({ 'screen': screen });
    };

    useEffect(() => {
    const initializeChatbot = async () => {
    const personality = chrome.storage.local.get('personality');
        if (startSession) {
        try {
            setLoading(true);
            console.log("this is the personality:", personality);
            chatbot.setPersonality(personality);
            await chatbot.initializeSession();
        } catch (error) {
            console.error(error);
        } finally {
        //   handleSetScreen('chat');
            setStartSession(false);
            setLoading(false);
        }
        }
    };
    initializeChatbot();
    }, [startSession]);
  
    useEffect(() => {
        const initializeChatbot = async () => {
            const personality = chrome.storage.local.get('personality');
                if (startSession) {
                try {
                    setLoading(true);
                    console.log("this is the personality:", personality);
                    chatbot.setPersonality(personality);
                    await chatbot.initializeSession();
                } catch (error) {
                    console.error(error);
                } finally {
                //   handleSetScreen('chat');
                    setStartSession(false);
                    setLoading(false);
                }
                }
            };
            initializeChatbot();
      // Get chat history when the component is loaded
      chrome.storage.local.get('chatHistory', function(result) {
        if (result.chatHistory) {
          setChatHistory(result.chatHistory);
        } else {
          hideTooltip();
          setChatHistory(chatbot.getHistory().slice(1));
        }
        setLoading(false);
      });
    }, []);
  
    useEffect(() => {
      // Store chat history whenever it changes
      chrome.storage.local.set({ 'chatHistory': chatHistory });
    }, [chatHistory]);
  
    const handleUserInputChange = (e) => {
      setUserInput(e.target.value);
    };
  
    const handleSend = async () => {
      setLoading(true);
      try {
        // Add the user's input to the chat history to be displayed locally
        setUserInput('');
        setChatHistory(prevHistory => [...prevHistory, {"role" : "user", "content": userInput}]);
        let response = await chatbot.askQuestion(userInput);
        setChatHistory(prevHistory => [...prevHistory, {"role" : "system", "content": response}]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handeClearChat = async () => {
      // if still waiting for response, wait for it to finish before clearing
      setLoading(true);
      await chatbot.clearHistory();
      setChatHistory([]);
      chrome.storage.local.remove('chatHistory');  // Clear stored chat history
      setLoading(false);
      handleSetScreen('home');
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
        <h2>Chat</h2>
        <div
          style={{
            marginBottom: 16,
            height: 300,
            overflowY: 'scroll',
            border: '1px solid #ddd',
            padding: 8,
            borderRadius: 4
          }}
        >
          {chatHistory.map((chatItem, index) => (
            <div key={index}>
              <b>{chatItem.role}:</b> {chatItem.content}
            </div>
          ))}
        </div>
        <textarea
          style={{ width: "100%", minHeight: 100, marginBottom: 8 }}
          placeholder="Type your message here"
          value={userInput}
          onChange={handleUserInputChange}
        />
        <button 
          style={{ 
            marginBottom: 8,
           
           }}
          onClick={handleSend}
          disabled={loading || !userInput}
        >
          Send
        </button>
        <button 
          style={{ marginBottom: 8 }}
          onClick={()=> handeClearChat()}>Close</button>
      </div>
    )
  }

  export default ChatScreen;