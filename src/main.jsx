import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SaasProvider } from "./context/SaasContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SaasProvider>
      <App />
    </SaasProvider>
  </StrictMode>
);