# Color Tailor (work in progress)
A [dyanmic Firefox
theme](https://developer.mozilla.org/en-US/Add-ons/Themes/Theme_concepts#Dynamic_themes)
that changes the theme to the current website's "primary" color.

Order of precedence for determining the color:
1. The meta [theme-color](https://html.spec.whatwg.org/multipage/semantics.html#meta-theme-color) element
2. The dominant color in the [favicon](https://en.wikipedia.org/wiki/Favicon), as determined by [node-vibrant](https://github.com/akfish/node-vibrant)
3. White as a fallback

## Prior Art
Color Tailor was inspired by an [iTunes feature](https://stackoverflow.com/q/13637892/1481479) that would change UI colors on the fly to match album covers.

Chrome on Android does a [similar thing](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android) with the toolbar color, and there is an [open issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1098544) to do the same for Firefox.

## License
[MIT](https://github.com/dguo/color-tailor/blob/master/LICENSE)
