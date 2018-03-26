const fontColorContrast = require('font-color-contrast');

const themes = {};

function setTheme(windowId, theme) {
    browser.theme.update(windowId, theme);
}

function changeTheme(message, sender) {
    console.log('message:', message, sender);

    if (message && message.themeColor && sender && sender.tab) {
        const accentcolor = message.themeColor.map(color =>
            Math.min(255, Math.round(color))
        );
        const theme = {
            colors: {
                accentcolor,
                textcolor: fontColorContrast(accentcolor)
            }
        };

        const tabId = sender.tab.id;
        const windowId = sender.tab.windowId;

        if (themes[windowId]) {
            themes[windowId][tabId] = theme;
        } else {
            themes[windowId] = {
                [tabId]: theme
            };
        }

        if (sender.tab.active) {
            setTheme(windowId, theme);
        }
    }
}

function handleTabActivated(activeInfo) {
    console.log('active tab:', activeInfo);
    const tabId = activeInfo.tabId;
    const windowId = activeInfo.windowId;
    const theme = themes[windowId] && themes[windowId][tabId] ? themes[windowId][tabId] : null;
    if (theme) {
        setTheme(windowId, theme);
    }
}

browser.runtime.onMessage.addListener(changeTheme);
browser.tabs.onActivated.addListener(handleTabActivated);
