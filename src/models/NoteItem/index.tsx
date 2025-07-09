export type NoteItem = {
  id: number;
  value: string;
  datetime: string;
  user: string;
  mood: number;
  prompt?: string;
};

export const colMap = {
  id: ['id', 'INTEGER NOT NULL'],
  value: ['value', 'TEXT NOT NULL'],
  datetime: ['datetime', 'TEXT NOT NULL'],
  user: ['user', 'TEXT NOT NULL'],
  mood: ['mood', 'INTEGER'],
  prompt: ['prompt', 'TEXT'],
};
