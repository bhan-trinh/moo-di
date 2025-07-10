export type NoteItem = {
  id: number;
  value: string;
  datetime: string;
  user: string;
  mood: number;
  prompt?: string;
};

export const noteItemCol = [
  { attr: 'id', type: 'INTEGER NOT NULL' },
  { attr: 'value', type: 'TEXT NOT NULL' },
  { attr: 'datetime', type: 'TEXT NOT NULL' },
  { attr: 'user', type: 'TEXT NOT NULL' },
  { attr: 'mood', type: 'INTEGER' },
  { attr: 'prompt', type: 'TEXT' },
];
