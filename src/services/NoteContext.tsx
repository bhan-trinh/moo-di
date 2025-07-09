import { createContext, useState } from 'react';
import { NoteItem } from '../models/NoteItem';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
