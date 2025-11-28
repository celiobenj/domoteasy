import bcrypt from 'bcrypt';
import { openDb } from './configdb.js';

/**
 * Script completo para criar dados de teste para DomotEasy
 * 
 * Este script cria:
 * - Diferentes tipos de usuários (Admin, Premium, Comum)
 * - Técnicos com diferentes status
 * - Dispositivos variados com manuais
 * - Planos de assinatura
 * - Assinaturas ativas para usuários
 * - Projetos de exemplo
 * - Orçamentos
 * 
 * Execute: node db/populate-test-data.js
 */

async function populateTestData() {
    const db = await openDb();

    try {
        console.log('🚀 Iniciando população do banco de dados com dados de teste...\n');

        // ============================================
        // 1. CRIAR USUÁRIOS
        // ============================================
        console.log('👥 Criando usuários de teste...');

        const users = [
            {
                id: 1000,
                nome: 'João Administrador',
                email: 'admin@domoteasy.com',
                senha: 'Admin@123',
                tipoAssinatura: 'Admin'
            },
            {
                id: 1001,
                nome: 'Maria Premium',
                email: 'premium@domoteasy.com',
                senha: 'Premium@123',
                tipoAssinatura: 'Premium'
            },
            {
                id: 1002,
                nome: 'Pedro Silva',
                email: 'user@domoteasy.com',
                senha: 'User@123',
                tipoAssinatura: 'Comum'
            },
            {
                id: 1003,
                nome: 'Ana Costa',
                email: 'ana.costa@email.com',
                senha: 'Ana@123',
                tipoAssinatura: null
            },
            {
                id: 1004,
                nome: 'Carlos Ferreira',
                email: 'carlos.f@email.com',
                senha: 'Carlos@123',
                tipoAssinatura: 'Premium'
            }
        ];

        for (const user of users) {
            const hash = await bcrypt.hash(user.senha, 10);
            await db.run(`
                INSERT OR REPLACE INTO usuarios (id, nome, email, senhaHash, tipoAssinatura) 
                VALUES (?, ?, ?, ?, ?)
            `, [user.id, user.nome, user.email, hash, user.tipoAssinatura]);
            console.log(`   ✅ ${user.nome} (${user.email})`);
        }

        // ============================================
        // 2. CRIAR TÉCNICOS
        // ============================================
        console.log('\n🔧 Criando técnicos...');

        const tecnicos = [
            {
                id: 2000,
                nome: 'Roberto Técnico',
                email: 'roberto.tecnico@domoteasy.com',
                telefone: '(11) 98765-4321',
                especialidade: 'Automação Residencial',
                status: 'ativo'
            },
            {
                id: 2001,
                nome: 'Juliana Santos',
                email: 'juliana.santos@domoteasy.com',
                telefone: '(21) 97654-3210',
                especialidade: 'Iluminação Inteligente',
                status: 'ativo'
            },
            {
                id: 2002,
                nome: 'Marcos Oliveira',
                email: 'marcos.oliveira@domoteasy.com',
                telefone: '(31) 96543-2109',
                especialidade: 'Segurança Eletrônica',
                status: 'pendente'
            },
            {
                id: 2003,
                nome: 'Fernanda Lima',
                email: 'fernanda.lima@domoteasy.com',
                telefone: '(41) 95432-1098',
                especialidade: 'Climatização Inteligente',
                status: 'reprovado'
            },
            {
                id: 2004,
                nome: 'Paulo Andrade',
                email: 'paulo.andrade@domoteasy.com',
                telefone: '(51) 94321-0987',
                especialidade: 'Áudio e Vídeo',
                status: 'inativo'
            }
        ];

        for (const tec of tecnicos) {
            await db.run(`
                INSERT OR REPLACE INTO tecnicos (id, nome, email, telefone, especialidade, status)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [tec.id, tec.nome, tec.email, tec.telefone, tec.especialidade, tec.status]);
            console.log(`   ✅ ${tec.nome} - ${tec.especialidade} (${tec.status})`);
        }

        // ============================================
        // 3. CRIAR DISPOSITIVOS
        // ============================================
        console.log('\n📱 Criando dispositivos...');

        const dispositivos = [
            {
                id: 3000,
                nome: 'Lâmpada Inteligente Wi-Fi RGB',
                marca: 'Positivo Casa Inteligente',
                preco: 89.90,
                linkCompra: 'https://loja.positivo.com.br/lampada-wifi-rgb'
            },
            {
                id: 3001,
                nome: 'Tomada Inteligente Wi-Fi',
                marca: 'Intelbras',
                preco: 79.90,
                linkCompra: 'https://loja.intelbras.com/tomada-wifi'
            },
            {
                id: 3002,
                nome: 'Câmera de Segurança Full HD',
                marca: 'Intelbras',
                preco: 299.90,
                linkCompra: 'https://loja.intelbras.com/camera-seguranca'
            },
            {
                id: 3003,
                nome: 'Sensor de Presença Wi-Fi',
                marca: 'Sonoff',
                preco: 45.90,
                linkCompra: 'https://produto.mercadolivre.com.br/sensor-presenca'
            },
            {
                id: 3004,
                nome: 'Fechadura Digital Biométrica',
                marca: 'Yale',
                preco: 1299.00,
                linkCompra: 'https://loja.yale.com.br/fechadura-digital'
            },
            {
                id: 3005,
                nome: 'Termostato Inteligente',
                marca: 'Nest',
                preco: 899.00,
                linkCompra: 'https://store.google.com/nest-thermostat'
            },
            {
                id: 3006,
                nome: 'Campainha com Vídeo',
                marca: 'Ring',
                preco: 599.00,
                linkCompra: 'https://ring.com/br/campainha-video'
            },
            {
                id: 3007,
                nome: 'Interruptor Inteligente',
                marca: 'Sonoff',
                preco: 65.90,
                linkCompra: 'https://produto.mercadolivre.com.br/interruptor-sonoff'
            },
            {
                id: 3008,
                nome: 'Cortina Automatizada Wi-Fi',
                marca: 'Persianex',
                preco: 1890.00,
                linkCompra: 'https://persianex.com.br/cortina-automatizada'
            },
            {
                id: 3009,
                nome: 'Hub Central de Automação',
                marca: 'Samsung SmartThings',
                preco: 399.00,
                linkCompra: 'https://samsung.com/br/smartthings-hub'
            }
        ];

        for (const disp of dispositivos) {
            await db.run(`
                INSERT OR REPLACE INTO dispositivos (id, nome, marca, preco, linkCompra)
                VALUES (?, ?, ?, ?, ?)
            `, [disp.id, disp.nome, disp.marca, disp.preco, disp.linkCompra]);
            console.log(`   ✅ ${disp.nome} - R$ ${disp.preco}`);
        }

        // ============================================
        // 4. CRIAR MANUAIS PARA OS DISPOSITIVOS
        // ============================================
        console.log('\n📚 Criando manuais...');

        const manuais = [
            {
                idDispositivo: 3000,
                descricao: 'Manual de instalação e configuração da lâmpada inteligente RGB. Conecte via Wi-Fi e controle por voz ou app.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-lampada'
            },
            {
                idDispositivo: 3001,
                descricao: 'Guia completo para instalação da tomada inteligente. Compatible com Alexa e Google Home.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-tomada'
            },
            {
                idDispositivo: 3002,
                descricao: 'Passo a passo para instalação e configuração da câmera de segurança Full HD com visão noturna.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-camera'
            },
            {
                idDispositivo: 3003,
                descricao: 'Como instalar e configurar o sensor de presença para automações inteligentes.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-sensor'
            },
            {
                idDispositivo: 3004,
                descricao: 'Manual completo de instalação da fechadura digital biométrica com backup de senha.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-fechadura'
            },
            {
                idDispositivo: 3005,
                descricao: 'Guia de instalação do termostato inteligente com aprendizado de padrões de uso.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-termostato'
            },
            {
                idDispositivo: 3006,
                descricao: 'Como instalar a campainha com vídeo e conectar ao app para monitoramento remoto.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-campainha'
            },
            {
                idDispositivo: 3007,
                descricao: 'Manual de instalação do interruptor inteligente compatível com sistemas de automação.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-interruptor'
            },
            {
                idDispositivo: 3008,
                descricao: 'Guia de instalação e programação da cortina automatizada com controle por app e automações.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-cortina'
            },
            {
                idDispositivo: 3009,
                descricao: 'Como configurar o hub central para integrar todos os dispositivos da casa inteligente.',
                linkVideo: 'https://youtube.com/watch?v=exemplo-hub'
            }
        ];

        for (const manual of manuais) {
            await db.run(`
                INSERT OR REPLACE INTO manuais (idDispositivo, descricao, linkVideo)
                VALUES (?, ?, ?)
            `, [manual.idDispositivo, manual.descricao, manual.linkVideo]);
        }
        console.log(`   ✅ ${manuais.length} manuais criados`);

        // ============================================
        // 5. CRIAR PLANOS
        // ============================================
        console.log('\n💎 Criando planos de assinatura...');

        const planos = [
            {
                id: 4000,
                nome: 'Básico',
                valor: 29.90,
                descricao: 'Acesso a catálogo básico de dispositivos e suporte por email',
                duracaoDias: 30
            },
            {
                id: 4001,
                nome: 'Premium',
                valor: 59.90,
                descricao: 'Acesso completo ao catálogo, projetos ilimitados e suporte prioritário',
                duracaoDias: 30
            },
            {
                id: 4002,
                nome: 'Profissional',
                valor: 149.90,
                descricao: 'Para técnicos e instaladores, com ferramentas avançadas de orçamento',
                duracaoDias: 30
            }
        ];

        for (const plano of planos) {
            await db.run(`
                INSERT OR REPLACE INTO planos (id, nome, valor, descricao, duracaoDias)
                VALUES (?, ?, ?, ?, ?)
            `, [plano.id, plano.nome, plano.valor, plano.descricao, plano.duracaoDias]);
            console.log(`   ✅ ${plano.nome} - R$ ${plano.valor}/mês`);
        }

        // ============================================
        // 6. CRIAR ASSINATURAS
        // ============================================
        console.log('\n📅 Criando assinaturas...');

        const hoje = new Date();
        const daquiA30Dias = new Date(hoje);
        daquiA30Dias.setDate(daquiA30Dias.getDate() + 30);

        const assinaturas = [
            {
                idUsuario: 1001, // Maria Premium
                idPlano: 4001,
                dataInicio: hoje.toISOString().split('T')[0],
                dataExpiracao: daquiA30Dias.toISOString().split('T')[0],
                status: 'ativa'
            },
            {
                idUsuario: 1004, // Carlos Ferreira
                idPlano: 4001,
                dataInicio: hoje.toISOString().split('T')[0],
                dataExpiracao: daquiA30Dias.toISOString().split('T')[0],
                status: 'ativa'
            }
        ];

        for (const assinatura of assinaturas) {
            await db.run(`
                INSERT OR REPLACE INTO assinaturas (idUsuario, idPlano, dataInicio, dataExpiracao, status)
                VALUES (?, ?, ?, ?, ?)
            `, [assinatura.idUsuario, assinatura.idPlano, assinatura.dataInicio, assinatura.dataExpiracao, assinatura.status]);
        }
        console.log(`   ✅ ${assinaturas.length} assinaturas criadas`);

        // ============================================
        // 7. CRIAR PROJETOS
        // ============================================
        console.log('\n🏠 Criando projetos...');

        const projetos = [
            {
                id: 5000,
                idUsuario: 1001, // Maria Premium
                nome: 'Automação Sala de Estar',
                descricao: 'Projeto completo de automação da sala com iluminação inteligente',
                preferencias: JSON.stringify({ cor_favorita: 'azul', estilo: 'moderno' })
            },
            {
                id: 5001,
                idUsuario: 1002, // Pedro Silva
                nome: 'Segurança Residencial',
                descricao: 'Sistema de segurança com câmeras e sensores',
                preferencias: JSON.stringify({ prioridade: 'seguranca' })
            },
            {
                id: 5002,
                idUsuario: 1004, // Carlos Ferreira
                nome: 'Casa Completa',
                descricao: 'Automação completa de todos os cômodos',
                preferencias: JSON.stringify({ orcamento: 'alto', prioridade: 'conforto' })
            },
            {
                id: 5003,
                idUsuario: 1001, // Maria Premium
                nome: 'Quarto Smart',
                descricao: 'Automação do quarto com cortinas e iluminação',
                preferencias: JSON.stringify({ ambiente: 'relaxante' })
            }
        ];

        for (const projeto of projetos) {
            await db.run(`
                INSERT OR REPLACE INTO projetos (id, idUsuario, nome, descricao, preferencias)
                VALUES (?, ?, ?, ?, ?)
            `, [projeto.id, projeto.idUsuario, projeto.nome, projeto.descricao, projeto.preferencias]);
            console.log(`   ✅ ${projeto.nome}`);
        }

        // ============================================
        // 8. ADICIONAR ITENS AOS PROJETOS
        // ============================================
        console.log('\n🛒 Adicionando itens aos projetos...');

        const itensProjeto = [
            // Projeto: Automação Sala de Estar (5000)
            { idProjeto: 5000, idDispositivo: 3000, quantidade: 3 }, // 3 Lâmpadas RGB
            { idProjeto: 5000, idDispositivo: 3001, quantidade: 2 }, // 2 Tomadas
            { idProjeto: 5000, idDispositivo: 3009, quantidade: 1 }, // 1 Hub

            // Projeto: Segurança Residencial (5001)
            { idProjeto: 5001, idDispositivo: 3002, quantidade: 4 }, // 4 Câmeras
            { idProjeto: 5001, idDispositivo: 3003, quantidade: 6 }, // 6 Sensores
            { idProjeto: 5001, idDispositivo: 3004, quantidade: 1 }, // 1 Fechadura
            { idProjeto: 5001, idDispositivo: 3006, quantidade: 1 }, // 1 Campainha

            // Projeto: Casa Completa (5002)
            { idProjeto: 5002, idDispositivo: 3000, quantidade: 10 }, // 10 Lâmpadas
            { idProjeto: 5002, idDispositivo: 3001, quantidade: 8 }, // 8 Tomadas
            { idProjeto: 5002, idDispositivo: 3002, quantidade: 5 }, // 5 Câmeras
            { idProjeto: 5002, idDispositivo: 3003, quantidade: 8 }, // 8 Sensores
            { idProjeto: 5002, idDispositivo: 3004, quantidade: 2 }, // 2 Fechaduras
            { idProjeto: 5002, idDispositivo: 3005, quantidade: 2 }, // 2 Termostatos
            { idProjeto: 5002, idDispositivo: 3007, quantidade: 15 }, // 15 Interruptores
            { idProjeto: 5002, idDispositivo: 3008, quantidade: 4 }, // 4 Cortinas
            { idProjeto: 5002, idDispositivo: 3009, quantidade: 1 }, // 1 Hub

            // Projeto: Quarto Smart (5003)
            { idProjeto: 5003, idDispositivo: 3000, quantidade: 2 }, // 2 Lâmpadas
            { idProjeto: 5003, idDispositivo: 3007, quantidade: 2 }, // 2 Interruptores
            { idProjeto: 5003, idDispositivo: 3008, quantidade: 1 }, // 1 Cortina
        ];

        for (const item of itensProjeto) {
            await db.run(`
                INSERT OR REPLACE INTO itens_projeto (idProjeto, idDispositivo, quantidade)
                VALUES (?, ?, ?)
            `, [item.idProjeto, item.idDispositivo, item.quantidade]);
        }
        console.log(`   ✅ ${itensProjeto.length} itens adicionados aos projetos`);

        // ============================================
        // 9. CRIAR ORÇAMENTOS
        // ============================================
        console.log('\n💰 Criando orçamentos...');

        const orcamentos = [
            { idProjeto: 5000, valorTotal: 668.70 }, // Sala de Estar
            { idProjeto: 5001, valorTotal: 2273.40 }, // Segurança
            { idProjeto: 5002, valorTotal: 12863.50 }, // Casa Completa
            { idProjeto: 5003, valorTotal: 2069.80 }, // Quarto Smart
        ];

        for (const orcamento of orcamentos) {
            await db.run(`
                INSERT OR REPLACE INTO orcamentos (idProjeto, valorTotal)
                VALUES (?, ?)
            `, [orcamento.idProjeto, orcamento.valorTotal]);
        }
        console.log(`   ✅ ${orcamentos.length} orçamentos criados`);

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('✅ TODOS OS DADOS DE TESTE FORAM CRIADOS COM SUCESSO!');
        console.log('═══════════════════════════════════════════════════════\n');

        // ============================================
        // RESUMO
        // ============================================
        console.log('📊 RESUMO DA POPULAÇÃO:\n');
        console.log(`   👥 Usuários: ${users.length}`);
        console.log(`   🔧 Técnicos: ${tecnicos.length}`);
        console.log(`   📱 Dispositivos: ${dispositivos.length}`);
        console.log(`   📚 Manuais: ${manuais.length}`);
        console.log(`   💎 Planos: ${planos.length}`);
        console.log(`   📅 Assinaturas: ${assinaturas.length}`);
        console.log(`   🏠 Projetos: ${projetos.length}`);
        console.log(`   🛒 Itens de Projeto: ${itensProjeto.length}`);
        console.log(`   💰 Orçamentos: ${orcamentos.length}\n`);

    } catch (error) {
        console.error('❌ Erro ao popular banco de dados:', error);
        throw error;
    } finally {
        await db.close();
    }
}

// Executar o script
populateTestData()
    .then(() => {
        console.log('🎉 Script finalizado com sucesso!');
        console.log('📄 Confira o arquivo USUARIOS-TESTE.md para ver todas as credenciais\n');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Falha na execução:', error);
        process.exit(1);
    });
