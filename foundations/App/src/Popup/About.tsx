import React from "react";
import { useHistory } from "react-router-dom";
import './App.css';


export const About = () => {
    let {push} = useHistory();
    return (
        <div className="App">
            <header className="App-header">
                <p>About</p>
                <button onClick={() => {
                    push('/')
                }}>Home page
                </button>
            </header>
        </div>
    )
}