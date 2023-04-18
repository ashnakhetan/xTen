(()=>{function r(o){try{let e=document.head||document.documentElement,t=document.createElement("script");t.setAttribute("async","false"),t.setAttribute("type","text/javascript"),t.setAttribute("src",o),e.insertBefore(t,e.children[0]),e.removeChild(t)}catch(e){console.error(`Failed to inject script
`,e)}}console.log("content script");r(chrome.runtime.getURL("/build/injected.js"));})();
