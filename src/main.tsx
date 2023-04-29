import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext";
import ChatContextProvider from "./context/ChatContext.tsx";
import MenuContextProvider from "./context/MenuContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MenuContextProvider>
    <AuthContextProvider>
      <ChatContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChatContextProvider>
    </AuthContextProvider>
  </MenuContextProvider>
);
