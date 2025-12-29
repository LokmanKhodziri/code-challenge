import {
  PRICES_API_URL,
  setTokenPrices,
  setAvailableTokens,
} from "./constants.js";
import { populateCurrencySelects } from "./ui.js";
import { showError, domElements } from "./ui.js";

// Fetch token prices from API
export async function fetchTokenPrices() {
  try {
    const response = await fetch(PRICES_API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }
    const data = await response.json();

    // The API returns an array of objects with currency and price
    // Process the array to extract unique currencies with valid prices
    const tokenPrices = {};
    const seenCurrencies = new Set();

    data.forEach((item) => {
      const currency = item.currency;
      const price = item.price;

      // Only add currencies with valid prices that we haven't seen yet
      if (currency && price && price > 0 && !seenCurrencies.has(currency)) {
        tokenPrices[currency] = price;
        seenCurrencies.add(currency);
      }
    });

    // Get sorted list of available tokens
    const availableTokens = Object.keys(tokenPrices).sort();

    // Update the constants
    setTokenPrices(tokenPrices);
    setAvailableTokens(availableTokens);

    populateCurrencySelects();
  } catch (error) {
    console.error("Error fetching token prices:", error);
    showError(
      domElements.fromError,
      "Failed to load token prices. Please refresh the page."
    );
  }
}
