const parseColor = require('parse-color');
const Vibrant = require('node-vibrant');

function getThemeColor() {
    const themeColorTag = document.querySelector(`meta[name='theme-color']`);
    if (themeColorTag) {
        const cssColor =
            themeColorTag.getAttribute('content') ||
            themeColorTag.getAttribute('value');

        if (cssColor) {
            const parsed = parseColor(cssColor);
            if (parsed && parsed.rgb) {
                return parsed.rgb;
            }
        }
    }

    return null;
}

function getFavicon() {
    let faviconLocation;

    const faviconTag = document.querySelector(`link[rel~='icon']`);
    if (faviconTag) {
        faviconLocation = faviconTag.getAttribute('href');
    }

    return faviconLocation || '/favicon.ico';
}

(async function getDominantColor() {
    let color = getThemeColor();

    if (!color) {
        const faviconLocation = getFavicon();
        try {
            const palette = await Vibrant.from(faviconLocation).getPalette();
            if (palette) {
                color = palette.Vibrant.getRgb();
            }
        } catch (error) {
            // console.warn(error);
        }
    }

    browser.runtime.sendMessage({primaryColor: color});
})();
