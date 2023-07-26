import { ReactNode, createContext, useState } from "react";

interface LoadingInterface {
  loadingDisplay: React.CSSProperties["display"];
  switchDisplay: () => void;
}

export const LoadingContext = createContext({} as LoadingInterface);

function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingDisplay, setLoadingDisplay] =
    useState<React.CSSProperties["display"]>("none");

  let display = "none";
  function switchDisplay() {
    if (display === "none") {
      display = "flex";
      setLoadingDisplay("flex");
      return;
    }
    display = "none";
    setLoadingDisplay("none");
  }

  return (
    <LoadingContext.Provider value={{ loadingDisplay, switchDisplay }}>
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
