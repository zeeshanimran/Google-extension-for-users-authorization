/* eslint-disable no-undef */

chrome.runtime.onInstalled.addListener(function () {
  // Open a new window when the extension is installed
  chrome.windows.create({
    url: chrome.runtime.getURL("index.html"),
    type: "popup",
    width: 800,
    height: 600,
  });
});
