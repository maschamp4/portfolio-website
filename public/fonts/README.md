# Custom Fonts Guide

This directory contains custom font files for the portfolio website.

## Font Files Location

Place your custom font files in this directory (`portfolio-website/public/fonts/`):

```
portfolio-website/
└── public/
    └── fonts/
        ├── README.md (this file)
        ├── SpaceGrotesk-Regular.woff2
        ├── SpaceGrotesk-Regular.woff
        ├── SpaceGrotesk-Bold.woff2
        ├── SpaceGrotesk-Bold.woff
        ├── SpaceGrotesk-Medium.woff2
        ├── SpaceGrotesk-Medium.woff
        └── ... (other font files)
```

## Supported Font Formats

Modern browsers support the following font formats (listed in order of preference):

1. **WOFF2** (`.woff2`) - Best compression, recommended for modern browsers
2. **WOFF** (`.woff`) - Fallback for older browsers
3. **TTF** (`.ttf`) - OpenType/TrueType fonts (larger file size, use as last fallback)
4. **OTF** (`.otf`) - OpenType fonts

## Recommended Font Stack

The portfolio uses **Space Grotesk** as the primary font family. You can download it from:

- [Google Fonts - Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- [GitHub - Space Grotesk Repository](https://github.com/floriankarsten/space-grotesk)

### Required Font Weights

For optimal display, include these font weights:

- **Regular (400)** - Body text
- **Medium (500)** - Subheadings
- **Bold (700)** - Headings and emphasis

## How to Add Custom Fonts

### Step 1: Add Font Files

1. Download your font files (preferably `.woff2` and `.woff` formats)
2. Place them in `portfolio-website/public/fonts/`
3. Use descriptive filenames (e.g., `SpaceGrotesk-Bold.woff2`)

### Step 2: Define @font-face in CSS

The font faces are already configured in `portfolio-website/src/styles/variables.css`. Here's the template:

```css
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Regular.woff2') format('woff2'),
       url('/fonts/SpaceGrotesk-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Bold.woff2') format('woff2'),
       url('/fonts/SpaceGrotesk-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### Step 3: Use Fonts in CSS

Fonts are applied via CSS variables defined in `variables.css`:

```css
:root {
  --font-primary: 'Space Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-system: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}

body {
  font-family: var(--font-primary);
}
```

## Font Loading Strategy

The portfolio uses **font-display: swap** for optimal performance:

- **swap**: Shows fallback font immediately, then swaps to custom font when loaded
- Prevents invisible text (FOIT - Flash of Invisible Text)
- Improves perceived performance

## Font Preloading

Critical fonts are preloaded in `index.html` for faster initial render:

```html
<link rel="preload" href="/fonts/SpaceGrotesk-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/SpaceGrotesk-Bold.woff2" as="font" type="font/woff2" crossorigin>
```

**Important**: Only preload the most critical font files (typically Regular and Bold weights).

## Converting Font Formats

If you only have `.ttf` or `.otf` files, you can convert them to `.woff2` and `.woff`:

### Online Tools
- [Transfonter](https://transfonter.org/) - Recommended, generates complete @font-face CSS
- [FontSquirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator)
- [CloudConvert](https://cloudconvert.com/ttf-to-woff2)

### Command Line (Advanced)
```bash
# Install fonttools
pip install fonttools brotli

# Convert TTF to WOFF2
pyftsubset YourFont.ttf --output-file=YourFont.woff2 --flavor=woff2

# Convert TTF to WOFF
pyftsubset YourFont.ttf --output-file=YourFont.woff --flavor=woff
```

## Font Licensing

**Important**: Ensure you have proper licensing for any custom fonts used.

- **Google Fonts**: Free for commercial use (Open Font License)
- **Commercial Fonts**: Check license terms for web usage
- **Self-Hosted vs CDN**: Self-hosting may require different licensing than CDN usage

## Troubleshooting

### Fonts Not Loading?

1. **Check file paths**: Ensure fonts are in `public/fonts/` and paths in CSS are correct
2. **Check CORS**: Fonts must be served from the same origin or with proper CORS headers
3. **Check console**: Look for 404 errors or CORS errors in browser console
4. **Clear cache**: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R) to clear cached styles

### Font Files Too Large?

1. **Use WOFF2**: Best compression (typically 30% smaller than WOFF)
2. **Subset fonts**: Remove unused characters/glyphs
3. **Only load needed weights**: Don't load all 9 weights if you only use 2-3

### Preload Not Working?

1. **Check crossorigin attribute**: Required for font preloading
2. **Verify mime type**: Should be `type="font/woff2"` for WOFF2 files
3. **Limit preloads**: Only preload 1-2 critical font files

## Example: Adding a New Font Family

To add a monospace font for code blocks:

1. Download JetBrains Mono fonts
2. Place in `public/fonts/`:
   - `JetBrainsMono-Regular.woff2`
   - `JetBrainsMono-Bold.woff2`

3. Add @font-face in `variables.css`:
```css
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

4. Update CSS variable:
```css
:root {
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}
```

5. Use in your code:
```css
code, pre {
  font-family: var(--font-mono);
}
```

## Resources

- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel](https://www.fontsquirrel.com/)
- [MDN - @font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
- [Web Font Optimization (web.dev)](https://web.dev/font-best-practices/)
- [Font Loading Strategies](https://www.zachleat.com/web/comprehensive-webfonts/)

---

**Last Updated**: 2025-10-21