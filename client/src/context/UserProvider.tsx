import { FC } from 'react';

import { AuthContext } from 'src/context/authContext';
import { useAuth } from 'src/hooks/useAuth';

export const UserProvider: FC = ({ children }) => {
  const { token, userId, login, logout } = useAuth();
  const isAuthenticated = Boolean(token);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
