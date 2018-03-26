const fontColorContrast = require('font-color-contrast');

async function changeTheme(message) {
    console.log('message:', message);
    if (message && message.themeColor) {
        const currentWindow = await browser.windows.getLastFocused();
        browser.theme.update(currentWindow.id, {
            colors: {
                accentcolor: message.themeColor,
                textcolor: fontColorContrast(message.themeColor)
            }
        });
    }
}

function handleTabActivated(activeInfo) {
    console.log('active tab:', activeInfo);
}

browser.runtime.onMessage.addListener(changeTheme);
browser.tabs.onActivated.addListener(handleTabActivated);
