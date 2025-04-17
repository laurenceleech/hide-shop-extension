# Shop Pay Modal Hider Chrome Extension

A Chrome extension that hides the annoying Shop Pay modal that frequently appears on Shopify websites. It simply prevents the modal from being visible, making for a cleaner browsing experience without unwanted login prompts. Note: This extension only hides the visual popup - if you've previously authorized Shop Pay, you'll still receive SMS verification codes.

## Features

- Toggle switch to enable/disable the modal hiding
- Hides the Shop Pay login/authorization modal with CSS
- Works with Shop Pay modals only

[Basic Demo](https://www.loom.com/share/ba84113186944145816b36c524cd056f)

## Disclaimer

This extension is an unofficial utility and is not affiliated with, endorsed by, or supported by Shop Pay or Shopify Inc. It modifies the visual appearance of the Shop Pay modal using non-destructive CSS, without collecting user data or interfering with security or core functionality.

## Installation

Since this extension isn't published to the Chrome Web Store, you'll need to install it manually. Here's how:

1. Clone this repository or download the files:
   ```bash
   git clone https://github.com/laurenceleech/hide-shop-extension.git
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable "Developer mode" by clicking the toggle switch in the top right corner

4. Click "Load unpacked" button

5. Select the directory containing the extension files (where manifest.json is located)

The extension should now appear in your Chrome extension list.

## Usage

1. Click the extension icon in your Chrome toolbar
2. Use the toggle switch to enable/disable the modal hiding
3. When enabled, the Shop Pay modal will be hidden
4. When disabled, the Shop Pay modal will appear as normal

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.css` - Styles for the popup
- `popup.js` - Popup functionality
- `content.js` - Content script that handles modal hiding

## Development

To modify the extension:

1. Make your changes to the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes 