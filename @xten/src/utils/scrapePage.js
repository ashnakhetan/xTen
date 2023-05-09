export function scrapePage(tabs, contentTypes) {

    const currentTab = tabs[0];
    const url = currentTab.url;
  
    console.log("Current tab URL: ", url);
    let listElements = new Array();
  
    // gets the HTML content of the website
    fetch(url)
      .then(response => response.text())
      .then(html => {
        // Use the DOMParser() to parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
  
        // get all elements that might be one of the contentTypes
        const possibleElements = doc.querySelectorAll(contentTypes);
  
        // Find the first element that has either a title attribute or an alt attribute
        // let titleOrLogo = null;
        for (let i = 0; i < possibleElements.length; i++) {
          const element = possibleElements[i];
          console.log(element);
          console.log(element.hasAttribute('title'));
          if (element.hasAttribute('title') || element.hasAttribute('alt')) {
            console.log(element, "here");
            listElements.push(element);
            // break;
          }
        }
  
        // If no title or logo was found, use the first element as the title or logo
        if (listElements.length == 0 && possibleElements.length > 0) {
          listElements.push(possibleElements[0]);
        }
        console.log(listElements);
  
        // Log the text content or source URL of the title or logo to the console
        for (i=0; i<listElements.length; i++) {
          if (listElements[i].tagName === 'IMG') {
            console.log(listElements[i].src);
          } else {
            console.log(listElements[i].textContent);
          }
        }
      })
      .catch(error => console.log(error));

    return listElements;
    }