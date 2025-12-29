// Main entry point - imports and initializes the application
import { fetchTokenPrices } from "./js/api.js";
import { setupEventListeners } from "./js/handlers.js";

// Initialize on page load
function init() {
  // Setup event listeners
  setupEventListeners();

  // Fetch token prices
  fetchTokenPrices();
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
