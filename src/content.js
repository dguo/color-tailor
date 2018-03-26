const Vibrant = require('node-vibrant');

function getThemeColor() {
    const themeColorTag = document.querySelector(`meta[name='theme-color']`);
    if (themeColorTag) {
        return themeColorTag.getAttribute('content') ||
               themeColorTag.getAttribute('value');
    }

    return null;
}

async function getFavicon() {
    let faviconLocation;

    const faviconTag = document.querySelector(`link[rel~='icon']`);
    if (faviconTag) {
        faviconLocation = faviconTag.getAttribute('href');
    }

    return faviconLocation || '/favicon.ico';
}

async function getDominantColor() {
    let color = getThemeColor();

    if (!color) {
        const faviconLocation = await getFavicon();
        console.log('favicon location:', faviconLocation);
        const palette = await Vibrant.from(faviconLocation).getPalette();
        color = palette.Vibrant.getRgb();
    }

    console.log('color:', color);
    browser.runtime.sendMessage({themeColor: color});
}

getDominantColor();
