import { getTokenPrices, domElements } from "./constants.js";

const { fromCurrencySelect, toCurrencySelect, inputAmount, confirmButton } =
  domElements;

// Update confirm button state
export function updateConfirmButton() {
  const fromToken = fromCurrencySelect.value;
  const toToken = toCurrencySelect.value;
  const amount = parseFloat(inputAmount.value);
  const tokenPrices = getTokenPrices();

  const isValid =
    fromToken &&
    toToken &&
    fromToken !== toToken &&
    amount &&
    amount > 0 &&
    tokenPrices[fromToken] &&
    tokenPrices[toToken];

  confirmButton.disabled = !isValid;
}
