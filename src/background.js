const fontColorContrast = require('font-color-contrast');

const themes = {};

function changeTheme(message, sender) {
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

        themes[tabId] = theme;

        if (sender.tab.active) {
            browser.theme.update(windowId, theme);
        }
    }
}

function handleTabActivated(activeInfo) {
    const theme = themes[activeInfo.tabId] || null;
    if (theme) {
        browser.theme.update(activeInfo.windowId, theme);
    }
}

function handleTabRemoved(tabId) {
    delete themes[tabId];
}

browser.runtime.onMessage.addListener(changeTheme);
browser.tabs.onActivated.addListener(handleTabActivated);
browser.tabs.onRemoved.addListener(handleTabRemoved);
