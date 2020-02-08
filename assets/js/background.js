console.log("ok background js");
// background.js

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, 'test');
});