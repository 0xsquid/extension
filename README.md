# Squid - Buy Button Extension

---

## Installation

Installing the extension is a bit weird for local development and testing.

### Testing

1. Download the `./dist` directory to your machine
2. Go to the extensions area of settings (in Brave go to `brave://extensions/` in the browser)
3. Turn developer mode on
4. Click "Load unpacked" and select the `./dist` directory we downloaded earlier

## Todo

- Synchronise the on/off toggle with a service worker - currently you need to refresh Opensea to see the new settings
- Make code domain specific - currently the buy button appears on all links to Opensea collections on ANY website (it looks broken)
- Experiment with other marketplaces / pages etc
