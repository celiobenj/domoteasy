import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPath = './db/domot.db';

async function openDb() {
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

async function setupDatabase() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senhaHash TEXT NOT NULL,
            tipoAssinatura TEXT NOT NULL
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS assinaturas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dataInicio DATE NOT NULL,
            dataExpiracao DATE NOT NULL,
            status TEXT NOT NULL DEFAULT 'inativa' 
                   CHECK(status IN ('ativa', 'inativa', 'cancelada'))
        )
    `);
}

export { openDb, setupDatabase }