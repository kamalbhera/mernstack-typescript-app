import { useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

// import { getCookieByName } from 'src/helpers/getCookieByName';

export const useAuth = () => {
  const [token, setToken] = useState<string | null | undefined>(
    localStorage.getItem('accessToken') || null,
  );
  // const [token, setToken] = useState(getCookieByName('accessToken') || null);
  const [userId, setUserId] = useState<string | null | undefined>(
    localStorage.getItem('userId') || null,
  );
  // const [userId, setUserId] = useState<string | null | undefined>(
  //   getCookieByName('userId') || null,
  // );

  const navigate = useNavigate();

  const login = useCallback((accessToken: string, id?: string) => {
    setToken(accessToken);
    setUserId(id);
    // temporary solution
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', id || '');

    // document.cookie = `accessToken=${accessToken};max-age=86400000;`;
    // document.cookie = `userId=${id};max-age=86400000;`;
  }, []);

  const logout = useCallback(() => {
    navigate('auth/login');

    setToken(null);
    setUserId(null);
    localStorage.clear();
    // document.cookie =
    //   'accessToken=;max-age=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    // document.cookie =
    //   'userId=;max-age=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
  }, [navigate]);

  // useEffect(() => {
  //   const cookieAccessToken = getCookieByName('accessToken');
  //   const cookieUserId = getCookieByName('userId');
  //   if (cookieAccessToken && cookieUserId && cookieRole) {
  //     login(cookieAccessToken, cookieUserId, cookieRole);
  //   }
  // }, [token, login, logout]);

  return { login, logout, token, userId };
};
