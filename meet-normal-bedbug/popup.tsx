import { useState, useEffect } from "react";
import xten from "@xten/xten";
import { urlRecommenderPlugin } from "../@xten/src/plugins/recommender/urlRecommenderPlugin";
import { ScraperPlugin } from "../@xten/src/plugins/scraper/scraperPlugin"
import { scrapePage } from "../@xten/src/utils/scrapePage"
import { saveAs } from "file-saver";
import OpenAIPLugin from "../@xten/src/core/OpenAIPlugin"

// Plugin builder modules, we want to be able to dynamically add to them in the future
import { aiPrompts as initialAiPrompts} from "../@xten/src/plugin_builder_modules/aiPrompts";
import { dataSources as initialDataSources} from "../@xten/src/plugin_builder_modules/dataSources";
import { displayMethods as initialDisplayMethods} from "../@xten/src/plugin_builder_modules/displayMethods";
import { displayLoading } from "~../@xten/src/utils/display";

const apiKey = "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";
const recommenderPlugin = new urlRecommenderPlugin(apiKey);

// Base chatgpt plugin used for plugin builder
const chatGptPlugin = new OpenAIPLugin(apiKey);


const contentTypes = ["title, h1, h2, h3, h4"]

function IndexPopup() {

  /* TODO: Add interface for scrapper plug in */
  const scrapperPlugin = () => {
    const scraperPlug = new ScraperPlugin()
    const listElements = scraperPlug.scrape(contentTypes)
    console.log("list elements: ", listElements)
  }

  const [customPlugins, setCustomPlugins] = useState([]);

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

  /* TODO: Break down popup.tsx into components */

  /* Initialie the modules for the plugin builder */
  const [aiPrompts, setAiPrompts] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [displayMethods, setDisplayMethods] = useState([]);

  // Initialize local copies of modules when the component mounts
  useEffect(() => {
    setAiPrompts([ ...initialAiPrompts ]);
    setDataSources([ ...initialDataSources ]);
    setDisplayMethods([ ...initialDisplayMethods ]);
  }, []);



  const [showAIPrompt, setShowAIPrompt] = useState(false);

  const toggleAIPrompt = () => {
    setShowAIPrompt(!showAIPrompt);
  };
  /*------------------ AI PLugin Creation File Template ------------------*/

  const createCompletionPlugin = (prompt, pluginName) => {
    return `
    // Path: meet-normal-bedbug/src/plugins/${pluginName}.tsx

    import { Configuration, OpenAIApi } from 'openai';

    /* template for completion plugin using user prompts */
    
    export default class OpenAIPLugin {
        constructor(apiKey) {
          this.apiKey = apiKey;
          this.apiEndpoint = 'https://api.openai.com/v1/completions';
          this.configuration = new Configuration({ apiKey });
          this.openai = new OpenAIApi(this.configuration);
        }
    
        async ${pluginName}(text) {
            const prompt = "${prompt}";
            const response = await fetch(this.apiEndpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer \${this.apiKey}',
              },
              body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: prompt,
                temperature: 0.7,
                max_tokens: 500,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 1,
              }),
            });
        
            if (!response.ok) {
              const errorBody = await response.json();
              console.log(errorBody);
              throw new Error('Error during API request: \${response.statusText}');
            }
        
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse.choices[0].text;
          }
        }
    `;
  };
  /*------------------ End of AI PLugin Creation File Template ------------------*/

  /*------------------ AI Prompt Creation Component ------------------*/
  const AIPromptScreen = () => {
    const [pluginName, setPluginName] = useState('');
    const [promptText, setPromptText] = useState('');

    const handlePluginNameChange = (e) => {
      setPluginName(e.target.value);
    };

    const handlePromptTextChange = (e) => {
      setPromptText(e.target.value);
    };

    const handleSaveCompletion = () => {
      console.log("Plugin Name:", pluginName, "Prompt:", promptText);
      const fileName = `${pluginName}.js`;

      // Create the template with the user-defined prompt and plugin name
      const fileContent = createCompletionPlugin(promptText, pluginName);

      const blob = new Blob([fileContent], { type: "text/javascript;charset=utf-8" });
      const file = new File([blob], fileName, { type: "text/javascript;charset=utf-8" });

      saveAs(file);


      /* Add the ai prompt to the list of ai modules plugins following this structure */
      /*
        aiPrompt: {
            id: 1,
            name: 'plugin name',
            type: 'aiPrompt',
            description: 'This is a description of aiPrompt1',
            prompt: 'This is the prompt itself'
        } 
      */

      const newAiPrompt = {
        /* Generate a random id for the plugin to prevent duplicates in the AiPromptList */
        id: Math.floor(Math.random() * 1000000),
        name: pluginName,
        type: "aiPrompt",
        description: "This is a description of aiPrompt1",
        text: promptText
      };

      setAiPrompts([...aiPrompts, newAiPrompt]);
  
    };

    const handleSaveChat = () => {
      console.log("Plugin Name:", pluginName, "Prompt:", promptText);
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
        }}
      >
        <h2>Create AI Prompt</h2>
        <input
          style = {{ width: "100%", marginBottom: 8, fontFamily: "monospace" }}
          type="text"
          placeholder="Plugin Name"
          value={pluginName}
          onChange={handlePluginNameChange}
        />
        <textarea
          style={{ width: "100%", minHeight: 200 }}
          placeholder="Prompt Text"
          value={promptText}
          onChange={handlePromptTextChange}
        />
        <button 
        onClick={handleSaveChat} 
        disabled={!pluginName || !promptText}
        >
          Save as Chat Prompt
        </button>
        <button
          onClick={handleSaveCompletion}
          disabled={!pluginName || !promptText}
        >
          Save as Completion Prompt
        </button>
        <button onClick={toggleAIPrompt}>Close</button>
      </div>
    );
  };
  /*------------------ End of AI Prompt Creation Component ------------------*/

  /*-----------------------WIP: Custom Plug in creation component-----------------------*/
  const [showDropdowns, setShowDropdowns] = useState(false);
  const toggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };

  const DropdownsScreen = () => {
    
    const [pluginName, setPluginName] = useState('');

    const handlePluginNameChange = (e) => {
      setPluginName(e.target.value);
    };

    
    const [selectedData, setSelectedData] = useState("");
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const [selectedDisplay, setSelectedDisplay] = useState("");
    
    // Iterate over the names of the data sources from the dataSources array
    // and display them as options in the dropdown, same for prompts and displays
    const dataOption = Object.values(dataSources).map((source) => source.name);
    const displayOption = Object.values(displayMethods).map((display) => display.name);
    const promptOption = Object.values(aiPrompts).map((prompt) => prompt.name);

    const saveCustomPlugin = () => {
      // Get the selected data source, AI prompt, and display method
      const selectedDataSource = dataSources.find(source => source.name === selectedData);
      const selectedAiPrompt = aiPrompts.find(prompt => prompt.name === selectedPrompt);
      const selectedDisplayMethod = displayMethods.find(display => display.name === selectedDisplay);

      //DEBUG
      console.log('selectedDataSource: ', selectedDataSource);
      console.log('selectedAiPrompt: ', selectedAiPrompt);
      console.log('selectedDisplayMethod: ', selectedDisplayMethod);
    
      // Define a new function that uses these components
      const newPluginExecute = async function () {
        // Execute the data source function and pass its output to the AI prompt function
        const data = await selectedDataSource.execute();
        // We initialize the plugin once, we need to call the customprompt call with the selectedAiPrompt.prompt
        // and the data as the prompt input
        // DEBUG 
        console.log('data: ', data);
        try {
          var requestOutput = await chatGptPlugin.customPrompt(selectedAiPrompt.text, data);
        }
        catch (err) {
          console.log(err);
        }
        // Pass the AI prompt's output to the display method
        selectedDisplayMethod.execute(requestOutput);
      };
    
      const newPlugin = {
        name: pluginName,
        execute: newPluginExecute
      };
    
      setCustomPlugins([...customPlugins, newPlugin]);
    };

  
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        fontFamily: "monospace",
        minWidth: 400
      }}>
        <h2>Plugin Creation Screen</h2>
        <div style={{ 
          marginBottom: 8,
          display: "flex",
          flexDirection: "row"
          }}>
          <select
            value={selectedData}
            onChange={(e) => {
              setSelectedData(e.target.value);
              console.log('New selectedData: ', e.target.value);
            }}
          >
            <option value="">Select a data source ...</option>
            {dataOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span style={{ margin: "0 8px" }}>+</span>
          <select
            value={selectedPrompt}
            onChange={(e) => {
              setSelectedPrompt(e.target.value);
              console.log('New selectedPrompt: ', e.target.value);
            }}
          >
            <option value="">Select an AI query...</option>
            {promptOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span style={{ margin: "0 8px" }}>+</span>
          <select
            value={selectedDisplay}
            onChange={(e) => {
              setSelectedDisplay(e.target.value);
              console.log('New selectedDisplay: ', e.target.value);
            }}
          >
            <option value="">Select a display option...</option>
            {displayOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <h2>Name your Plugin</h2>
        <input
          style = {{ width: "100%", marginBottom: 8, fontFamily: "monospace" }}
          type="text"
          placeholder="Plugin Name"
          value={pluginName}
          onChange={handlePluginNameChange}
        />
        <button 
        style={{ marginBottom: 8 }}
        disabled={!pluginName || !selectedData || !selectedPrompt || !selectedDisplay}
        onClick={saveCustomPlugin}>
          Save Plugin</button>
        <button onClick={toggleDropdowns}>
          Close</button>
      </div>
    );
  };
  /*-----------------------End of Plugin Builder-----------------------*/

  /*-----------------------WIP: Recommend Urls component-----------------------*/
  const [recommendedUrls, setRecommendedUrls] = useState([]);

  const suggestWebsites = async () => {
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
  };


  const executeCustomPlugin = async (plugin) => {
  /* TODO: Replace this with the actual code to execute the plugin and display the response */
    console.log("Executing custom plugin...");
    console.log(plugin);
    plugin.execute();
  };
  
  /*-----------------------Main popup component-----------------------*/
  console.log(xten);
  xten.printMsg();
  return (
    <div>
      {!showAIPrompt && !showDropdowns ?(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 16,
            minHeight: 400,
            minWidth: 400,
            fontFamily: "monospace"
          }}
        >
          <h2>
            Welcome to your{" "}
            <a
              href="https://github.com/cs210/2023-87Capital/wiki"
              target="_blank"
            >
              xTen
            </a>
            sion!
          </h2>
          <button 
          style={{ marginBottom: 8 }}
          onClick={toggleAIPrompt}>Create AI Prompt</button>
          
          <button 
          style={{ marginBottom: 8 }}
          onClick={toggleDropdowns}>Plugin Creation Screen</button>
          
          <button 
          style={{ marginBottom: 8 }}
          onClick={suggestWebsites}>Suggest Websites</button>
          <div>
            <h3>Recommended Websites:</h3>
            {recommendedUrls.map((url, index) => (
              <p key={index}>
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </p>
            ))}
          </div>

          <div>
            <h3>Custom Plugins:</h3>
            {customPlugins.map((plugin, index) => (
              <div key={index}>
                <button 
                style={{ marginBottom: 8 }}
                onClick={() => executeCustomPlugin(plugin)}>
                  {plugin.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : showDropdowns ? (
        <DropdownsScreen />
      ) : (
        <AIPromptScreen />
      )}
    </div>
  );
}

export default IndexPopup;