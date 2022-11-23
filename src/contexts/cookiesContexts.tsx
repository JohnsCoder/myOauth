import { AxiosResponse } from "axios";
import { createContext, ReactNode } from "react";

type cookies = {
  add: (value: AxiosResponse) => void;
  remove: () => void;
  get: () => string;
};

interface CookiesContextInterface {
  cookies: cookies;
}
export const CookiesContext = createContext({} as CookiesContextInterface);

function CookiesProvider({ children }: { children: ReactNode }) {
  const cookies: cookies = {
    add(value) {
      document.cookie = `loginToken=${value}; expires=${new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      )}; place="/"; SameSite=strict; Secure";`;
    },
    remove() {
      document.cookie = `loginToken=""; expires=${Date()}`;
    },
    get() {
      return document.cookie.split("=")[1];
    },
  };

  return (
    <CookiesContext.Provider value={{ cookies }}>
      {children}
    </CookiesContext.Provider>
  );
}

export default CookiesProvider;
