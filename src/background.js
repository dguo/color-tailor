const fontColorContrast = require('font-color-contrast');

async function changeTheme(message) {
    console.log('message:', message);
    if (message && message.themeColor) {
        const accentcolor = message.themeColor.map(color =>
            Math.min(255, Math.round(color))
        );
        const currentWindow = await browser.windows.getLastFocused();
        browser.theme.update(currentWindow.id, {
            colors: {
                accentcolor,
                textcolor: fontColorContrast(accentcolor)
            }
        });
    }
}

function handleTabActivated(activeInfo) {
    console.log('active tab:', activeInfo);
}

browser.runtime.onMessage.addListener(changeTheme);
browser.tabs.onActivated.addListener(handleTabActivated);
