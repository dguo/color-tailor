async function changeTheme(message) {
    console.log('message:', message);
    const currentWindow = await browser.windows.getLastFocused();
    browser.theme.update(currentWindow.id, {
        colors: {
            accentcolor: message.themeColor,
            textcolor: '#fff'
        }
    });
}

function handleTabActivated(activeInfo) {
    console.log('active tab:', activeInfo);
}

browser.runtime.onMessage.addListener(changeTheme);
browser.tabs.onActivated.addListener(handleTabActivated);
