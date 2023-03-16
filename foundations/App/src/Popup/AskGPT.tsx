import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';
import { OpenAI } from "./OpenAI.js";
// import dotenv from 'dotenv';
import API_KEY from './apikey';

export const AskGPT = () => {
  // dotenv.config();
  // Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable
  const openAI = new OpenAI(API_KEY);
  const model = 'text-davinci-003';

  let {push} = useHistory();
  const [data, setData] = useState('');
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const generatePrompt = (topic) => {
  //   return `Write an blog post about "${topic}", it should in HTML format, include 5 unique points, using informative tone.`
  // };

  // Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model and max token value
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        await openAI.generateText(search, model, 800)
        .then(text => {
            // Logging the generated text to the console
            // In the future, this will be replaced to upload the returned blog text to a WordPress site using the WordPress REST API
            console.log(text);
            setData(data);
            setIsLoading(isLoading);
        })
        .catch(error => {
            console.error(error);
        });
      }
    };
    fetchData();
  }, [search]);

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
                        onClick={() => setSearch(query)}/>
                </form>
                {isLoading ? (
                <div>Loading ...</div>
                ) : (
                <span>
                    {data}
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
