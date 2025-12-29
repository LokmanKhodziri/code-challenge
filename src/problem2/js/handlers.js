import { domElements } from "./constants.js";
import { updateTokenIcon } from "./ui.js";
import { calculateExchange } from "./calculations.js";
import { formatNumber } from "./utils.js";
import { updateConfirmButton } from "./validation.js";

const {
  fromCurrencySelect,
  toCurrencySelect,
  inputAmount,
  outputAmount,
  fromTokenIcon,
  toTokenIcon,
  fromCurrencyCode,
  toCurrencyCode,
  swapButton,
  confirmButton,
  buttonText,
  buttonLoader,
  exchangeRateDisplay,
} = domElements;

// Swap currencies
export function swapCurrencies() {
  const fromValue = fromCurrencySelect.value;
  const toValue = toCurrencySelect.value;
  const inputValue = inputAmount.value;
  const outputValue = outputAmount.value;

  // Swap select values
  fromCurrencySelect.value = toValue;
  toCurrencySelect.value = fromValue;

  // Swap input values
  inputAmount.value = formatNumber(parseFloat(outputValue) || "");

  // Update icons
  updateTokenIcon(fromCurrencySelect, fromTokenIcon, fromCurrencyCode);
  updateTokenIcon(toCurrencySelect, toTokenIcon, toCurrencyCode);

  // Recalculate
  calculateExchange();
}

// Handle form submission with loading state
export async function handleSubmit(event) {
  event.preventDefault();

  const fromToken = fromCurrencySelect.value;
  const toToken = toCurrencySelect.value;
  const amount = parseFloat(inputAmount.value);

  // Final validation
  if (
    !fromToken ||
    !toToken ||
    !amount ||
    amount <= 0 ||
    fromToken === toToken
  ) {
    return;
  }

  // Show loading state
  confirmButton.disabled = true;
  buttonText.style.display = "none";
  buttonLoader.style.display = "inline-block";

  // Simulate API call with timeout
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Hide loading state
  buttonText.style.display = "inline";
  buttonLoader.style.display = "none";
  confirmButton.disabled = false;

  // Show success message (simple alert for now)
  alert(
    `Successfully swapped ${amount} ${fromToken} for ${outputAmount.value} ${toToken}!`
  );

  // Reset form
  inputAmount.value = "";
  outputAmount.value = "";
  exchangeRateDisplay.textContent = "";
  updateConfirmButton();
}

// Setup event listeners
export function setupEventListeners() {
  fromCurrencySelect.addEventListener("change", () => {
    updateTokenIcon(fromCurrencySelect, fromTokenIcon, fromCurrencyCode);
    calculateExchange();
  });

  toCurrencySelect.addEventListener("change", () => {
    updateTokenIcon(toCurrencySelect, toTokenIcon, toCurrencyCode);
    calculateExchange();
  });

  inputAmount.addEventListener("input", calculateExchange);
  inputAmount.addEventListener("blur", () => {
    // Format the input value to avoid scientific notation
    const value = parseFloat(inputAmount.value);
    if (value && !isNaN(value)) {
      inputAmount.value = formatNumber(value);
    }
    calculateExchange();
  });

  swapButton.addEventListener("click", swapCurrencies);

  confirmButton.addEventListener("click", handleSubmit);

  // Handle token icon errors (fallback if image doesn't exist)
  fromTokenIcon.addEventListener("error", function () {
    this.style.display = "none";
  });

  toTokenIcon.addEventListener("error", function () {
    this.style.display = "none";
  });
}
