import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserClass from '../classes/user';

interface UserContextType {
  user: UserClass | null;
  setUser: React.Dispatch<React.SetStateAction<UserClass | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserClass | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      axios.get('http://localhost:3000//auth/google/callback', { withCredentials: true })
        .then((response) => {
          setUser(response.data);
          Cookies.set('user', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
