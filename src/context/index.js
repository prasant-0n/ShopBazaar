"use client";

import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavmodal, setShowNavModal] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [user, setUser] = useState(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState(false);

  useEffect;
  return (
    <GlobalContext.Provider
      value={{
        showNavmodal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
