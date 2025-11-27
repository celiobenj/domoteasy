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
            duracaoDias INTEGER NOT NULL
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

    // 5. TABELA TÉCNICOS (VCP06, VCP10, VCP13)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tecnicos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            telefone TEXT,
            especialidade TEXT,
            status TEXT DEFAULT 'pendente' CHECK(status IN ('pendente', 'ativo', 'inativo', 'reprovado'))
        )
    `);

    // 6. TABELA DISPOSITIVOS (VCP09, VCP12)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS dispositivos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            marca TEXT,
            preco REAL NOT NULL,
            linkCompra TEXT
        )
    `);

    // 7. TABELA MANUAIS (1:1 com Dispositivos - VCP09, VCP12)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS manuais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idDispositivo INTEGER NOT NULL UNIQUE,
            descricao TEXT,
            linkVideo TEXT,
            FOREIGN KEY (idDispositivo) REFERENCES dispositivos(id) ON DELETE CASCADE
        )
    `);

    // 8. TABELA PROJETOS (VCP04)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS projetos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idUsuario INTEGER NOT NULL,
            nome TEXT NOT NULL,
            descricao TEXT,
            dataCriacao TEXT DEFAULT CURRENT_TIMESTAMP,
            preferencias TEXT,
            FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
        )
    `);

    // 9. TABELA DE JUNÇÃO: ITENS DO PROJETO (N:N entre Projetos e Dispositivos - VCP04/SD04)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS itens_projeto (
            idProjeto INTEGER NOT NULL,
            idDispositivo INTEGER NOT NULL,
            quantidade INTEGER DEFAULT 1,
            FOREIGN KEY (idProjeto) REFERENCES projetos(id) ON DELETE CASCADE,
            FOREIGN KEY (idDispositivo) REFERENCES dispositivos(id)
        )
    `);

    // 10. TABELA ORÇAMENTOS (VCP05)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS orcamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idProjeto INTEGER NOT NULL,
            valorTotal REAL NOT NULL,
            dataGeracao TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idProjeto) REFERENCES projetos(id)
        )
    `);

    console.log("Database setup concluído com sucesso.");
}

export { openDb, setupDatabase };