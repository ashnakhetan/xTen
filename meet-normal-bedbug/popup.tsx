import { useState } from "react";
import xten from "@xten/xten";
import { urlRecommenderPlugin } from "../@xten/src/plugins/recommender/urlRecommenderPlugin";
import { saveAs, fileSave } from "file-saver";

const apiKey = "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";
const recommenderPlugin = new urlRecommenderPlugin(apiKey);

function IndexPopup() {
  const [showAIPrompt, setShowAIPrompt] = useState(false);

  const toggleAIPrompt = () => {
    setShowAIPrompt(!showAIPrompt);
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

    const handleSaveChat = () => {
      console.log("Plugin Name:", pluginName, "Prompt:", promptText);
      const fileName = `${pluginName}.txt`;
      const fileContent = `Chat Prompt:\n\n${promptText}`;
      const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
      const file = new File([blob], fileName, { type: "text/plain;charset=utf-8" });

      try {
        await fileSave(file, {
          suggestedName: fileName,
          startIn: "downloads",
        });
        console.log(' File saved!');
      } catch (err) {
        console.log('Error saving file:', err);
      }

    };

    const handleSaveCompletion = () => {
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