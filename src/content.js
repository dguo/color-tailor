const Vibrant = require('node-vibrant');

async function getDominantColor() {
    const themeColorTag = document.querySelector(`meta[name='theme-color']`);
    if (themeColorTag) {
        const themeColor =
            themeColorTag.getAttribute('content') ||
            themeColorTag.getAttribute('value');
        browser.runtime.sendMessage({themeColor});
    } else {
        const color = await Vibrant.from('/favicon.ico').getPalette();
        browser.runtime.sendMessage({themeColor: color.Vibrant.getRgb()});
    }
}

getDominantColor();
