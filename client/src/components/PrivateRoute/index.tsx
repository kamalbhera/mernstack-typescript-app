import { FC, useContext } from 'react';

import { Navigate } from 'react-router-dom';

import { AuthContext } from 'src/context/authContext';

const PrivateRoute: FC = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
