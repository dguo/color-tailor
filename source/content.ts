const parseColor = require('parse-color');

function sendThemeColor() {
    let color = null;

    const themeColorTag = document.querySelector(`meta[name='theme-color']`);
    if (themeColorTag) {
        const cssColor =
            themeColorTag.getAttribute('content') ||
            themeColorTag.getAttribute('value');

        if (cssColor) {
            const parsed = parseColor(cssColor);
            if (parsed && parsed.rgb) {
                color = parsed.rgb;
            }
        }
    }

    browser.runtime.sendMessage({themeColor: color});
}

browser.runtime.onMessage.addListener(sendThemeColor);
