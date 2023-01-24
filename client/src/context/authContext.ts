import { createContext } from 'react';

export interface UserContext {
  login: (token: string, userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userId: string | null | undefined;
}

export const AuthContext = createContext<UserContext>({
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  userId: null,
});
