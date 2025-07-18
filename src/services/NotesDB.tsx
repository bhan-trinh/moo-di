import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { NoteItem, noteItemCol } from '../models/NoteItem';

// Set up table name
const tableName = 'notesData';

// Get column names
const getCol = () =>
  noteItemCol
    .map(item => {
      return `${item.attr} ${item.type}`;
    })
    .join(',');

const getAttr = () => noteItemCol.map(col => col.attr).join(',');

const getPlaceholder = () => noteItemCol.map(_ => '?').join(',');

enablePromise(true);

export const getDBConnection = async () => {
  const db = await openDatabase({
    name: 'moomood-track.db',
    location: 'default',
  });
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
            SELECT ${getAttr()} FROM ${tableName};
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

export const saveNoteItems = async (
  db: SQLiteDatabase,
  noteItems: NoteItem[],
) => {
  const insertQuery = `INSERT INTO ${tableName} (${getAttr()}) VALUES (${getPlaceholder()})`;

  const insertParams = noteItems.map(i =>
    getAttr()
      .split(',')
      .map(attr => i[attr as keyof NoteItem]),
  );

  // Run each insert with bindings
  const insertPromises = insertParams.map(params => {
    db.executeSql(insertQuery, params);
  });

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

/*
// Get distinct years
export const getNoteYears = async (db: SQLiteDatabase) => {
  const getYearQuery = `SELECT DISTINCT strftime('%', created_at) as 'Year' FROM ${tableName}`;
  var results = await db.executeSql(getYearQuery);
  const years = [];
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      years.push(result.rows.item(i));
    }
  });
};
*/
