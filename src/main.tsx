import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/index.ts";
import { LanguageProvider } from "./lang/LanguageProvider.tsx";
import { SignupProvider } from "./globalContext/SignupContext.tsx";
import { ColorProvider } from "./globalContext/ColorContext.tsx";
import { SongProvider } from "./globalContext/SongContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SignupProvider>
        <ColorProvider>
          <SongProvider>
            <LanguageProvider>
              <BrowserRouter>
                <App />
                <ToastContainer />
              </BrowserRouter>
            </LanguageProvider>
          </SongProvider>
        </ColorProvider>
      </SignupProvider>
    </Provider>
  </React.StrictMode>
);
