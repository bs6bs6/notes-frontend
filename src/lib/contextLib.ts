import { createContext, useContext } from "react";
import { AuthService } from "../services/AuthService";

export interface AppContextType {
  isAuthenticated: boolean;
  authService: AuthService;
  userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({
  isAuthenticated: false,
  authService: new AuthService(),
  userHasAuthenticated: useAppContext,
});

export function useAppContext() {
  return useContext(AppContext);
}