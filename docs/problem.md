    1. iOS Trends to follow: Sideloading
    2. How to leverage sideloading to increase browser extension discoverability
    3. Payments for these apps
    4. Security
    5. Take advantage of the competition period
    6. Apple in iOS 17 could allow third-party browsers to [use their own engines](https://www.macrumors.com/2022/12/14/apple-considering-non-webkit-iphone-browsers/) by eliminating the WebKit requirement

BROWSER EXTENSIONS IN THE DYNAMIC ISLAND

Interactive Widgets
“Recommend an app for me” widget




Pivoting to Discoverability
Create our own marketplace
Arcboost did the marketplace for development mode
Obviously cross-platform
Better Marketing techniques, UI
“Share” feature

Research Organization + Summarization Browser Extension

Questions:
How does Arc market its browser extensions?
ProductHunt but for browser extensions?

What would a better marketplace look like:
“Trial mode” demo before 
“Share” feature
Better recommendation algorithm (how can we assume we will build something better than GOOGLE’s recommendation)

Why don’t people download browser extensions:
They don’t know that they have a problem
They don’t know that a solution exists to it
Also, they don’t trust it. This is something that can see everything they’re doing.

	What if there was a way to identify a problem a user is having and suggest a browser extension for it?

Redefining a browser
Maybe every extension is just automatically downloaded and it is a part of the browser’s functionality and you use it

Things we can utilize:
Chrome APIs track all of your internet behavior


Concerns:


Links:
https://www.browse.ai/how-it-works 
Very cool idea for a browser extension; automatically repeats a data-collection process by watching it once
https://www.alicjasuska.com/product-design/browser-extension 
Highlights a lot of current issues around discoverability
https://github.com/cs210/SlingShot/wiki/
What the other team is doing about research collection + AI-powered something



Scientific researchers
Having multiple sources up at once


Web Develoeprs
Inosect element easily accessible



Mini-feature ideas:
Keyboard for bookmarks
Launching 



Browser for a specific community:
Old people
Students
work

 Backup plan:
	We build AI powered browser whatever the fuck that means and then redesign the extension experience to save face.



FINAL:
Inspo from: https://partytown.builder.io/
Inspo from: https://cohere.ai
Library of use-cases (we want to ship an SDK of use cases)
Adding AI context menu functionality
Content page extraction (imagine scribe or some other shit where it wants to get data from the page you’re own)
That’s crazy I wonder where I got the screenshot below from; guess there’s no way to know.



Scraping
Scrape_data: Scraping data from current web page
Scrape_summarize_data
Extract_user_profile
(With a security focus!)
Injecting
Injecting_ui
Injecting_code
Suggesting
Adding_ai_context
Autocomplete
personalized_suggestions

Examples:
Login/authenticate
Get page stats
AI written content detection?
DOM tree sanitization -> prevent prompt injection
Text summarization
Autocomplete suggestions but better
These are the APIs we can use
https://developer.chrome.com/docs/extensions/reference/
We know what AI can do
GPT

Formula


Browser API + AI = ~Modularized Method~

browsingData + recommendation = What site to go to next


How it works:
Const xTen = 


Overview: 
Create a plugin system: Design your package with a plugin system that allows developers to easily integrate their preferred AI APIs. This can be achieved by defining a clear interface that plugins must implement to work with your package.
Define the API interface: Clearly specify the methods and properties that AI plugins should expose. This will ensure a consistent integration experience for developers regardless of which AI API they use. For example, you might define methods for text analysis, image recognition, and machine learning tasks.
Provide documentation and samples: Create comprehensive documentation on how to develop plugins for your package. Provide sample code for common AI APIs to guide developers in creating their own plugins. Encourage the developer community to contribute plugins for various AI APIs, expanding the package's compatibility.
Build core features with plugin support: Develop the core features of your package (e.g., scraping, injecting code, and personalized suggestions) in a way that leverages the plugin system. This will allow developers to seamlessly integrate their AI API of choice while using your package's functionality.
Ensure compatibility: While implementing the core features, make sure that they work well with different AI APIs by testing them with a variety of plugins. This will help you identify and address any compatibility issues.
Encourage collaboration and contributions: Foster a community around your package that encourages developers to share their plugins, suggest improvements, and report any issues they encounter. This will help your package grow and improve over time.


