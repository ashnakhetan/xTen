import { useState, useEffect } from "react";
import React from "react";
import xten from "~/@xten/xten";

 
import { sendToContentScript } from "@plasmohq/messaging"

const InjectionPlugin = ({setScreen}) => {

    // var port = chrome.runtime.connect({name: "knockknock"});
    // port.postMessage({joke: "Knock knock"});
    // port.onMessage.addListener(function(msg) {
    //   if (msg.question === "Who's there?")
    //     port.postMessage({answer: "Madame"});
    //   else if (msg.question === "Madame who?")
    //     port.postMessage({answer: "Madame... Bovary"});
    // });

    function sendMsg(object) {     
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "inject", data: object});
        });
        // sendToContentScript({name: 'ping', body: object});
     
        // chrome.runtime.sendMessage(object);
        // chrome.tabs.query({}, tabs => {
        //         tabs.forEach(tab => {
        //         chrome.tabs.sendMessage(tab.id, object);
        //     });
        // });
    }

    const handleSetScreen = (screen) => {
      setScreen(screen);
      chrome.storage.local.set({ 'screen': screen });
    };

    // get the stored custom plugins by default when the component is loaded
    // Array of loading states for each plugin
    const [customPlugins, setCustomPlugins] = useState([]);
    const [loadingStates, setLoadingStates] = useState([]);

    useEffect(() => {
        console.log("loadingStates updated:", loadingStates);
    }, [loadingStates]);


    const payload = `<span
      style={{
        background: "yellow",
        padding: 12
      }}>
      HELLO WORLD ROOT CONTAINER
    </span>
    `;

  
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 16,
          fontFamily: "monospace",
          minWidth: 400
        }}>
        <h2>Plugin Creation Screen</h2>

        <div>
            <button
              style={{
                marginRight: 8,
                color: "#ffffff",
                padding: "3px 10px",
              }} 
              >           
            </button>
      </div>

      <div>
            <button
                style={{
                    marginRight: 8,
                    color: "#ffffff",
                    padding: "3px 10px",
                }}
                onClick={() => sendMsg({command: "injection", injection: payload})} 
              >
                  YOOOOO           
            </button>
      </div>
    </div>
    );
};

export default InjectionPlugin;