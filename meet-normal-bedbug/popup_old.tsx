import { useState, useEffect } from "react";
import React from "react";
// import xten from "@xten/xten";
import { urlRecommenderPlugin } from "../@xten/src/plugins/recommender/urlRecommenderPlugin";
import { ScraperPlugin } from "../@xten/src/plugins/scraper/scraperPlugin"
import { scrapePage } from "../@xten/src/utils/scrapePage"
import { saveAs } from "file-saver";
import OpenAIPLugin from "../@xten/src/core/OpenAIPlugin"
import { SummarizerPlugin } from "../@xten/src/plugins/summarizer/summarizerPlugin";

// Plugin builder modules, we want to be able to dynamically add to them in the future
import { aiPrompts as initialAiPrompts} from "../@xten/src/plugin_builder_modules/aiPrompts";
import { dataSources as initialDataSources} from "../@xten/src/plugin_builder_modules/dataSources";
import { displayMethods as initialDisplayMethods} from "../@xten/src/plugin_builder_modules/displayMethods";
import { displayLoading } from "~../@xten/src/utils/display";
import { hideTooltip } from "~../@xten/src/utils/display";

// Chatbot plugin
import { chatBotPlugin } from "../@xten/src/plugins/chatbot/chatbotPlugin.js";

const apiKey = "INSERT API KEY HERE";

// Base chatgpt plugin used for plugin builder
const chatGptPlugin = new OpenAIPLugin(apiKey);

// Recommender plugin
const recommenderPlugin = new urlRecommenderPlugin(apiKey);

// Chatbot PLugin
const chatbot = new chatBotPlugin(apiKey);

// Summarizer plugin
let summarizerPlugin = new SummarizerPlugin(apiKey, true);


const contentTypes = ["title, h1, h2, h3, h4"]

function IndexPopup() {

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
  // Main screen state
  const [screen, setScreen] = useState("home");
  // Main screen buttons
  // State to handle button hover
  const [isButtonHovered_1, setIsButtonHovered_1] = useState(false);
  const [isButtonHovered_2, setIsButtonHovered_2] = useState(false);
  const [isButtonHovered_3, setIsButtonHovered_3] = useState(false);
  const [isButtonHovered_4, setIsButtonHovered_4] = useState(false);


  useEffect(() => {
    // Get the stored screen when the component is loaded
    chrome.storage.local.get('screen', function(result) {
      if (result.screen) {
        setScreen(result.screen);
      }
    });
  }, []);

  // Set the screen in local storage when it changes

  const handleSetScreen = (screen) => {
    setScreen(screen);
    chrome.storage.local.set({ 'screen': screen });
  };

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
  /* TODO: Add interface for scrapper plug in */
  const scrapperPlugin = () => {
    const scraperPlug = new ScraperPlugin()
    const listElements = scraperPlug.scrape(contentTypes)
    console.log("list elements: ", listElements)
  }

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

  /*------------------ AI Prompt Creation Component ------------------*/
  const AIPromptScreen = () => {
    const [promptName, setPromptName] = useState('');
    const [promptText, setPromptText] = useState('');

    const handlePluginNameChange = (e) => {
      setPromptName(e.target.value);
    };

    const handlePromptTextChange = (e) => {
      setPromptText(e.target.value)
    }

    const handleSaveCompletion = () => {
      console.log("Prompt Name:", promptName, "Prompt:", promptText);
      const fileName = `${promptName}.js`;

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
        onClick={()=> handleSetScreen('home')}>Close</button>
      </div>
    );
  };
  /*------------------ End of AI Prompt Creation Component ------------------*/

  /*-----------------------WIP: Custom Plug in creation component-----------------------*/

  const DropdownsScreen = () => {
    const [pluginName, setPluginName] = useState("")

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
      // Get the names of the selected data source, prompt, and display method
      const selectedDataSource = dataSources.find((source) => source.name === selectedData);
      const selectedAiPrompt = aiPrompts.find((prompt) => prompt.name === selectedPrompt);
      const selectedDisplayMethod = displayMethods.find((display) => display.name === selectedDisplay);
      
      const newPlugin = {
        name: pluginName,
        dataSourceName : selectedDataSource.name,
        aiPromptName: selectedAiPrompt.name,
        displayMethodName: selectedDisplayMethod.name,
        loading: false
      };

      // Update the state with the new plugin
      console.log("previous custom plugins: ", customPlugins);
      const updatedCustomPlugins = [...customPlugins, newPlugin];
      console.log("updated custom plugins: ", updatedCustomPlugins);
      setCustomPlugins(updatedCustomPlugins);
      // Store the updated list in local storage
      chrome.storage.local.set({ customPlugins: JSON.stringify(updatedCustomPlugins) });
    };
    

  
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
          style={{ width: "100%", marginBottom: 8, fontFamily: "monospace" }}
          type="text"
          placeholder="Plugin Name"
          value={pluginName}
          onChange={handlePluginNameChange}
        />
        <button 
        style={{ marginBottom: 8 }}
        disabled={!pluginName || !selectedData || !selectedPrompt || !selectedDisplay}
        onClick={saveCustomPlugin}>Save Plugin
        </button>
        <button onClick={() =>handleSetScreen('home')}>Close</button>
      </div>
    );
  };
  /*-----------------------End of Plugin Builder-----------------------*/

  /*-----------------------WIP: Chat Bot Plugin -----------------------*/

  const ChatbotSetupScreen = () => {
    const [loading, setLoading] = useState(false);
    const [personality, setPersonality] = useState('');
    const [startSession, setStartSession] = useState(false);
  
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
            handleSetScreen('chat');
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
        <button onClick={()=> handleSetScreen('home')}>Close</button>
      </div>
    );
  };

  const ChatScreen = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
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

  /*-----------------------End of Chat Bot Plugin -----------------------*/

  /*-----------------------WIP: Recommend Urls component-----------------------*/
  const [recommendedUrls, setRecommendedUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const suggestWebsites = async () => {
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
  };

  const executeCustomPlugin = async (plugin, index) => {
      console.log(plugin);

      // Set the loading state for this plugin to true
      setLoadingStates({ ...loadingStates, [index]: true });

      const dataSource = dataSources.find(d => d.name === plugin.dataSourceName);
      console.log("Data source:");
      console.log(dataSource);
      const aiPrompt = aiPrompts.find(ai => ai.name === plugin.aiPromptName);
      console.log("AI Prompt:");
      console.log(aiPrompt);
      const displayMethod = displayMethods.find(d => d.name === plugin.displayMethodName);
      // execute the data extraction function
      const data = await dataSource.execute();
      console.log("the data:",data);
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
  
  /*-----------------------Main popup component-----------------------*/

  // console.log(xten);
  return (
    <div>
      {screen === 'home' && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 16,
            minHeight: 400,
            minWidth: 400,
            fontFamily: "monospace",
            backgroundColor: "#faf0f0" // light Carnation color for the background
          }}
        >
          <h2>
            Welcome to your{" "}
            <a
              href="https://cs210.github.io/2023-87Capital/"
              target="_blank"
              style={{color: "#f95d6a"}} // Carnation color for the hyperlink
            >
              xTen
            </a>
            sion!
          </h2>
          <button 
          style={{ 
            marginBottom: 8,
            padding: "3px 10px",
            backgroundColor: isButtonHovered_1 ? "#f95d6a" : "#ffadad", // change color on hover
            color: "#ffffff" // White color for the text
          }}
          onMouseEnter={() => setIsButtonHovered_1(true)}
          onMouseLeave={() => setIsButtonHovered_1(false)}
          onClick={()=> {
            setIsButtonHovered_1(false);
            handleSetScreen('aiPrompt');
          }}
          >
          Create AI Prompt
        </button>
          
          <button 
          style={{ 
            marginBottom: 8,
            padding: "3px 10px",
            backgroundColor: isButtonHovered_2 ? "#f95d6a" : "#ffadad", // change color on hover
            color: "#ffffff" // White color for the text
          }}
          onMouseEnter={() => setIsButtonHovered_2(true)}
          onMouseLeave={() => setIsButtonHovered_2(false)}
          onClick={()=> {
            setIsButtonHovered_2(false);
            handleSetScreen('dropdowns');
          }}>
            Plugin Creation Screen</button>
          
          <button 
          style={{ 
            marginBottom: 8,
            padding: "3px 10px",
            backgroundColor: isButtonHovered_3 ? "#f95d6a" : "#ffadad", // change color on hover
            color: "#ffffff" // White color for the text
          }}
          onMouseEnter={() => setIsButtonHovered_3(true)}
          onMouseLeave={() => setIsButtonHovered_3(false)}
          disabled={loading}
          onClick={()=> {
            suggestWebsites();
            setIsButtonHovered_3(false);
          }}>{loading? "Loading..." : "Suggest Websites"}</button>

          <button
          style={{ 
            marginBottom: 8,
            padding: "3px 10px",
            backgroundColor: isButtonHovered_4 ? "#f95d6a" : "#ffadad", // change color on hover
            color: "#ffffff" // White color for the text
          }}
          onMouseEnter={() => setIsButtonHovered_4(true)}
          onMouseLeave={() => setIsButtonHovered_4(false)}
          onClick={()=> {
            handleSetScreen('chatbotSetup');
            setIsButtonHovered_4(false);
          }}>Try Chatbot</button>

          <div>
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
            <div
              key={index}
              style={{
                display: "flex",
                // only align the buttons to the right
                alignItems: "center",
                // Place the buttons to the right
                justifyContent: "space-between",
                marginBottom: 8
              }}
            >
              <span style={{ marginRight: 8}}>{plugin.name}</span>

              <button
                onClick={() => executeCustomPlugin(plugin, index)}
                // disabled if loadingplugin index is set to true
                disabled={loadingStates[index]}
                style={{
                    marginRight: 8,
                    marginLeft: 250,
                    backgroundColor:  loadingStates[index]? "#ccc" : "#ffadad", // Change color if loading
                    color: "#ffffff",
                    padding: "3px 10px",
                    cursor:  loadingStates[index]? "not-allowed" : "pointer" // Change cursor style while loading.
                }}
                onMouseEnter={e =>
                    ! loadingStates[index] &&
                    (e.currentTarget.style.backgroundColor = "#f95d6a")
                }
                onMouseLeave={e =>
                    !loadingStates[index] &&
                    (e.currentTarget.style.backgroundColor = "#ffadad")
                }
            >
                {loadingStates[index]? "Loading..." : "Execute"} {}
            </button>

              <button
                onClick={() => deleteCustomPlugin(index)}
                style={{
                  backgroundColor: "#ffadad",
                  color: "#ffffff",
                  padding: "3px 10px",
                  // border: "none",
                  cursor: "pointer"
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d43f00")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#ffadad")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>


          <div
          style={{
            marginTop: 24,
            paddingTop: 24,
            borderTop: '1px solid #ddd'
          }}
          >
          <button
            style={{
              backgroundColor: '#f8f9fa',
              padding: 10,
              borderRadius: 5,
              border: '1px solid #ccc',
              cursor: 'pointer',
              textAlign: 'center',
              width: '100%',
              fontWeight: 'bold',
              color: '#007BFF'
            }}
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeUwu4YyApqiRREobOfti3-TrZRxrxfuNSZ9fSgI0YWZdJ8Qg/viewform?usp=sf_link', '_blank')}
          >
            We value your feedback!
          </button>
        </div>

        </div>
      )}
      {screen === 'dropdowns' && <DropdownsScreen />}
      {screen === 'aiPrompt' && <AIPromptScreen />}
      {screen === 'chatbotSetup' && <ChatbotSetupScreen />}
      {screen === 'chat' && <ChatScreen />}
    </div>
  )
}

export default IndexPopup
