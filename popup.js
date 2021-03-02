let contents = document.getElementById("contents");
let nonKlms = document.getElementById("non-klms");
let warning = document.getElementById("warning");
let button = document.getElementById("button");
let openKlmsWebpage = document.getElementById("open-klms-webpage");

let isEnabled = false;

chrome.storage.sync.get("enabled", function ({ enabled }) {
  isEnabled = enabled;
  if (enabled) {
    button.classList.add("enabled");
  } else {
    button.classList.remove("enabled");
  }
});

button.addEventListener("click", () => {
  isEnabled = !isEnabled;
  if (isEnabled) {
    button.classList.add("enabled");
    chrome.storage.sync.set({ enabled: true });
  } else {
    button.classList.remove("enabled");
    chrome.storage.sync.set({ enabled: false });
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  try {
    if (tabs[0].url.includes("chrome://") || tabs[0].url.includes("edge://")) {
      throw new Error("");
    }
    contents.style.display = tabs[0].url.includes("//klms.kaist.ac.kr/")
      ? "block"
      : "none";
    nonKlms.style.display = tabs[0].url.includes("//klms.kaist.ac.kr/")
      ? "none"
      : "flex";
    warning.style.display = "none";

    openKlmsWebpage.onclick = openOnclick(tabs[0].id);
  } catch {
    contents.style.display = "none";
    nonKlms.style.display = "none";
    warning.style.display = "flex";
    openKlmsWebpage.onclick = openOnclick(tabs[0].id);
  }
});
function openOnclick(id) {
  return function () {
    chrome.tabs.executeScript(id, {
      code: `window.open('https://klms.kaist.ac.kr/');`,
    });
  };
}
