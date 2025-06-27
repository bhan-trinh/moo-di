import { enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage"
import { NoteItem } from "./models";

const tableName = 'notesData';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({name:'moomood-track.db', location: 'default'})
}

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL,
        datetime TEXT NOT NULL
    );`;

    await db.executeSql(query);
}

export const getNoteItems = async(db: SQLiteDatabase): Promise<NoteItem[]> => {
    try {
        const noteItems: NoteItem[] = [];
        const results = await db.executeSql(`
            SELECT rowid as id, value FROM ${tableName}
            `)
        results.forEach(result => {
            for (let i = 0; i < result.rows.length; i++){
                noteItems.push(result.rows.item(i))
            }
        });
        return noteItems;
    } catch (error) {
        console.error(error);
        throw Error("Failed to get note items.")
    }
};

export const saveNoteItems = async (db: SQLiteDatabase, noteItems: NoteItem[]) => {
    const insertQuery = 
    `INSERT OR REPLACE INTO ${tableName}(rowid, value, datetime) values` +
    noteItems.map(i => `(${i.id}, '${i.value}', '${i.datetime}')`).join(',')

    return db.executeSql(insertQuery);
}

export const delNoteItem = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE FROM ${tableName} WHERE rowid = ${id}`;
    return db.executeSql(deleteQuery);
}

export const delTable = async (db: SQLiteDatabase) => {
    // Careful of SQLite vs. SQL server
    const query = `DROP TABLE IF EXISTS ${tableName};`
    await db.executeSql(query);
}


