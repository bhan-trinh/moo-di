import { createContext, useState } from 'react';
import { NoteItem } from '../../models/note';

export const NotesContext = createContext<NoteItem[]>([]);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
