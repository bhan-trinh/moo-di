import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { NoteItem, colMap } from '../models/NoteItem';
import { MoodLabel } from '../models/MoodLabel';

const tableName = 'notesData';
const getCol = () =>
  Object.keys(colMap)
    .map((key: string) => {
      return `${key} ${colMap[key][1]}`;
    })
    .join(',');

const getColNames = () => Object.keys(colMap).join(',');

const getColAliases = () =>
  Object.keys(colMap)
    .map(key => (key === colMap[key][0] ? key : `${key} as ${colMap[key][0]}`))
    .join(',');

const getAttr = () =>
  Object.values(colMap)
    .map(val => val[0])
    .join(',');

const getPlaceholder = () =>
  Object.values(colMap)
    .map(val => '?')
    .join(',');
enablePromise(true);

export const getDBConnection = async () => {
  const db = await openDatabase({
    name: 'moomood-track.db',
    location: 'default',
  });
  console.log('Database connection established');
  return db;
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
        ${getCol()},
        PRIMARY KEY (id)
    );`;

  await db.executeSql(query);
};

export const getNoteItems = async (db: SQLiteDatabase): Promise<NoteItem[]> => {
  try {
    const noteItems: NoteItem[] = [];
    const results = await db.executeSql(`
            SELECT ${getColAliases()} FROM ${tableName};
            `);
    results.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        noteItems.push(result.rows.item(i));
      }
    });
    return noteItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get note items.');
  }
};

/*
export const getMood = async (db: SQLiteDatabase): Promise<MoodLabel[]> => {
  try {
    var moods: MoodLabel[] = [];
    const results = await db.executeSql(`
            SELECT rowid as label, mood as value FROM ${tableName};
            `);
    results.forEach(result => {

      
      for (let i = 0; i < result.rows.length; i++) {
              moods.push(result.rows.item(i))
              console.log(result.rows.item(i))
      }
  });
  return moods
    // return moods;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get note items.');
  }
};*/

export const saveNoteItems = async (
  db: SQLiteDatabase,
  noteItems: NoteItem[],
) => {
  const insertQuery = `INSERT OR REPLACE INTO ${tableName} (${getColNames()}) VALUES (${getPlaceholder()})`;

  const insertParams = noteItems.map(i =>
    getAttr()
      .split(',')
      .map(attr => i[attr]),
  );

  // Run each insert with bindings
  const insertPromises = insertParams.map(params =>
    db.executeSql(insertQuery, params),
  );

  return Promise.all(insertPromises);
};

export const delNoteItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE FROM ${tableName} WHERE rowid = ${id}`;
  return await db.executeSql(deleteQuery);
};

export const delTable = async (db: SQLiteDatabase) => {
  // Careful of SQLite vs. SQL server
  const query = `DROP TABLE IF EXISTS ${tableName};`;
  await db.executeSql(query);
};
