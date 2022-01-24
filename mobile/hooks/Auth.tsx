import { createContext, ReactChild, ReactElement, ReactNode, useContext, useState } from "react";

interface AuthState {
  token: string,
  setToken: (token: string) => void
}

export const AuthContext = createContext<AuthState>({
  token: "",
  setToken: (token: string) => { }
});

export const AuthProvider = (props: { children: ReactNode }) => {
  const [token, setToken] = useState("");


  return <AuthContext.Provider value={{ token, setToken }}>{props.children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext); 