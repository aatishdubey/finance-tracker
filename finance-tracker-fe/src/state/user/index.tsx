import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

type TUser = User | null;

interface IAuthContext {
  currentUser: TUser;
  token: string | null;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  token: null
});

type Props = {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<TUser>(null);
  const [token, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user) {
        const token = await user.getIdToken();
        setUserToken(token);
      }
      console.log(user);
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useIdToken() {
  const { token } = useContext(AuthContext);
  return token;
}

export function useIsAuthenticated() {
  const { currentUser } = useContext(AuthContext);
  return !!currentUser;
}
