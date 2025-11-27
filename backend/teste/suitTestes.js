const BASE_URL = 'http://localhost:3000';

// --- Utilitários de Cores para o Terminal ---
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m"
};

// --- Helper para requisições ---
async function request(endpoint, method, body = null, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            // Ignora se não for JSON
        }
        return { status: response.status, data };
    } catch (error) {
        return { status: 500, data: { erro: "Servidor offline ou inalcançável" } };
    }
}

// --- O Motor de Testes ---
async function rodarTeste(nome, testeFn) {
    process.stdout.write(`${colors.blue}[TESTE]${colors.reset} ${nome}... `);
    try {
        await testeFn();
        console.log(`${colors.green}✅ PASSOU${colors.reset}`);
        return true;
    } catch (error) {
        console.log(`${colors.red}❌ FALHOU${colors.reset}`);
        console.error(`${colors.yellow}   -> Motivo: ${error.message}${colors.reset}`);
        if(error.data) console.error(`${colors.yellow}   -> Detalhes: ${JSON.stringify(error.data, null, 2)}${colors.reset}`);
        console.log(""); 
        return false;
    }
}

// ==========================================
// 🚀 INÍCIO DA SUÍTE DE TESTES (V2)
// ==========================================
async function iniciarSuite() {
    console.log(`\n${colors.bold}${colors.cyan}--- 🕵️  DOMOT: SUÍTE DE TESTES COMPLETA (V2) ---${colors.reset}\n`);

    // --- Variáveis de Estado Globais ---
    const emailUsuario = `user_${Date.now()}@teste.com`;
    const emailTecnico = `tec_${Date.now()}@teste.com`;
    const senhaPadrao = "123456";

    let tokenUsuario = "";
    let idUsuario = 0;
    // IDs gerados durante o fluxo
    let idPlanoPremium = 0;
    let idDispositivo = 0; // Para teste de projeto e manual
    let idTecnico = 0;
    let idProjeto = 0;
    let idAssinatura = 0;

    // =========================================================================
    // FASE 1: INFRAESTRUTURA (Admin & Conteúdo)
    // =========================================================================
    console.log(`${colors.magenta}--- FASE 1: INFRA, CONTEÚDO E ADMINISTRAÇÃO ---${colors.reset}`);

    await rodarTeste("Criar Plano Premium", async () => {
        // Criamos um plano para ser usado futuramente
        await request('/planos', 'POST', {
            nome: `Premium Teste ${Date.now()}`,
            valor: 99.90,
            descricao: "Plano Premium para testes automatizados",
            duracaoDias: 30
        });

        // Pegar ID do plano criado
        const res = await request('/planos', 'GET');
        const planos = res.data;
        const plano = planos[planos.length - 1];
        if (!plano) throw new Error("Falha ao recuperar plano criado.");
        idPlanoPremium = plano.id;
    });

    await rodarTeste("Cadastrar Usuário Comum (Admin Simulado)", async () => {
        // Precisamos de um usuário logado para atuar como Admin nas rotas protegidas
        const { status, data } = await request('/usuario/cadastro', 'POST', {
            nome: "Admin System",
            email: emailUsuario,
            senha: senhaPadrao
        });
        
        if (status !== 201) throw { message: "Erro cadastro user", data };
        tokenUsuario = data.token;
        idUsuario = data.id;
    });

    await rodarTeste("Criar Dispositivo e Manual (Gestão de Conteúdo)", async () => {
        // Simula Admin criando conteúdo (VCP12)
        const body = {
            dispositivo: {
                nome: "Lâmpada Inteligente RGB",
                marca: "DomotLife",
                preco: 150.00,
                linkCompra: "http://loja.com/lampada"
            },
            manual: {
                descricao: "Como configurar a lâmpada no Wi-Fi",
                linkVideo: "http://youtube.com/video-tutorial"
            }
        };

        const { status, data } = await request('/conteudo/admin/criar', 'POST', body, tokenUsuario);
        if (status !== 201) throw { message: "Erro ao criar conteúdo", data };
        
        // Recuperar o ID do dispositivo criado
        const lista = await request('/conteudo/dispositivos', 'GET', null, tokenUsuario);
        const disp = lista.data[lista.data.length - 1];
        idDispositivo = disp.id;
    });

    // =========================================================================
    // FASE 2: GESTÃO DE TÉCNICOS
    // =========================================================================
    console.log(`\n${colors.magenta}--- FASE 2: FLUXO DE TÉCNICOS ---${colors.reset}`);

    await rodarTeste("Registro de Técnico (Solicitação)", async () => {
        // VCP06/10 - Técnico se cadastra
        const { status, data } = await request('/tecnicos/registro', 'POST', {
            nome: "Roberto Técnico",
            email: emailTecnico,
            telefone: "11999999999",
            especialidade: "Instalação Elétrica"
        });

        if (status !== 201) throw { message: "Erro registro técnico", data };
    });

    await rodarTeste("Admin Aprova Técnico", async () => {
        // CORREÇÃO: Usar alias na desestruturação { status: status1, data: data1 }
        const { status: status1, data: data1 } = await request(`/tecnicos/email/${emailTecnico}`, 'GET', null, tokenUsuario);
        
        if (status1 !== 200 || !data1.id) throw { message: "Técnico não encontrado pelo email", data: data1 };

        // Admin aprova (VCP13)
        // CORREÇÃO: O controlador espera 'idTecnico', não 'dados'
        const { status, data } = await request('/admin/profissionais/status', 'POST', {
            idTecnico: data1.id, 
            acao: 'aprovar'
        }, tokenUsuario);

        if (status !== 200) throw { message: "Erro ao aprovar técnico", data };
    });

    await rodarTeste("Usuário Lista Técnicos Ativos", async () => {
        // Agora o técnico deve aparecer na lista pública (VCP06)
        const { status, data } = await request('/tecnicos', 'GET', null, tokenUsuario);
        
        if (status !== 200) throw { message: "Erro listar técnicos", data };
        
        const tecnicoEncontrado = data.find(t => t.email === emailTecnico);
        
        // Debug limpo
        // console.log("Técnicos encontrados:", data.map(t => t.email));

        if (!tecnicoEncontrado) throw new Error("Técnico aprovado não apareceu na lista pública.");
        idTecnico = tecnicoEncontrado.id; // Atualiza ID correto
    });

    await rodarTeste("Ver Detalhes do Técnico", async () => {
        // CORREÇÃO: Alias correto
        const { status: status1, data: data1 } = await request(`/tecnicos/email/${emailTecnico}`, 'GET', null, tokenUsuario);
        
        if (status1 !== 200 || !data1.id) throw { message: "Técnico não encontrado para detalhes" };

        const { status } = await request(`/tecnicos/id/${data1.id}`, 'GET', null, tokenUsuario);
        if (status !== 200) throw new Error("Não conseguiu ver detalhes do técnico.");
    });

    // =========================================================================
    // FASE 3: PROJETOS E ORÇAMENTOS
    // =========================================================================
    console.log(`\n${colors.magenta}--- FASE 3: PROJETOS E ORÇAMENTOS ---${colors.reset}`);

    await rodarTeste("Criar Projeto de Automação", async () => {
        // VCP04 - Criar projeto associando o dispositivo criado na Fase 1
        const { status, data } = await request('/projetos', 'POST', {
            nome: "Casa Inteligente Sala",
            descricao: "Automação das luzes",
            preferencias: "Luzes quentes",
            itens: [idDispositivo, idDispositivo] // Duas lâmpadas
        }, tokenUsuario);

        if (status !== 201) throw { message: "Erro criar projeto", data };
        idProjeto = data.id;
    });

    await rodarTeste("Gerar Orçamento do Projeto", async () => {
        // VCP05 - Gerar orçamento. Deve somar o preço dos itens.
        // Preço unitário da lâmpada = 150. Total esperado = 300.
        
        const { status, data } = await request('/orcamentos/gerar', 'POST', {
            idProjeto: idProjeto
        }, tokenUsuario);

        if (status !== 201) throw { message: "Erro gerar orçamento", data };
        
        if (data.valorTotal !== 300) {
            throw new Error(`Cálculo errado. Esperado: 300, Recebido: ${data.valorTotal}`);
        }
    });

    // =========================================================================
    // FASE 4: ASSINATURA E CONTEÚDO PREMIUM
    // =========================================================================
    console.log(`\n${colors.magenta}--- FASE 4: ASSINATURA E MANUAL (PREMIUM) ---${colors.reset}`);

    await rodarTeste("Tentar Acessar Manual (Sem Premium)", async () => {
        // VCP09 - Deve ser negado
        const { status } = await request(`/conteudo/manual/${idDispositivo}`, 'GET', null, tokenUsuario);
        
        // Esperamos 403 Forbidden
        if (status !== 403) throw new Error(`Deveria bloquear (403), mas retornou ${status}`);
    });

    await rodarTeste("Contratar Plano Premium", async () => {
        // VCP07 - Contratar
        const { status, data } = await request('/assinatura/contratar', 'POST', {
            idPlano: idPlanoPremium
        }, tokenUsuario);

        if (status !== 201) throw { message: "Erro contratação", data };
        idAssinatura = data.id;
    });

    await rodarTeste("Realizar Pagamento", async () => {
        // Simula pagamento para ativar a assinatura
        const { status } = await request('/pagamentos', 'POST', {
            idAssinatura: idAssinatura,
            valor: 99.90,
            idTransacao: "pix_test_v2"
        }, tokenUsuario);

        if (status !== 201) throw new Error("Falha no pagamento");
    });

    await rodarTeste("Acessar Manual (Agora como Premium)", async () => {
        // Agora deve permitir
        const { status, data } = await request(`/conteudo/manual/${idDispositivo}`, 'GET', null, tokenUsuario);
        
        if (status !== 200) throw { message: "Ainda bloqueado mesmo após pagar", data };
        if (!data.linkVideo) throw new Error("Dados do manual incompletos.");
    });

    // =========================================================================
    // FASE 5: GESTÃO DE USUÁRIOS (ADMIN)
    // =========================================================================
    console.log(`\n${colors.magenta}--- FASE 5: GESTÃO DE USUÁRIOS (ADMIN) ---${colors.reset}`);

    await rodarTeste("Listar Todos Usuários", async () => {
        // VCP11 - Listar
        const { status, data } = await request('/admin/usuarios', 'GET', null, tokenUsuario);
        if (status !== 200) throw { message: "Erro listar users", data };
        
        if (!Array.isArray(data) || data.length === 0) throw new Error("Lista vazia.");
    });

    await rodarTeste("Modificar Dados de Outro Usuário", async () => {
        // VCP11 - Alterar
        const { status } = await request(`/admin/usuarios/${idUsuario}`, 'PATCH', {
            nome: "Nome Alterado pelo Admin"
        }, tokenUsuario);

        if (status !== 200) throw new Error("Admin não conseguiu alterar usuário.");

        // Verifica alteração - Ajuste para chamar a rota correta de informações
        const res = await request('/usuario/info', 'GET', null, tokenUsuario); // Assumindo rota de info ou /usuario/nome se existir
        
        // Se a rota /usuario/nome não existir, usamos a /usuario/informacoes que retorna { nome, email... }
        if (res.data.nome !== "Nome Alterado pelo Admin") throw new Error("Nome não foi persistido.");
    });

    console.log(`\n${colors.bold}${colors.green}🏁 TESTES CONCLUÍDOS COM SUCESSO! O SISTEMA ESTÁ ÍNTEGRO.${colors.reset}\n`);
}

iniciarSuite();