// background.js

chrome.browserAction.onClicked.addListener(buttonClicked);


function buttonClicked(tab) {
    console.log(tab);
    console.log('lick');
    let message = {message: "messeage"};

    chrome.tabs.sendMessage(tab.id, message);
}