# Currency Swap Form

A modern currency swap form built with vanilla JavaScript and Vite. Users can swap assets between different currencies with real-time exchange rate calculations.

## Features

- Real-time exchange rate calculation using live token prices
- Token icons from Switcheo token-icons repository
- Input validation with error messages
- Loading states for form submission
- Swap button to reverse currencies
- Responsive design

## Why Modular Architecture?

Instead of putting everything in one big file, I split the code into separate modules. Here's why:

### 1. Easier to Find and Fix Bugs

When something breaks, I know exactly which file to check:

- Exchange rate wrong? → `calculations.js`
- API not working? → `api.js`
- UI not updating? → `ui.js`

### 2. Better Organization

Each file has one job:

- `constants.js` - All config and DOM elements
- `api.js` - Fetching data
- `ui.js` - Updating the interface
- `calculations.js` - Math stuff
- `validation.js` - Checking inputs
- `handlers.js` - User clicks and events
- `utils.js` - Helper functions

### 3. Easier to Read

Small files (20-70 lines) are way easier to understand than one 300+ line file.

### 4. Can Test Each Part Separately

I can test the calculation logic without needing the whole app running.

## Project Structure

```
problem2/
├── index.html              # HTML
├── style.css               # Main stylesheet (imports all CSS modules)
├── script.js               # Main entry point
├── js/                     # JavaScript modules
│   ├── constants.js        # Config and DOM elements
│   ├── utils.js            # Helper functions
│   ├── api.js              # API calls
│   ├── ui.js               # UI updates
│   ├── calculations.js     # Exchange rate math
│   ├── validation.js       # Form validation
│   └── handlers.js         # Event handlers
└── css/                    # CSS modules
    ├── reset.css            # Reset and base styles
    ├── layout.css           # Layout components
    ├── components.css       # Form components
    ├── buttons.css          # Button styles
    ├── utilities.css        # Utilities and animations
    └── responsive.css      # Media queries
```

## How It Works

### Main Flow

1. App loads → Fetches token prices from API
2. Prices processed → Array converted to object for easy lookup
3. Dropdowns populated → User can select currencies
4. User enters amount → Exchange rate calculated in real-time
5. User clicks swap → Currencies reversed
6. User submits → Loading animation, then success message

### Exchange Rate Calculation

If ETH costs $1645 and BTC costs $30000:

- 1 ETH = 1645/30000 = 0.0548 BTC
- Swapping 2 ETH = 2 × 0.0548 = 0.1096 BTC

### Number Formatting

Very small numbers like `2.6e-7` get formatted to `0.00000026` so users can read them.

## Key Decisions

### Why ES6 Modules?

- Native browser support (no extra build step needed)
- Clear imports/exports show dependencies
- Easy to see what each file needs

### Why Centralize DOM Elements?

All DOM references in one place (`domElements` object) means:

- Easy to update if HTML changes
- No searching for `getElementById` calls everywhere
- Single source of truth

### Why Separate State Management?

Using getters/setters for token data:

- Controlled access to shared state
- Can add validation later if needed
- Prevents accidental mutations

### Why Modular CSS?

Same benefits as modular JS:

- Easy to find styles (buttons → `buttons.css`)
- Can update one component without touching others
- Better organization for larger projects

### Why Vite?

- Fast development server
- Hot module replacement (instant updates)
- Simple setup, works out of the box

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Module Overview

### `script.js`

Main entry point. Sets up event listeners and fetches initial data.

### `constants.js`

- API URLs and base paths
- DOM element references
- Token price data (getters/setters)

### `utils.js`

- `formatNumber()` - Converts scientific notation to readable numbers

### `api.js`

- `fetchTokenPrices()` - Fetches and processes token prices from API

### `ui.js`

- `populateCurrencySelects()` - Fills dropdown menus
- `updateTokenIcon()` - Updates token icons
- `showError()` / `clearError()` - Error message handling

### `calculations.js`

- `calculateExchange()` - Calculates exchange rate and output amount
- Validates inputs before calculating

### `validation.js`

- `updateConfirmButton()` - Enables/disables submit button based on form validity

### `handlers.js`

- `swapCurrencies()` - Swaps from/to currencies
- `handleSubmit()` - Handles form submission with loading state
- `setupEventListeners()` - Sets up all click/change events

## Troubleshooting

**Currency dropdowns empty?**

- Check browser console for API errors
- Verify network connection

**Exchange rate not calculating?**

- Make sure both currencies are selected
- Amount must be a positive number

**Token icons not showing?**

- Some tokens don't have icons (handled gracefully)
- Check network tab for failed requests

## Future Improvements

- Add unit tests
- Cache token prices
- Add transaction history
- Better error notifications (toast instead of alert)
- Keyboard shortcuts
- Currency favorites
