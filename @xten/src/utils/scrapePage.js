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
        console.log(doc);
        console.log("contentTypes", contentTypes);
  
        // get all elements that might be one of the contentTypes
        // console.log(contentTypes);
        const possibleElements = doc.querySelectorAll(contentTypes);
  
        // Find the first element that has either a title attribute or an alt attribute
        for (let i = 0; i < possibleElements.length; i++) {
          const element = possibleElements[i];
          // console.log(element);
          // console.log(element.hasAttribute('title'));
          if (element.hasAttribute('title') || element.hasAttribute('alt')) {
            // console.log(element, "here");
            listElements.push(element);
            // break;
          }
        }
  
        // If none of the contentTypes are found, use the first element as it
        if (listElements.length == 0 && possibleElements.length > 0) {
          listElements.push(possibleElements[0]);
        }
        // console.log(listElements);
  
        // Log the text content or source URL of the element to the console
        for (i=0; i<listElements.length; i++) {
          if (listElements[i].tagName === 'IMG') {
            // console.log(listElements[i].src);
            // console.log('listElements[0].src', listElements[0].src);
            return listElements[0].src;
          } else {
            // console.log(listElements[i].textContent);
            return listElements[0].textContent;
          }
        }
      })
      .catch(error => console.log(error));
    }