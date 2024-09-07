import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

import axios, { endpoints } from 'src/utils/axios';

import { STORAGE_KEY, STORAGE_USER } from './constant';
import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';
import { getCookie } from 'src/utils/cookie';

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY) || getCookie('access-token');
      const user = JSON.parse(sessionStorage.getItem(STORAGE_USER)); // Parse user from JSON string


      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // Set the user state with the parsed user data and the access token
        setState({ user: { ...user, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
 
  const status = state.loading ? 'loading' : checkAuthenticated;

  console.log({status})
  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
          ...state.user,
          role: state.user?.role ?? 'admin',
        }
        : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  console.log({memoizedValue})
  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
