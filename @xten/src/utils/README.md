# Utility Functions Documentation

This documentation provides an overview of the utility functions included in the provided code.

## scrapePage(tabs, contentTypes)

This function scrapes a web page and extracts specific elements based on the provided `contentTypes`.

- `tabs`: An array of tabs representing the current browsing session.
- `contentTypes`: A string selector for the types of elements to be extracted.

The function retrieves the HTML content of the current tab's URL, parses it using the DOMParser, and searches for elements that match the given `contentTypes`. It looks for elements with either a `title` attribute or an `alt` attribute and stores them in an array. If no such elements are found, it selects the first element from the matched elements. The function logs the text content or source URL of the selected element and returns it.

## detectHighlightedText(textarea)

This function detects the highlighted text within a textarea element.

- `textarea`: The textarea element from which to extract the highlighted text.

The function retrieves the selected text from the `textarea` by using the `selectionStart` and `selectionEnd` properties of its value. It returns the selected text.

## displayText(text, x, y)

This function displays a tooltip or modal with the given text.

- `text`: The text to be displayed in the tooltip.
- `x` (optional): The X-coordinate position of the tooltip. If not provided, it defaults to the center of the page.
- `y` (optional): The Y-coordinate position of the tooltip. If not provided, it defaults to the center of the page.

The function creates a tooltip element, sets its position, styling, and content based on the input parameters, and appends it to the document body. It also adds an event listener to remove the tooltip when clicking anywhere on the document.

## displayLoading(x, y)

This function displays a loading indicator.

- `x` (optional): The X-coordinate position of the loading indicator. If not provided, it defaults to the center of the page.
- `y` (optional): The Y-coordinate position of the loading indicator. If not provided, it defaults to the center of the page.

The function creates a loading indicator element, sets its position, styling, and content, and appends it to the document body. It removes any existing loading indicators before displaying a new one.

## hideTooltip()

This function hides or removes the currently displayed tooltip or loading indicator.

The function selects the tooltip and loading indicator elements using CSS class selectors and removes them from the document if found.

## collectBrowsingHistoryDay()

This function collects the browsing history for the past 24 hours.

The function uses the `chrome.history.search` API to search for history items within the specified time range. It returns a Promise that resolves to an array of history objects.

## collectBrowsingHistoryWeek()

This function collects the browsing history for the past week.

The function uses the `chrome.history.search` API to search for history items within the specified time range. It returns a Promise that resolves to an array of history objects.

## collectBrowsingHistoryMonth()

This function collects the browsing history for the past month.

The function uses the `chrome.history.search` API to search for history items within the specified time range. It returns a Promise that resolves to an array of history objects.

## collectBrowsingHistoryYear()

This function collects the browsing history for the past year.

The function uses the `chrome.history.search` API to search for history items within the specified time range. It returns a Promise that resolves to an array of history objects.

Note: The `collectBrowsingHistoryDay()`, `collectBrowsingHistoryWeek()`, `collectBrowsingHistoryMonth()`, and `collectBrowsingHistoryYear()` functions are specific to the Google Chrome browser extension environment and rely on the `chrome.history.search` API.
