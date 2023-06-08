import React from 'react';
import './Card.css'
import logo from '../assets/logo.png'
import icon from '../assets/icon.png'

const Card = ({ setScreen }) => {

  const handleClick = (screen) => {
    setScreen(screen);
  };

  return (
    <div className="card">
      <div className="header">
        <div className="logo"></div>
        {/* <h2 className="title">Browser Extension</h2> */}
        <a href="https://cs210.github.io/2023-87Capital/" target="_blank" rel="noopener noreferrer">
          <img src={icon} width={180}></img>
        </a>
      </div>
      <div className="text-section">
        <p><strong>Demo</strong> our features. Create a sample browser extension or utilize one of our examples.</p>
      </div>
      <h3 className="title">Plugins</h3>
      <div className="box">
        <button
            className="try-chatbot"
            // onMouseEnter={() => setIsButtonHovered_4(true)}
            // onMouseLeave={() => setIsButtonHovered_4(false)}
            onClick={()=> {
              handleClick('chatbotSetup');
              // setIsButtonHovered_4(false);
            }}>Try Chatbot</button>
        <button className="add-button" onClick={() => handleClick('pluginCreation')}>+ Add New</button>
      </div>
      <h3 className="title">Console</h3>
      <div className="box">
        </div>
    </div>
    
  );
};

export default Card;