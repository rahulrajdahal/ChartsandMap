import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MessengerCustomerChat from 'react-messenger-customer-chat';

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <MessengerCustomerChat
      pageId="107560938864907"
      appId="498968665380848"
    />
  </QueryClientProvider>
);
