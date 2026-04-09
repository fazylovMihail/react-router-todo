import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.querySelector("body")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
