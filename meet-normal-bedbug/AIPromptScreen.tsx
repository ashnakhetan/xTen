import { useState, useEffect } from "react";
import React from "react";
import './PluginCreation.css'
import { aiPrompts as initialAiPrompts} from "../@xten/src/plugin_builder_modules/aiPrompts";

const AIPromptScreen = ({ setScreen }) => {
    const [aiPrompts, setAiPrompts] = useState([]);
    const [promptName, setPromptName] = useState('');
    const [promptText, setPromptText] = useState('');

    useEffect(() => {
      setAiPrompts([ ...initialAiPrompts ]);
    }, []);

    const handleSetScreen = (screen) => {
      setScreen(screen);
      chrome.storage.local.set({ 'screen': screen });
    };

    const handlePluginNameChange = (e) => {
      setPromptName(e.target.value);
    };

    const handlePromptTextChange = (e) => {
      setPromptText(e.target.value)
    }

    const handleSaveCompletion = () => {
      console.log("Prompt Name:", promptName, "Prompt:", promptText);
      const fileName = `${promptName}.js`;

      var curAIPrompt = {
        id: 5,
        name: promptName,
        type: 'aiPrompt',
        description: 'This is a description of the prompt',
        text: promptText
      }
      localStorage.setItem('aiPromptData', JSON.stringify(curAIPrompt));

      // Create the template with the user-defined prompt and plugin name
      // const fileContent = createCompletionPlugin(promptText, pluginName);

      // const blob = new Blob([fileContent], { type: "text/javascript;charset=utf-8" });
      // const file = new File([blob], fileName, { type: "text/javascript;charset=utf-8" });

      /* Add the ai prompt to the list of ai modules plugins following this structure */
      /*
        aiPrompt: {
            id: 1,
            name: 'prompt name',
            type: 'aiPrompt',
            description: 'This is a description of aiPrompt1',
            prompt: 'This is the prompt itself'
        } 
      */

      const newAiPrompt = {
        /* Generate a random id for the plugin to prevent duplicates in the AiPromptList */
        id: Math.floor(Math.random() * 1000000),
        name: promptName,
        type: "aiPrompt",
        description: "This is a description of aiPrompt1",
        text: promptText
      };

      setAiPrompts([...aiPrompts, newAiPrompt]);
  
    };

    const handleSaveChat = () => {
      console.log("Plugin Name:", promptName, "Prompt:", promptText);
      // TODO: Do something with the pluginName and promptText here
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 16,
          minHeight: 400,
          minWidth: 400,
          fontFamily: "monospace"
        }}>
        <h2>Create AI Prompt</h2>
        <input
          style={{ width: "100%", marginBottom: 8, fontFamily: "monospace" }}
          type="text"
          placeholder="Prompt Name"
          value={promptName}
          onChange={handlePluginNameChange}
        />
        <textarea
          style={{ width: "100%", minHeight: 200 , fontFamily: "monospace", marginBottom: 8}}
          placeholder="Prompt Text"
          value={promptText}
          onChange={handlePromptTextChange}
        />
        <button 
        style={{ marginBottom: 8 }}
        onClick={handleSaveChat} 
        disabled={!promptName || !promptText || true}
        >
          Save as Chat Prompt (WIP)
        </button>
        <button
          style={{ marginBottom: 8 }}
          onClick={handleSaveCompletion}
          disabled={!promptName || !promptText}
        >
          Save as Completion Prompt
        </button>
        <button 
        style={{ marginBottom: 8 }}
        onClick={()=> handleSetScreen('pluginCreation')}>Close</button>
      </div>
    );
  };

export default AIPromptScreen;