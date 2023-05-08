import { useState } from "react";
import xten from "@xten/xten";
import { urlRecommenderPlugin } from "../@xten/src/plugins/recommender/urlRecommenderPlugin";
import { saveAs } from "file-saver";

const apiKey = "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";
const recommenderPlugin = new urlRecommenderPlugin(apiKey);

function IndexPopup() {
  const [showAIPrompt, setShowAIPrompt] = useState(false);

  // TODO: Add a new popup for custom user plugin
  // user plugin structure:
  // chat gpt plugin call + some sort of data to pupulate the prompt + a method to interact with the plugin = responde and a way of displaying the response
  // chat gpt plugin call = user completion or chat plugin
  // data to populate the prompt = util function that accesses some sort of api to get the data from the browser
  // method to interact with the plugin = a way to send the data to the plugin and get the response back
  // response = the response from the plugin displayed using one of the display components

  const toggleAIPrompt = () => {
    setShowAIPrompt(!showAIPrompt);
  };

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

    // New component for AI prompt popup
  const AIPromptPopup = () => {
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
    };

    const handleSaveChat = () => {
      console.log("Plugin Name:", pluginName, "Prompt:", promptText);
      // Do something with the pluginName and promptText here
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

  const [recommendedUrls, setRecommendedUrls] = useState([]);

  const suggestWebsites = async () => {
    console.log("Suggesting websites...");
    const urls = await recommenderPlugin.recommendUrlsMonth();
    console.log("Printing suggested websites!");
    console.log(urls);
    console.log("Setting suggested websites array");
    const new_arr = urls.split('\n').filter(url => url.trim() !== '');
    console.log("New array of urls:");
    /* drop the first entry in the array, plus delete the first 3 characters of every entry */
    new_arr.forEach((url, index) => {
      new_arr[index] = url.substring(3);
    });
    console.log(new_arr);
    setRecommendedUrls(new_arr);
    console.log("Recommended URLs state after setting:");
    console.log(recommendedUrls);
  };
  

  console.log(xten);
  xten.printMsg();
  return (
    <div>
      {!showAIPrompt ? (
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
          <button onClick={suggestWebsites}>Suggest Websites</button>
          <button onClick={toggleAIPrompt}>Create AI Prompt</button>
          <div>
            {recommendedUrls.map((url, index) => (
              <p key={index}>
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </p>
            ))}
          </div>
        </div>
      ) : (
        <AIPromptPopup />
      )}
    </div>
  );
}

export default IndexPopup;