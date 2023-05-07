import sqlite3 from "sqlite3";
import fs from "fs";

function createTable(db) {
  db.exec(`
      CREATE TABLE monuments
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        string_list VARCHAR(255) NOT NULL,
        monument_name   VARCHAR(50) NOT NULL,
        monument_location   VARCHAR(50),
        creator_name   VARCHAR(50) NOT NULL,
        creator_location   VARCHAR(50),
        params VARCHAR(50) NOT NULL,
        structure INTEGER NOT NULL,
        color INTEGER NOT NULL,
        movement INTEGER NOT NULL
      );
    `);
}

function createDbConnection(filepath) {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    return db;
  }
}

export { createDbConnection };
