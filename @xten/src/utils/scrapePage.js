export function scrapePage(tabs, contentTypes) {

    const currentTab = tabs[0];
    const url = currentTab.url;
  
    console.log("Current tab URL: ", url);
  
    // gets the HTML content of the website
    fetch(url)
      .then(response => response.text())
      .then(html => {
        // Use the DOMParser() to parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
  
        // get all elements that might be one of the contentTypes
        const possibleTitlesAndLogos = doc.querySelectorAll(contentTypes);
  
        // Find the first element that has either a title attribute or an alt attribute
        let titleOrLogo = null;
        for (let i = 0; i < possibleTitlesAndLogos.length; i++) {
          const element = possibleTitlesAndLogos[i];
          if (element.hasAttribute('title') || element.hasAttribute('alt')) {
            titleOrLogo = element;
            break;
          }
        }
  
        // If no title or logo was found, use the first element as the title or logo
        if (!titleOrLogo && possibleTitlesAndLogos.length > 0) {
          titleOrLogo = possibleTitlesAndLogos[0];
        }
  
        // Log the text content or source URL of the title or logo to the console
        if (titleOrLogo) {
          if (titleOrLogo.tagName === 'IMG') {
            console.log(titleOrLogo.src);
          } else {
            console.log(titleOrLogo.textContent);
          }
        }
      })
      .catch(error => console.log(error));
    }