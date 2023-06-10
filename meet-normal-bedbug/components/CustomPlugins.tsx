import React from 'react';
import xten from "@xten/xten";
import { useState, useEffect } from 'react';
import OpenAIPlugin from '~../@xten/src/core/OpenAIPlugin';
import './Home.css'

const apiKey = "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";

// Base chatgpt plugin used for plugin builder
const chatGptPlugin = new OpenAIPlugin(apiKey);

const CustomPlugins = (props) => {

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


    const executeCustomPlugin = async (plugin, index) => {
        console.log(plugin);
  
        // Set the loading state for this plugin to true
        setLoadingStates({ ...loadingStates, [index]: true });
  
        const dataSource = props.dataSources.find(d => d.name === plugin.dataSourceName);
        console.log("Data source:", dataSource);
        const dataType = props.dataTypes.find(d => d.name === plugin.dataTypeName);
        console.log("Data type:", dataType);
        const aiPrompt = props.aiPrompts.find(ai => ai.name === plugin.aiPromptName);
        console.log("AI Prompt:", aiPrompt);
        const displayMethod = props.displayMethods.find(d => d.name === plugin.displayMethodName);
        // execute the data extraction function
        console.log("is it there", dataSource.manual);
        var data = await dataSource.execute(dataType);
        console.log("the data:", data);
        try {
          var requestOutput = await chatGptPlugin.customPrompt(aiPrompt.text, data);
          displayMethod.execute(requestOutput);
        }
        catch (err) {
          console.log(err);
        }
        // After executing the plugin
        console.log("Setting loading state to false");
        console.log("loading states before setting:");
        console.log(loadingStates);
        // After executing the plugin, set the loading state to false
        setLoadingStates({ ...loadingStates, [index]: false });
        console.log("loading states after setting:");
        console.log(loadingStates);
    };
  
    const deleteCustomPlugin = async (index) => {
      // Remove the plugin from the state
      const newCustomPlugins = [...customPlugins];
      newCustomPlugins.splice(index, 1);
      setCustomPlugins(newCustomPlugins);
      // Update the storage
      chrome.storage.local.set({ 'customPlugins': newCustomPlugins });
    };

// return (
//     <div>
//     {/* <h3>Custom Plugins:</h3> */}
//     {customPlugins.map((plugin, index) => (
//     <div
//         key={index}
//         style={{
//         display: "flex",
//         // only align the buttons to the right
//         alignItems: "center",
//         // Place the buttons to the right
//         justifyContent: "space-between",
//         marginBottom: 8
//         }}
//     >
//         <span style={{ marginRight: 8}}>{plugin.name}</span>

//         <button
//         onClick={() => executeCustomPlugin(plugin, index)}
//         // disabled if loadingplugin index is set to true
//         disabled={loadingStates[index]}
//         style={{
//             marginRight: 8,
//             marginLeft: 100,
//             backgroundColor:  loadingStates[index]? "#ccc" : "#ffadad", // Change color if loading
//             color: "#ffffff",
//             padding: "3px 10px",
//             cursor:  loadingStates[index]? "not-allowed" : "pointer" // Change cursor style while loading.
//         }}
//         onMouseEnter={e =>
//             ! loadingStates[index] &&
//             (e.currentTarget.style.backgroundColor = "#f95d6a")
//         }
//         onMouseLeave={e =>
//             !loadingStates[index] &&
//             (e.currentTarget.style.backgroundColor = "#ffadad")
//         }
//     >
//         {loadingStates[index]? "Loading..." : "Execute"} {}
//     </button>

//         <button
//         onClick={() => deleteCustomPlugin(index)}
//         style={{
//             backgroundColor: "#ffadad",
//             color: "#ffffff",
//             padding: "3px 10px",
//             // border: "none",
//             cursor: "pointer"
//         }}
//         onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d43f00")}
//         onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#ffadad")}
//         >
//         Delete
//         </button>
//     </div>
//     ))}
//     </div>
// )
return (
    <div style={{ width: "300px" }}>
      {/* <h3>Custom Plugins:</h3> */}
      {customPlugins.map((plugin, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
            marginLeft:8
          }}
        >
          <span style={{ marginRight: 8 }}>{plugin.name}</span>
  
          <div>
            <button
              onClick={() => executeCustomPlugin(plugin, index)}
              disabled={loadingStates[index]}
              style={{
                marginRight: 8,
                backgroundColor: loadingStates[index] ? "#ccc" : "#f95d6a",
                color: "#ffffff",
                padding: "3px 10px",
                cursor: loadingStates[index] ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) =>
                !loadingStates[index] &&
                (e.currentTarget.style.backgroundColor = "#ffadad")
              }
              onMouseLeave={(e) =>
                !loadingStates[index] &&
                (e.currentTarget.style.backgroundColor = "#f95d6a")
              }
            >
              {loadingStates[index] ? "Loading..." : "Execute"} {}
            </button>
  
            <button
              onClick={() => deleteCustomPlugin(index)}
              style={{
                backgroundColor: "#f95d6a",
                color: "#ffffff",
                padding: "3px 10px",
                // border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ffadad")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f95d6a")
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  
  
}

export default CustomPlugins;