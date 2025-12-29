// Constants
export const TOKEN_ICON_BASE =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

export const PRICES_API_URL = "https://interview.switcheo.com/prices.json";

// Token prices cache - using an object to allow mutations
export const tokenData = {
  prices: {},
  tokens: [],
};

// Getter functions
export function getTokenPrices() {
  return tokenData.prices;
}

export function getAvailableTokens() {
  return tokenData.tokens;
}

// Setter functions for token data
export function setTokenPrices(prices) {
  tokenData.prices = prices;
}

export function setAvailableTokens(tokens) {
  tokenData.tokens = tokens;
}

// DOM elements
export const domElements = {
  fromCurrencySelect: document.getElementById("from-currency"),
  toCurrencySelect: document.getElementById("to-currency"),
  inputAmount: document.getElementById("input-amount"),
  outputAmount: document.getElementById("output-amount"),
  fromTokenIcon: document.getElementById("from-token-icon"),
  toTokenIcon: document.getElementById("to-token-icon"),
  fromCurrencyCode: document.getElementById("from-currency-code"),
  toCurrencyCode: document.getElementById("to-currency-code"),
  swapButton: document.getElementById("swap-currencies-btn"),
  confirmButton: document.getElementById("confirm-swap-btn"),
  buttonText: document.getElementById("button-text"),
  buttonLoader: document.getElementById("button-loader"),
  fromError: document.getElementById("from-error"),
  toError: document.getElementById("to-error"),
  exchangeRateDisplay: document.getElementById("exchange-rate"),
};
