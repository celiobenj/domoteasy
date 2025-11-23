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

    // Habilita chaves estrangeiras no SQLite (importante!)
    await db.exec('PRAGMA foreign_keys = ON;');

    // 1. TABELA USUÁRIOS
    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha_hash TEXT NOT NULL,
            tipo_assinatura TEXT -- Pode ser null se o usuário for "free" ou sem plano
        )
    `);

    // 2. TABELA PLANOS
    await db.exec(`
        CREATE TABLE IF NOT EXISTS planos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            valor REAL NOT NULL, -- float no diagrama vira REAL no SQLite
            descricao TEXT,
            duracao_dias INTEGER NOT NULL
        )
    `);

    // 3. TABELA ASSINATURAS
    // Conecta Usuário ao Plano.
    // Logica 1:1 -> O campo id_usuario deve ser UNIQUE.
    await db.exec(`
        CREATE TABLE IF NOT EXISTS assinaturas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL UNIQUE, -- Garante que 1 usuário só tem 1 assinatura ativa
            id_plano INTEGER NOT NULL,
            data_inicio TEXT NOT NULL, -- SQLite guarda datas como TEXT (ISO8601) ou INTEGER
            data_expiracao TEXT NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('ativa', 'inativa', 'cancelada')),
            
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
            FOREIGN KEY (id_plano) REFERENCES planos(id)
        )
    `);

    // 4. TABELA PAGAMENTOS (Sugestão Inicial)
    // Um pagamento pertence a uma assinatura (ou diretamente ao usuario, mas assinatura é melhor para rastreio)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS pagamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_assinatura INTEGER NOT NULL,
            valor_pago REAL NOT NULL,
            data_pagamento TEXT DEFAULT CURRENT_TIMESTAMP,
            status TEXT NOT NULL,
            id_transacao_gateway TEXT, -- ID que vem do PayPal/Stripe/PagSeguro
            
            FOREIGN KEY (id_assinatura) REFERENCES assinaturas(id)
        )
    `);

    console.log("Database setup concluído com sucesso.");
}

export { openDb, setupDatabase };