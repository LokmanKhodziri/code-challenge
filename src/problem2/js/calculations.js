import { getTokenPrices, domElements } from "./constants.js";
import { formatNumber } from "./utils.js";
import { showError, clearError } from "./ui.js";
import { updateConfirmButton } from "./validation.js";

const { fromCurrencySelect, toCurrencySelect, inputAmount, outputAmount, fromError, toError, exchangeRateDisplay } = domElements;

// Calculate exchange rate and output amount
export function calculateExchange() {
  const fromToken = fromCurrencySelect.value;
  const toToken = toCurrencySelect.value;
  const amount = parseFloat(inputAmount.value);

  // Clear previous errors
  clearError(fromError);
  clearError(toError);
  exchangeRateDisplay.textContent = "";

  // Validation
  if (!fromToken || !toToken) {
    if (!fromToken) showError(fromError, "Please select a currency to send");
    if (!toToken) showError(toError, "Please select a currency to receive");
    outputAmount.value = "";
    updateConfirmButton();
    return;
  }

  if (fromToken === toToken) {
    showError(toError, "Cannot swap the same currency");
    outputAmount.value = "";
    updateConfirmButton();
    return;
  }

  if (!amount || amount <= 0) {
    showError(fromError, "Please enter a valid amount");
    outputAmount.value = "";
    updateConfirmButton();
    return;
  }

  const tokenPrices = getTokenPrices();
  if (!tokenPrices[fromToken] || !tokenPrices[toToken]) {
    showError(fromError, "Price data not available for selected tokens");
    outputAmount.value = "";
    updateConfirmButton();
    return;
  }

  // Calculate exchange rate
  // If fromToken price is $X and toToken price is $Y
  // Then 1 fromToken = X/Y toToken
  const fromPrice = tokenPrices[fromToken];
  const toPrice = tokenPrices[toToken];
  const exchangeRate = fromPrice / toPrice;
  const outputValue = amount * exchangeRate;

  // Display result
  outputAmount.value = formatNumber(outputValue);

  // Display exchange rate
  exchangeRateDisplay.textContent = `1 ${fromToken} = ${exchangeRate.toFixed(
    6
  )} ${toToken}`;

  updateConfirmButton();
}

