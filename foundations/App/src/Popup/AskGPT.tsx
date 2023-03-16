import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';

export const AskGPT = () => {
    let {push} = useHistory();
    const [data, setData] = useState('');
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          if (search) {
            setIsLoading(true);
            console.log("QUESTION: " + search);
            try {
            const res = await fetch('https://openai-server-xten.herokuapp.com', {
              body: JSON.stringify({
                name: search
              }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            })
            console.log(res.ok);
            console.log(res);
            const data = await res.json();
            console.log("HERE IS YOUR MESSGE A: " + data.message.text);
            setData(data);
            setIsLoading(false);
          }
          catch (error) {
            console.log(error);
          }
        }};
    
        fetchData();
      }, [search]);

    return (
        <div className="App">
            <header className="App-header">
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
