const oldReddit = "https://old.reddit.com";
const excludedPaths = [
   "/gallery",
   "/poll",
   "/rpan",
   "/settings",
   "/topics"];
   
   var redirect = true;
   chrome.browserAction.onClicked.addListener(function(tab) {
      redirect = !redirect
      console.log(redirect)
      chrome.browserAction.setIcon({path:"img/" + redirect.toString() + "48.png"})
      chrome.tabs.getSelected(null, function(tab) {
         var code = 'window.location.reload();';
         chrome.tabs.executeScript(tab.id, {code: code});
       });
   });
   
   chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
         if (redirect == true){
            const url = new URL(details.url);
            
            if (url.hostname === "old.reddit.com") return;
            
            for (const path of excludedPaths) {
               if (url.pathname.indexOf(path) === 0) return;
            }
            
            return {redirectUrl: oldReddit + url.pathname + url.search + url.hash};
         }
      },
      {
         urls: [
            "*://reddit.com/*",
            "*://www.reddit.com/*",
            "*://np.reddit.com/*",
            "*://new.reddit.com/*",
            "*://amp.reddit.com/*",
         ],
         types: [
            "main_frame",
            "sub_frame",
            "stylesheet",
            "script",
            "image",
            "object",
            "xmlhttprequest",
            "other"
         ]
      },
      ["blocking"]
      );
      