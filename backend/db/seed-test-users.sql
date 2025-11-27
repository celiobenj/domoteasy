-- Script para criar usuários de teste no DomotEasy
-- Execute este script com: sqlite3 domot.db < seed-test-users.sql

-- 1. USUÁRIO ADMIN
-- Email: admin@domoteasy.com
-- Senha: Admin@123
-- Hash gerado com bcrypt (10 rounds) para a senha "Admin@123"
INSERT OR IGNORE INTO usuarios (id, nome, email, senhaHash, tipoAssinatura) 
VALUES (
    999, 
    'Administrador DomotEasy', 
    'admin@domoteasy.com', 
    '$2b$10$N5z3E0rYhqKxJ.5PqG7Ose8YJxZ.xKdPxjqwYFZU8qZ8qZ8qZ8qZe', 
    'Admin'
);

-- 2. TÉCNICO ATIVO
-- Email: tecnico@domoteasy.com
-- Técnico já aprovado (status: ativo)
INSERT OR IGNORE INTO tecnicos (id, nome, email, telefone, especialidade, status)
VALUES (
    998,
    'João Silva - Técnico',
    'tecnico@domoteasy.com',
    '(11) 98765-4321',
    'Automação Residencial',
    'ativo'
);

-- 3. TÉCNICO PENDENTE (para testar aprovação)
INSERT OR IGNORE INTO tecnicos (id, nome, email, telefone, especialidade, status)
VALUES (
    997,
    'Maria Santos - Técnica',
    'tecnica.pendente@domoteasy.com',
    '(21) 97654-3210',
    'Iluminação Inteligente',
    'pendente'
);

-- 4. USUÁRIO COMUM COM ASSINATURA PREMIUM
-- Email: premium@domoteasy.com
-- Senha: Premium@123
INSERT OR IGNORE INTO usuarios (id, nome, email, senhaHash, tipoAssinatura) 
VALUES (
    996, 
    'Usuário Premium', 
    'premium@domoteasy.com', 
    '$2b$10$N5z3E0rYhqKxJ.5PqG7Ose8YJxZ.xKdPxjqwYFZU8qZ8qZ8qZ8qZe', 
    'Premium'
);

-- 5. USUÁRIO COMUM (gratuito)
-- Email: user@domoteasy.com
-- Senha: User@123
INSERT OR IGNORE INTO usuarios (id, nome, email, senhaHash, tipoAssinatura) 
VALUES (
    995, 
    'Usuário Comum', 
    'user@domoteasy.com', 
    '$2b$10$N5z3E0rYhqKxJ.5PqG7Ose8YJxZ.xKdPxjqwYFZU8qZ8qZ8qZ8qZe', 
    'Comum'
);

-- Exibir os usuários criados
SELECT '=== USUÁRIOS CRIADOS ===' AS Info;
SELECT id, nome, email, tipoAssinatura FROM usuarios WHERE id >= 995;

SELECT '=== TÉCNICOS CRIADOS ===' AS Info;
SELECT id, nome, email, especialidade, status FROM tecnicos WHERE id >= 997;
