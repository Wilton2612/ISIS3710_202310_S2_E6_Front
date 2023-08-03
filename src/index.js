import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { IntlProvider } from "react-intl";
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

const language = navigator.language || navigator.userLanguage;
let messages;

switch (language) {
  case "es-ES":
    messages = localeEsMessages;
    break;
  case "en-US":
    messages = localeEnMessages;
    break;

  case "en":
      messages = localeEnMessages;
      break;
  default:
    messages = localeEsMessages;
}
console.log(language)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <IntlProvider locale={language} messages={messages}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();

