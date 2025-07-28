export type NoteItem = {
  id: number;
  value: string;
  created_at: string;
  user: string;
  mood: number;
  prompt?: string | null;
};

export const noteItemCol = [
  { attr: 'id', type: 'INTEGER NOT NULL' },
  { attr: 'value', type: 'TEXT NOT NULL' },
  { attr: 'created_at', type: 'TEXT NOT NULL' },
  { attr: 'user', type: 'TEXT NOT NULL' },
  { attr: 'mood', type: 'INTEGER' },
  { attr: 'prompt', type: 'TEXT' },
];
