import React from 'react';
import { useState, useEffect } from 'react';

import { urlRecommenderPlugin } from "../@xten/src/plugins/recommender/urlRecommenderPlugin";

const apiKey = "INSERT API KEY HERE";

// Recommender plugin
const recommenderPlugin = new urlRecommenderPlugin(apiKey);

const [recommendedUrls, setRecommendedUrls] = useState([]);
const [loading, setLoading] = useState(false);
const [isButtonHovered_3, setIsButtonHovered_3] = useState(false);

const SuggestWebsites = () => {

    const suggestSites = async () => {
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
    }

    return (
        <div>
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
                suggestSites();
                setIsButtonHovered_3(false);
            }}>{loading? "Loading..." : "Suggest Websites"}
            </button>
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
        </div>
    )
};

export default SuggestWebsites;
