import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../api/axios';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  email: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('modulus_token');
    const savedUser = sessionStorage.getItem('modulus_user');
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
        (window as any).__MODULUS_TOKEN__ = savedToken;
      } catch {
        sessionStorage.removeItem('modulus_token');
        sessionStorage.removeItem('modulus_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    // API CALL
    const response = await api.post('/auth/login', { email, password });
    const { token: newToken, user: newUser } = response.data;

    setToken(newToken);
    setUser(newUser);
    (window as any).__MODULUS_TOKEN__ = newToken;

    // Persist to sessionStorage (cleared on tab close)
    sessionStorage.setItem('modulus_token', newToken);
    sessionStorage.setItem('modulus_user', JSON.stringify(newUser));

    return newUser;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    (window as any).__MODULUS_TOKEN__ = null;
    sessionStorage.removeItem('modulus_token');
    sessionStorage.removeItem('modulus_user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        role: user?.role || null,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
