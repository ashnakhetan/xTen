import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';
import { OpenAI } from "./OpenAI.js";
import { Configuration, OpenAIApi } from "openai";
// import dotenv from 'dotenv';
import API_KEY from './apikey';

export const AskGPT = () => {
  // dotenv.config();
  // Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable
  const configuration = new Configuration({
    apiKey: API_KEY,
  });


  const openai = new OpenAIApi(configuration);
  const model = 'text-davinci-003';

  let {push} = useHistory();
  const [data, setData] = useState('');
  const [query, setQuery] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  // const generatePrompt = (topic) => {
  //   return `Write an blog post about "${topic}", it should in HTML format, include 5 unique points, using informative tone.`
  // };

  // Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model and max token value
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (search) {
  //       await openAI.generateText(search, model, 800)
  //       .then(text => {
  //           // Logging the generated text to the console
  //           // In the future, this will be replaced to upload the returned blog text to a WordPress site using the WordPress REST API
  //           console.log(text);
  //           setData(data);
  //           setIsLoading(isLoading);
  //       })
  //       .catch(error => {
  //           console.error(error);
  //       });
  //     }
  //   };
  //   fetchData();
  // }, [search]);

  async function handleSubmit() {
    setIsLoading(true);

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 100,
      });
      setResponse(completion.data.choices[0].text || '');
      setIsLoading(false);
    } catch (e) {
        alert("Error: " + e);
        setIsLoading(false);
    }
  }

    return (
        <div className="App">
            <header id="app-head">
                <p>Ask ChatGPT a question...</p>
                <form>
                    <label>
                        Query:
                        <input type="text" name="name" value={query}
                            onChange={event => setQuery(event.target.value)}/>
                    </label>
                    <input type="submit" value="Submit" 
                        onClick={() => setPrompt(query)}/>
                </form>
                {isLoading ? (
                <div>Loading ...</div>
                ) : (
                <span>
                    {response}
                 </span>
                )}
                <button onClick={() => {
                    push('/')
                }}>Home Page
                </button>
            </header>
        </div>
    )
}
