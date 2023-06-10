import { useState, useEffect } from "react";
// import xten from "@xten/xten";
import { urlRecommenderPlugin } from "../@xten/src/plugins/recommender/urlRecommenderPlugin";
import { ScraperPlugin } from "../@xten/src/plugins/scraper/scraperPlugin"
import { scrapePage } from "../@xten/src/utils/scrapePage"
import { saveAs } from "file-saver";
import OpenAIPLugin from "../@xten/src/core/OpenAIPlugin";
import { SummarizerPlugin } from "../@xten/src/plugins/summarizer/summarizerPlugin";

// Plugin builder modules, we want to be able to dynamically add to them in the future
import { aiPrompts as initialAiPrompts} from "../@xten/src/plugin_builder_modules/aiPrompts";
import { dataSources as initialDataSources} from "../@xten/src/plugin_builder_modules/dataSources";
import { displayMethods as initialDisplayMethods} from "../@xten/src/plugin_builder_modules/displayMethods";
import { displayLoading } from "~../@xten/src/utils/display";
import { hideTooltip } from "~../@xten/src/utils/display";

// Chatbot plugin
import { ChatBotPlugin } from "../@xten/src/plugins/chatbot/chatbotPlugin.js";

const apiKey = "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";

// Base chatgpt plugin used for plugin builder
const chatGptPlugin = new OpenAIPLugin(apiKey);

// Recommender plugin
const recommenderPlugin = new urlRecommenderPlugin(apiKey);

// Chatbot PLugin
const chatbot = new ChatBotPlugin(apiKey);

// Wellness bot
const wellnessBot = new ChatBotPlugin(apiKey, "You are a digital assistant trying to help users better manage their relationship with technology and overall screen time and screen usage");

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
  const [isButtonHovered_5, setIsButtonHovered_5] = useState(false);


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
        // Check if empty
        if (result.customPlugins.length > 0) {
          const parsedPlugins = JSON.parse(result.customPlugins);
          console.log("parsed plugins: ", parsedPlugins);
          setCustomPlugins(parsedPlugins);
          // Initialize the loading states
          const initialLoadingStates = parsedPlugins.map(() => {
            return false;
          });
          setLoadingStates(initialLoadingStates);
        }
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
            chrome.storage.local.set({ 'chatHistory': chatbot.getHistory() });
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
          console.log('Chat History from storage:', result.chatHistory); // Add this line
          if (result.chatHistory) {
              setChatHistory(result.chatHistory);
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
        setChatHistory(chatbot.getHistory());
        let response = await chatbot.askQuestion(userInput);
        setChatHistory(chatbot.getHistory());
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleClearChat = async () => {
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
          }} >
          {chatHistory.map((chatItem, index) => {
              console.log('Chat item:', chatItem);
              return chatItem.role !== 'system' ? (
                  <div key={index}>
                      <b>{chatItem.role}:</b> {chatItem.content}
                  </div>
              ) : null;
          })}
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
          onClick={()=> handleClearChat()}>Close</button>
      </div>
    )
  }

  /*-----------------------End of Chat Bot Plugin -----------------------*/

  /*-----------------------WIP: Wellness Bot Testing background scripts -----------------------*/

  const WellnessBotSetupScreen = () => {
    const [loading, setLoading] = useState(false);
    const [personality, setPersonality] = useState('');
    const [startChat, setStartChat] = useState(false);

      useEffect(() => {
          const initializeChatbot = async () => {
              if (startChat) {
                  try {
                      setLoading(true);
                      wellnessBot.setPersonality(personality);
                      wellnessBot.setContext("You are a wellness assistant dedicated to help users enjoy a better relationship with technology. The user will give you a personality of their choosing but you can name yourself.")
                      await wellnessBot.initializeSession();
                  } catch (error) {
                      console.error(error);
                  } finally {
                      // Update the chrome storage to reflect the new chat history
                      chrome.storage.local.set({ 'sessionHistory': wellnessBot.getHistory() });
                      handleSetScreen('wellnessBotScreen');
                      setStartChat(false);
                      setLoading(false);
                  }
              }
          };
          initializeChatbot();
      }, [startChat]);

      const handlePersonalityChange = (e) => {
          setPersonality(e.target.value);
      };

      const handleStartChat = () => {
        setStartChat(true);
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
                  onClick={handleStartChat}
                  disabled={loading}
              >
                  Start Chat
              </button>
              <button onClick={() => handleSetScreen('home')}>Close</button>
          </div>
      );
  };

  const WellnessBotScreen = () => {
    const [sessionHistory, setSessionHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [wellnessMode, setWellnessMode] = useState(false);
    const [checkInInterval, setCheckInInterval] = useState('');
    const [customSiteCounter, setCustomSiteCounter] = useState(1);
    const [customSite, setCustomSite] = useState('');

    // Declare a domain object with the site name as key, then the url and time spent on the site as values
    
    const [availableSites, setAvailableSites] = useState([
      { name: "YouTube", url: "youtube.com", timeSpent: null },
      { name: "Netflix", url: "netflix.com", timeSpent: null },
      { name: "Facebook", url: "facebook.com", timeSpent: null },
      { name: "Twitter", url: "twitter.com", timeSpent: null },
      { name: "Instagram", url: "instagram.com", timeSpent: null },
      { name: "Twitch", url: "twitch.tv", timeSpent: null },
      { name: "Wikipedia", url: "wikipedia.org", timeSpent: null }
    ]);

    const [selectedSites, setSelectedSites] = useState([]);

    useEffect(() => {
      chrome.runtime.sendMessage({ command: 'popup_open' });
      // This function is the listener for messages from the background script
      const messageListener = async (request, sender, sendResponse) => {
        if (request.command === 'update_sites') {
          console.log("Received message from background script:");
          let updatedSelectedSites = request.selectedSites;
          let updatedChatbotHistory = request.chatbotHistory;

          setSelectedSites(updatedSelectedSites);
          wellnessBot.setHistory(updatedChatbotHistory);
        }
      };
      // Register the listener
      chrome.runtime.onMessage.addListener(messageListener);
    
      // Return a cleanup function that will be called when the component unmounts
      return () => {
        // Remove the listener when the component unmounts to avoid memory leaks
        chrome.runtime.onMessage.removeListener(messageListener);
        // Notify the background script that the popup is closed
        chrome.runtime.sendMessage({ command: 'popup_closed' });
      };
    
    }, []); // Empty dependency array ensures this runs once on mount

  
    useEffect(() => {
      // Get chat history when the component is loaded
      chrome.storage.local.get('sessionHistory', function(result) {
        if (result.sessionHistory) {
          setSessionHistory(result.sessionHistory);
        }
        setLoading(false);
      });
      // Get the site information from the background script
      chrome.storage.local.get('availableSites', function(result) {
        if (result.selectedSites) {
          setSelectedSites(result.selectedSites);
        }
      });

      chrome.storage.local.get('selectedSites', function(result) {
        if (result.selectedSites) {
          setSelectedSites(result.selectedSites);
        }
      });
      chrome.storage.local.get('wellnessMode', function(result) {
        if (result.wellnessMode) {
          setWellnessMode(result.wellnessMode);
        }
      });

      // Listen for changes to the timeSpent data
      chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let key in changes) {
            if (key === 'timeSpent') {
                // Update the state with the new timeSpent data
                setSelectedSites(changes[key].newValue);
            }
        }
    });
    }, []);

    useEffect(() => {
      // This will run every time selectedSites changes
      chrome.storage.local.set({ 'selectedSites': selectedSites });
    }, [selectedSites]); 

  
    useEffect(() => {
      // Store chat history whenever it changes
      chrome.storage.local.set({ 'sessionHistory' : sessionHistory });
    }, [sessionHistory]);

    useEffect(() => {
      // This will run every time the wellnessMode changes
      chrome.storage.local.set({ 'wellnessMode': wellnessMode });
    }, [wellnessMode]);
  
    const handleUserInputChange = (e) => {
      setUserInput(e.target.value);
    };
  
    const handleSend = async () => {
      setLoading(true);
      try {
        // Add the user's input to the chat history to be displayed locally
        setUserInput('');
        setSessionHistory(wellnessBot.getHistory());
        let response = await wellnessBot.askQuestion(userInput);
        setSessionHistory(wellnessBot.getHistory());
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const handleClearChat = async () => {
      // if still waiting for response, wait for it to finish before clearing
      setLoading(true);
      await wellnessBot.clearHistory();
      setSessionHistory([]);
      chrome.storage.local.remove('sessionHistory');  // Clear stored chat history
      setLoading(false);
    };
  
    const handleStartSession = () => {
      setWellnessMode(true);
      console.log("Starting Session");

      let history = wellnessBot.getHistory();
      
      chrome.runtime.sendMessage({ command: 'start_tracking', selectedSites, checkInInterval, history});
      setWellnessMode(true);
      setCheckInInterval(checkInInterval);
      setSelectedSites(selectedSites);
      chrome.storage.local.set({'wellnessMode': 'true'});
      chrome.storage.local.set({'selectedSites': selectedSites});
      chrome.storage.local.set({'checkInInterval': checkInInterval});

    };
  
    
    const handleEndSession = () => {
      setWellnessMode(false);
      console.log("Ending Session");
      // Communicate with the background script here
      setSelectedSites([]);
      setCheckInInterval('');
      setWellnessMode(false);
      chrome.runtime.sendMessage({ command: 'stop_tracking' });
      chrome.storage.local.set({'wellnessMode': 'false'});
      chrome.storage.local.remove("selectedSites");
      chrome.storage.local.remove("checkInInterval");
      // End the session in the background script
    };
  
    const handleRestart = () => {
      // Clear the chat history and start a new session
      handleClearChat();
      handleEndSession();
      handleStartSession();
    };
  
    const handleIntervalChange = (e) => {
      setCheckInInterval(e.target.value);
    };
  
    const handleCheckboxChange = (e, index) => {
      const isChecked = e.target.checked;
      setAvailableSites(prevAvailableSites => {
        const updatedSites = [...prevAvailableSites];
        updatedSites[index].timeSpent = isChecked ? 0 : null;
        return updatedSites;
      });
  
      setSelectedSites(prevSelectedSites => {
        const updatedSelectedSites = [...prevSelectedSites];
        if (isChecked) {
          // Add the site to selectedSites
          updatedSelectedSites.push(availableSites[index]);
        } else {
          // Remove the site from selectedSites
          const siteIndex = updatedSelectedSites.findIndex(
            site => site.name === availableSites[index].name
          );
          if (siteIndex > -1) {
            updatedSelectedSites.splice(siteIndex, 1);
          }
        }
        return updatedSelectedSites;
      });
    };


      const handleAddCustomSite = () => {
        if (customSite) {
          setAvailableSites(prevAvailableSites => {
            const updatedSites = [...prevAvailableSites];
            updatedSites.push({ name: `Custom Site ${customSiteCounter}`, url: customSite, timeSpent: 0 });
            return updatedSites;
          });
          setCustomSite('');
          setCustomSiteCounter(customSiteCounter + 1);
          chrome.storage.local.set({ 'availableSites': availableSites });
        }
      };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          fontFamily: 'monospace',
          minWidth: 400,
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
            borderRadius: 4,
          }}
        >
        {sessionHistory.map((chatItem, index) => (
          chatItem.role !== 'system' ? (
            <div key={index}>
              <b>{chatItem.role}:</b> {chatItem.content}
            </div>
          ) : null
        ))}
        </div>
        <textarea
          style={{ width: '100%', minHeight: 100, marginBottom: 8 }}
          placeholder="Type your message here"
          value={userInput}
          onChange={handleUserInputChange}
        />
        <button
          style={{ marginBottom: 8 }}
          onClick={handleSend}
          disabled={loading || !userInput}
        >
          Send
        </button>
        <button style={{ marginBottom: 8 }} onClick={handleClearChat}>
          Clear Chat
        </button>

              {!wellnessMode && (
            <>
              <div style={{ marginBottom: 8 }}>
                <p>Select websites you want to track:</p>
                {availableSites.map((site, index) => (
                  <label key={index} style={{ display: 'block' }}>
                    <input
                      type="checkbox"
                      checked={site.timeSpent !== null}
                      onChange={(e) => handleCheckboxChange(e, index)}
                    />
                    {site.name}
                  </label>
                ))}
              </div>

              <div style={{ marginBottom: 8 }}>
                <input
                  type="text"
                  placeholder="Enter the url of a website you want to track"
                  value={customSite}
                  onChange={(e) => setCustomSite(e.target.value)}
                  style={{ marginRight: 8, width: '65%' }}
                />
                <button onClick={handleAddCustomSite}>Add Custom Site</button>
              </div>
              <select
                value={checkInInterval}
                onChange={handleIntervalChange}
                style={{ marginBottom: 8 }}
              >
                <option value="">Select Check-in Interval</option>
                <option value=".16">10 seconds (demo)</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="20">20 minutes</option>
              </select>
            </>
          )}
              <div style={{ marginBottom: 8 }}>
                <p>Selected websites:</p>
                <ul>
                  {selectedSites.filter(site => site.timeSpent !== null).map((site, index) => (
                    <li key={index}>
                      {site.name} ({site.url}) - {site.timeSpent} minutes
                    </li>
                  ))}
                </ul>
              </div>
          {!wellnessMode ? (
            <button 
              disabled={selectedSites.length === 0 || !checkInInterval}
              onClick={handleStartSession}
              style={{ marginBottom: 8 }}
            >
              Start Session
            </button>
          ) : (
            <>
              <button onClick={handleEndSession} style={{ marginBottom: 8 }}>
                End Session
              </button>
              <button onClick={handleRestart} style={{ marginBottom: 8 }}>
                Restart
              </button>
            </>
          )}
                  <button onClick={() => handleSetScreen('home')}>Close</button>
      </div>
    );
  };


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

          <button
          style={{ 
            marginBottom: 8,
            padding: "3px 10px",
            backgroundColor: isButtonHovered_5 ? "#f95d6a" : "#ffadad", // change color on hover
            color: "#ffffff" // White color for the text
          }}
          onMouseEnter={() => setIsButtonHovered_5(true)}
          onMouseLeave={() => setIsButtonHovered_5(false)}
          onClick={()=> {
            handleSetScreen('wellnessBotSetup');
            setIsButtonHovered_5(false);
          }}>Wellness Bot</button>
          

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
      {screen === 'wellnessBotSetup' && <WellnessBotSetupScreen />}
      {screen === 'wellnessBotScreen' && <WellnessBotScreen />}
    </div>
  )
}

export default IndexPopup
