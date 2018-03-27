const fontColorContrast = require('font-color-contrast');

const themes = {};

// Black text on a white background
const defaultTheme = {
    colors: {
        accentcolor: [255, 255, 255],
        textcolor: [0, 0, 0]
    }
};

function saveTheme(message, sender) {
    if (!message || !sender || !sender.tab) {
        return;
    }

    let theme = defaultTheme;

    if (message.primaryColor) {
        const accentcolor = message.primaryColor.map(rgb =>
            Math.min(255, Math.round(rgb))
        );

        theme = {
            colors: {
                accentcolor,
                textcolor: fontColorContrast(accentcolor)
            }
        };
    }

    themes[sender.tab.id] = theme;

    if (sender.tab.active) {
        browser.theme.update(sender.tab.windowId, theme);
    }
}

function handleTabActivated(activeInfo) {
    let theme = themes[activeInfo.tabId];

    if (!theme) {
        theme = defaultTheme;
        themes[activeInfo.tabId] = defaultTheme;
    }

    browser.theme.update(activeInfo.windowId, theme);
}

function handleTabRemoved(tabId) {
    delete themes[tabId];
}

browser.runtime.onMessage.addListener(saveTheme);
browser.tabs.onActivated.addListener(handleTabActivated);
browser.tabs.onRemoved.addListener(handleTabRemoved);
