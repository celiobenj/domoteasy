import bcrypt from 'bcrypt';
import { openDb } from './configdb.js';

/**
 * Script para criar usuários de teste com senhas hasheadas corretamente
 * Execute: node db/create-test-users.js
 */

async function createTestUsers() {
    const db = await openDb();

    try {
        console.log('🔧 Criando usuários de teste...\n');

        // Gerar hashes de senha
        const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
        const userPasswordHash = await bcrypt.hash('User@123', 10);
        const premiumPasswordHash = await bcrypt.hash('Premium@123', 10);

        // 1. USUÁRIO ADMIN
        console.log('👤 Criando Administrador...');
        await db.run(`
            INSERT OR REPLACE INTO usuarios (id, nome, email, senhaHash, tipoAssinatura) 
            VALUES (?, ?, ?, ?, ?)
        `, [999, 'Administrador DomotEasy', 'admin@domoteasy.com', adminPasswordHash, 'Admin']);

        console.log('   ✅ Email: admin@domoteasy.com');
        console.log('   ✅ Senha: Admin@123');
        console.log('   ✅ Tipo: Admin\n');

        // 2. USUÁRIO PREMIUM
        console.log('⭐ Criando Usuário Premium...');
        await db.run(`
            INSERT OR REPLACE INTO usuarios (id, nome, email, senhaHash, tipoAssinatura) 
            VALUES (?, ?, ?, ?, ?)
        `, [996, 'Usuário Premium', 'premium@domoteasy.com', premiumPasswordHash, 'Premium']);

        console.log('   ✅ Email: premium@domoteasy.com');
        console.log('   ✅ Senha: Premium@123');
        console.log('   ✅ Tipo: Premium\n');

        // 3. USUÁRIO COMUM
        console.log('👤 Criando Usuário Comum...');
        await db.run(`
            INSERT OR REPLACE INTO usuarios (id, nome, email, senhaHash, tipoAssinatura) 
            VALUES (?, ?, ?, ?, ?)
        `, [995, 'Usuário Comum', 'user@domoteasy.com', userPasswordHash, 'Comum']);

        console.log('   ✅ Email: user@domoteasy.com');
        console.log('   ✅ Senha: User@123');
        console.log('   ✅ Tipo: Comum\n');

        // 4. TÉCNICO ATIVO
        console.log('🔧 Criando Técnico Ativo...');
        await db.run(`
            INSERT OR REPLACE INTO tecnicos (id, nome, email, telefone, especialidade, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [998, 'João Silva', 'tecnico@domoteasy.com', '(11) 98765-4321', 'Automação Residencial', 'ativo']);

        console.log('   ✅ Nome: João Silva');
        console.log('   ✅ Email: tecnico@domoteasy.com');
        console.log('   ✅ Especialidade: Automação Residencial');
        console.log('   ✅ Status: ativo\n');

        // 5. TÉCNICO PENDENTE (para testar aprovação)
        console.log('⏳ Criando Técnico Pendente...');
        await db.run(`
            INSERT OR REPLACE INTO tecnicos (id, nome, email, telefone, especialidade, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [997, 'Maria Santos', 'tecnica.pendente@domoteasy.com', '(21) 97654-3210', 'Iluminação Inteligente', 'pendente']);

        console.log('   ✅ Nome: Maria Santos');
        console.log('   ✅ Email: tecnica.pendente@domoteasy.com');
        console.log('   ✅ Especialidade: Iluminação Inteligente');
        console.log('   ✅ Status: pendente\n');

        // 6. TÉCNICO REPROVADO (para testar reativação)
        console.log('❌ Criando Técnico Reprovado...');
        await db.run(`
            INSERT OR REPLACE INTO tecnicos (id, nome, email, telefone, especialidade, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [996, 'Carlos Oliveira', 'tecnico.reprovado@domoteasy.com', '(31) 96543-2109', 'Segurança Eletrônica', 'reprovado']);

        console.log('   ✅ Nome: Carlos Oliveira');
        console.log('   ✅ Email: tecnico.reprovado@domoteasy.com');
        console.log('   ✅ Especialidade: Segurança Eletrônica');
        console.log('   ✅ Status: reprovado\n');

        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ TODOS OS USUÁRIOS DE TESTE FORAM CRIADOS COM SUCESSO!');
        console.log('═══════════════════════════════════════════════════════\n');

        console.log('📝 RESUMO DE CREDENCIAIS:\n');
        console.log('┌─────────────────────────────────────────────────────┐');
        console.log('│ ADMIN:                                              │');
        console.log('│   Email: admin@domoteasy.com                        │');
        console.log('│   Senha: Admin@123                                  │');
        console.log('│   Tipo: Admin                                       │');
        console.log('├─────────────────────────────────────────────────────┤');
        console.log('│ USUÁRIO PREMIUM:                                    │');
        console.log('│   Email: premium@domoteasy.com                      │');
        console.log('│   Senha: Premium@123                                │');
        console.log('│   Tipo: Premium                                     │');
        console.log('├─────────────────────────────────────────────────────┤');
        console.log('│ USUÁRIO COMUM:                                      │');
        console.log('│   Email: user@domoteasy.com                         │');
        console.log('│   Senha: User@123                                   │');
        console.log('│   Tipo: Comum                                       │');
        console.log('└─────────────────────────────────────────────────────┘\n');

        console.log('┌─────────────────────────────────────────────────────┐');
        console.log('│ TÉCNICOS (não precisam de senha - não fazem login) │');
        console.log('├─────────────────────────────────────────────────────┤');
        console.log('│ 1. João Silva (ATIVO)                               │');
        console.log('│    Email: tecnico@domoteasy.com                     │');
        console.log('├─────────────────────────────────────────────────────┤');
        console.log('│ 2. Maria Santos (PENDENTE - testar aprovação)       │');
        console.log('│    Email: tecnica.pendente@domoteasy.com            │');
        console.log('├─────────────────────────────────────────────────────┤');
        console.log('│ 3. Carlos Oliveira (REPROVADO - testar reativação)  │');
        console.log('│    Email: tecnico.reprovado@domoteasy.com           │');
        console.log('└─────────────────────────────────────────────────────┘\n');

    } catch (error) {
        console.error('❌ Erro ao criar usuários de teste:', error);
        throw error;
    } finally {
        await db.close();
    }
}

// Executar o script
createTestUsers()
    .then(() => {
        console.log('🎉 Script finalizado!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Falha na execução:', error);
        process.exit(1);
    });
