import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import EventsProvider from "./context/eventContext";
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  //<React.StrictMode>
  <EventsProvider>
    <App />
  </EventsProvider>
);
