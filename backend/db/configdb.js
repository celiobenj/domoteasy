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
            senhaHash TEXT NOT NULL,
            tipoAssinatura TEXT -- Pode ser null se o usuário for "free" ou sem plano
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
            idUsuario INTEGER NOT NULL UNIQUE, -- Garante que 1 usuário só tem 1 assinatura ativa
            idPlano INTEGER NOT NULL,
            dataInicio TEXT NOT NULL, -- SQLite guarda datas como TEXT (ISO8601) ou INTEGER
            dataExpiracao TEXT NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('ativa', 'inativa', 'cancelada')),
            
            FOREIGN KEY (idUsuario) REFERENCES usuarios(id) ON DELETE CASCADE,
            FOREIGN KEY (idPlano) REFERENCES planos(id)
        )
    `);

    // 4. TABELA PAGAMENTOS (Sugestão Inicial)
    // Um pagamento pertence a uma assinatura (ou diretamente ao usuario, mas assinatura é melhor para rastreio)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS pagamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idAssinatura INTEGER NOT NULL,
            valorPago REAL NOT NULL,
            dataPagamento TEXT DEFAULT CURRENT_TIMESTAMP,
            status TEXT NOT NULL,
            idTransacaoGateway TEXT, -- ID que vem do PayPal/Stripe/PagSeguro
            
            FOREIGN KEY (idAssinatura) REFERENCES assinaturas(id)
        )
    `);

    console.log("Database setup concluído com sucesso.");
}

export { openDb, setupDatabase };