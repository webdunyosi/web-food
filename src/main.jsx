import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

// Constants for loader timing - must match CSS transition duration
const LOADER_TRANSITION_DURATION = 500; // matches .initial-loader transition in index.css
const MIN_LOADER_DISPLAY_TIME = 300; // minimum time to show loader for smooth UX

// Track when the loader was first shown
const loaderStartTime = Date.now();

// Hide initial loader once React app is mounted and all resources are loaded
const hideLoader = () => {
  const loader = document.getElementById("initial-loader");
  if (loader) {
    // Ensure minimum display time for smooth UX
    const elapsedTime = Date.now() - loaderStartTime;
    const remainingTime = Math.max(0, MIN_LOADER_DISPLAY_TIME - elapsedTime);
    
    setTimeout(() => {
      loader.classList.add("hide");
      // Remove from DOM after transition completes
      setTimeout(() => {
        loader.remove();
      }, LOADER_TRANSITION_DURATION);
    }, remainingTime);
  }
};

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Hide loader after React has rendered AND all resources are loaded
// This ensures nothing is shown in an incomplete state
if (document.readyState === 'complete') {
  // Page already loaded (e.g., cached) - wait a bit for React to mount
  setTimeout(hideLoader, 100);
} else {
  // Wait for full page load including all resources
  window.addEventListener('load', () => {
    // Give React time to complete its render cycle
    setTimeout(hideLoader, 100);
  });
}
