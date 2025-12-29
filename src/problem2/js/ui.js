import {
  TOKEN_ICON_BASE,
  getAvailableTokens,
  domElements,
} from "./constants.js";

// Populate currency select dropdowns
export function populateCurrencySelects() {
  const { fromCurrencySelect, toCurrencySelect } = domElements;

  // Clear existing options (except the first placeholder)
  fromCurrencySelect.innerHTML = '<option value="">Select currency</option>';
  toCurrencySelect.innerHTML = '<option value="">Select currency</option>';

  const availableTokens = getAvailableTokens();
  availableTokens.forEach((token) => {
    const option1 = document.createElement("option");
    option1.value = token;
    option1.textContent = token;
    fromCurrencySelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = token;
    option2.textContent = token;
    toCurrencySelect.appendChild(option2);
  });
}

// Update token icon
export function updateTokenIcon(selectElement, imgElement, codeElement) {
  const selectedToken = selectElement.value;
  if (selectedToken) {
    imgElement.src = `${TOKEN_ICON_BASE}${selectedToken}.svg`;
    imgElement.alt = selectedToken;
    imgElement.style.display = "block";
    codeElement.textContent = selectedToken;
  } else {
    imgElement.style.display = "none";
    codeElement.textContent = "";
  }
}

// Show error message
export function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

// Clear error message
export function clearError(errorElement) {
  errorElement.textContent = "";
  errorElement.style.display = "none";
}

// Export domElements for use in other modules
export { domElements };
