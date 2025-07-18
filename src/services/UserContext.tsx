import { createContext, useState } from 'react';
import { NoteItem } from '../models/NoteItem';

export const UserContext = createContext<string>('moodi');

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState<string>('moodi');
  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
