const script = document.createElement("script");
script.src = chrome.runtime.getURL("script.js");
script.onload = function () {
  this.remove();
};

chrome.storage.sync.get("enabled", function ({ enabled }) {
  if (enabled) {
    (document.head || document.documentElement).appendChild(script);
  }
});
