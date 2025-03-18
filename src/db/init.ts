import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
  if (db) return db;

  try {
    db = await SQLite.openDatabaseAsync('app.db');

    await db.execAsync('PRAGMA journal_mod = WAL');
    await db.execAsync('PRAGMA foreign_keys = ON');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          created_at INTEGER DEFAULT CURRENT_TIMESTAMP NOT NULL,
      );
  
      CREATE TABLE IF NOT EXISTS journal (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          user_id INTEGER,
          title TEXT NOT NULL,
          content TEXT,
          created_at INTEGER DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);
    console.log('database connection');
    return db;
  } catch (err) {
    console.error('database connection failed : ', err);
    throw err;
  }
};

export const getDatabase = async () => {
  if (!db) {
    await initDatabase();
  }
  return db;
};
