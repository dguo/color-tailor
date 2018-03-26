# Color Tailor (work in progress)
A [dyanmic Firefox
theme](https://developer.mozilla.org/en-US/Add-ons/Themes/Theme_concepts#Dynamic_themes)
that changes the theme to the current website's "primary" color.

Order of precedence for determining the color:
1. The meta [theme-color](https://html.spec.whatwg.org/multipage/semantics.html#meta-theme-color) element
2. The dominant color in the [favicon](https://en.wikipedia.org/wiki/Favicon), as determined by [node-vibrant](https://github.com/akfish/node-vibrant)
3. White as a fallback

## License
[MIT](https://github.com/dguo/color-tailor/blob/master/LICENSE)
