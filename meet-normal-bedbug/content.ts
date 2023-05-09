export {}

// Replace the URL below with the website you want to scrape
// const url = 'https://najm-eddine-zaga.medium.com/18-best-practices-for-react-617e23ed7f2c';

// // Use the fetch() function to get the HTML content of the website
// fetch(url)
//   .then(response => response.text())
//   .then(html => {
//     // Use the DOMParser() to parse the HTML content
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');

//     // Use the querySelectorAll() method to get all elements that might be a title or logo
//     const possibleTitlesAndLogos = doc.querySelectorAll('title, h1, h2, h3, h4, h5, h6, img');

//     // Find the first element that has either a title attribute or an alt attribute
//     let titleOrLogo = null;
//     for (let i = 0; i < possibleTitlesAndLogos.length; i++) {
//       const element = possibleTitlesAndLogos[i];
//       if (element.hasAttribute('title') || element.hasAttribute('alt')) {
//         titleOrLogo = element;
//         break;
//       }
//     }

//     // If no title or logo was found, use the first element as the title or logo
//     if (!titleOrLogo && possibleTitlesAndLogos.length > 0) {
//       titleOrLogo = possibleTitlesAndLogos[0];
//     }

//     // Log the text content or source URL of the title or logo to the console
//     if (titleOrLogo) {
//       if (titleOrLogo.tagName === 'IMG') {
//         console.log(titleOrLogo.src);
//       } else {
//         console.log(titleOrLogo.textContent);
//       }
//     }
//   })
//   .catch(error => console.log(error));

// import {SummarizerPlugin } from '../@xten/src/plugins/summarizer/summarizerPlugin';


// const apiKey = 'Put your API key here';
// const summarizerPlugin = new SummarizerPlugin(apiKey);

// Attach the imported plugin to the page
// summarizerPlugin.attach();

// const apiEndpoint = 'https://api.openai.com/v1/models';

// fetch(apiEndpoint, {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${apiKey}`,
//     'Content-Type': 'application/json'
//   },
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error(`Error during API request: ${response.status}`);
//   }
//   return response.json();
// })
// .then(data => {
//   console.log('Available models:', data);
// })
// .catch(error => {
//   console.error('Error:', error);
// });



