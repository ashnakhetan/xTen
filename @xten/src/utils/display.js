// This function is used to display a tooltip or modal with the given text

export function displayText(text, x, y) {
  console.log(text);
  // Create a tooltip or modal with the summarized text
  /* if no coordinates are provided grab the center of the page */
  if (!x || !y) {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
  }

  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.innerHTML = text;
  tooltip.style.position = 'fixed';
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
  tooltip.style.backgroundColor = 'white';
  tooltip.style.border = '1px solid black';
  tooltip.style.padding = '5px';
  tooltip.style.zIndex = '10000';
  tooltip.style.maxWidth = '300px';
  tooltip.style.boxShadow = '2px 2px 6px rgba(0, 0, 0, 0.25)';
  tooltip.style.borderRadius = '4px';

  // make the tooltip movable as the page is scrolled
  tooltip.style.position = 'absolute';

  // if there is a previous tooltip, remove it
  const previousTooltip = document.querySelector('.tooltip');
  
  if (previousTooltip) {
    previousTooltip.remove();
  }

  // Add any desired styling for the tooltip
  document.body.appendChild(tooltip);


  // Remove the tooltip when clicking anywhere on the document
  document.addEventListener('click', () => {
    tooltip.remove();
  });
}

// This function is used to display a tooltip while the user is awaiting a response from the API

export function displayLoading(x, y) {
  // if no coordinates are provided grab the center of the page
  if (!x || !y) {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
  }
  
  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.innerHTML = 'Loading...';
  loading.style.position = 'fixed';
  loading.style.left = `${x}px`;
  loading.style.top = `${y}px`;
  loading.style.backgroundColor = 'white';
  loading.style.border = '1px solid black';
  loading.style.padding = '5px';
  loading.style.zIndex = '10000';
  loading.style.maxWidth = '300px';
  loading.style.boxShadow = '2px 2px 6px rgba(0, 0, 0, 0.25)';
  loading.style.borderRadius = '4px';
  loading.style.position = 'absolute';

  // if there is a previous loading, remove it
  const previousLoading = document.querySelector('.loading');

  if (previousLoading) {
    previousLoading.remove();
  }
  document.body.appendChild(loading);
}

// function to hide or remove the current tooltip or loading

export function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  const loading = document.querySelector('.loading');

  if (tooltip) {
    tooltip.remove();
  }

  if (loading) {
    loading.remove();
  }
}