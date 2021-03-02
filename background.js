function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get("enabled", (data) => {
    if (isEmpty(data)) {
      chrome.storage.sync.set({
        enabled: true,
      });
    }
  });
});
