/* eslint-disable no-console */

const fontColorContrast = require('font-color-contrast');
const loadImage = require('image-promise');
const Vibrant = require('node-vibrant');

const themes = {};

// Black text on a white background
const defaultTheme = {
    colors: {
        frame: [255, 255, 255],
        tab_background_text: [0, 0, 0]
    }
};

async function getFaviconColor(url) {
    let color = null;

    try {
        const favicon = await loadImage(url);
        const palette = await Vibrant.from(favicon).getPalette();
        const swatch = palette.Vibrant || palette.Muted;
        color = swatch.getRgb().map((rgb) => Math.min(255, Math.round(rgb)));
    } catch (error) {
        console.error(error);
    }

    return color;
}

async function saveTheme(message, sender) {
    if (!message || !sender || !sender.tab) {
        console.warn('Invalid message or sender');
        return;
    }

    let color = message.themeColor;
    // #ffffff (white) is a boring theme. Let's ignore it.
    if (!color || (color[0] === 255 && color[1] === 255 && color[2] === 255)) {
        color = await getFaviconColor(sender.tab.favIconUrl);
    }

    const theme = !color
        ? defaultTheme
        : {
              colors: {
                  frame: color,
                  tab_background_text: fontColorContrast(color)
              }
          };

    themes[sender.tab.id] = theme;

    if (sender.tab.active) {
        browser.theme.update(sender.tab.windowId, theme);
    }
}

async function handleTabActivated(activeInfo) {
    const theme = themes[activeInfo.tabId];

    if (theme) {
        browser.theme.update(activeInfo.windowId, theme);
    } else {
        try {
            await browser.tabs.sendMessage(activeInfo.tabId, null);
        } catch (error) {
            /* We expect to end up here when the tab is not a normal page,
               such as the new tab page or a page that is not allowed to run
               content scripts (like addons.mozilla.org).
               See https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Content_scripts
               */
            browser.theme.reset(activeInfo.windowId);
        }
    }
}

function handleTabRemoved(tabId) {
    delete themes[tabId];
}

function handleTabUpdated(tabId, changeInfo) {
    if (
        changeInfo.status === 'complete' ||
        changeInfo.favIconUrl ||
        changeInfo.url
    ) {
        browser.tabs.sendMessage(tabId, null);
    }
}

browser.runtime.onMessage.addListener(saveTheme);
browser.tabs.onActivated.addListener(handleTabActivated);
browser.tabs.onRemoved.addListener(handleTabRemoved);
browser.tabs.onUpdated.addListener(handleTabUpdated);
