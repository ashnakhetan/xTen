import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChromeMessage, Sender } from "../types";
import { getCurrentTabUId, getCurrentTabUrl } from "../injected";
import styled from 'styled-components';
import './App.css';

const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;`

export const Home = () => {
    const [url, setUrl] = useState<string>('');
    const [id, setId] = useState<number>();
    const [responseFromContent, setResponseFromContent] = useState<string>('');

    let {push} = useHistory();

    /**
     * Get current URL
     */
    useEffect(() => {
        getCurrentTabUrl((url) => {
            setUrl(url || 'undefined');
        })
    }, []);

    useEffect(() => {
        getCurrentTabUId((id) => {
            setId(id || 0);
            console.log("id: " + id);
        })
    }, []);

    const sendTestMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "Hello from React",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (responseFromContentScript) => {
                    setResponseFromContent(responseFromContentScript);
                    console.log(responseFromContentScript);
                });
        });
    };

    const sendRemoveMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "delete logo",
        }

        // getCurrentTabUId((id) => {
        id && chrome.tabs.sendMessage(
            id,
            message,
            (response) => {
                setResponseFromContent(response);
                console.log(response);
            });
        // });
    };


    return (
        <div style={{width: '300px', height: '400px', color: "white", backgroundColor: "#282c34"}}>
            <header style={{color: "white", backgroundColor: "#282c34", fontSize: "20px", alignItems: "center", justifyContent: "center;"}}>
                <b>Home Page</b>
                <p>URL: {url}</p>
                {/* <p>
                    {url}
                </p> */}
                {/* <Button onClick={sendTestMessage}>Get Page Logo</Button>
                <Button onClick={sendRemoveMessage}>Remove logo</Button>
                <p>Response from content:</p>
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png" alt="logo from page" width="150"></img> */}
                {/* <p>
                    {responseFromContent}
                </p> */}
                <br/>
                <Button onClick={() => {
                    push('/about')
                }}>About page
                </Button>
                <Button onClick={() => {
                    push('/askGPT')
                }}>Ask ChatGPT!
                </Button>
            </header>
        </div>
    )
}