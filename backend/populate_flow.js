
// Node 18+ has native fetch support.
// Note: Node 18+ has native fetch, so import might not be needed if running with node directly. 
// But to be safe with older environments or specific configs, we'll use native fetch global.

const BASE_URL = 'http://localhost:3000';

async function main() {
    console.log("=== Iniciando Fluxo de População de Dados ===");

    // 1. Criar Usuário Admin
    console.log("\n1. Criando Usuário Admin...");
    let token = '';
    let adminId = '';

    const adminUser = {
        nome: "Admin Principal",
        email: "admin@domoteasy.com",
        senha: "admin123"
    };

    try {
        let res = await fetch(`${BASE_URL}/usuario/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminUser)
        });

        if (res.status === 201) {
            const data = await res.json();
            console.log("   ✅ Usuário criado com sucesso!");
            token = data.token;
            adminId = data.id;
        } else if (res.status === 409) {
            console.log("   ⚠️ Usuário já existe. Tentando login...");
            // Login
            res = await fetch(`${BASE_URL}/usuario/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: adminUser.email, senha: adminUser.senha })
            });
            const data = await res.json();
            if (res.status === 200) {
                console.log("   ✅ Login realizado com sucesso!");
                token = data.token;
                adminId = data.id;
            } else {
                console.error("   ❌ Falha no login:", data);
                return;
            }
        } else {
            console.error("   ❌ Erro ao criar usuário:", await res.json());
            return;
        }
    } catch (e) {
        console.error("   ❌ Erro de conexão. O servidor está rodando? (node index.js)");
        return;
    }

    // 2. Criar Técnico
    console.log("\n2. Criando Técnico...");
    const tecnico = {
        nome: "Técnico Exemplo",
        email: "tecnico@exemplo.com",
        telefone: "11999998888",
        especialidade: "Instalação Geral"
    };

    let tecnicoId = '';

    try {
        // Primeiro verificamos se já existe (opcional, mas o endpoint de cadastro pode falhar se duplicado)
        // O endpoint de cadastro é /tecnicos/registro
        let res = await fetch(`${BASE_URL}/tecnicos/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tecnico)
        });

        const data = await res.json();
        if (res.status === 201) {
            console.log("   ✅ Técnico cadastrado com sucesso! ID:", data.id);
            tecnicoId = data.id;
        } else if (res.status === 409 || (data.erro && data.erro.includes("UNIQUE constraint"))) {
            console.log("   ⚠️ Técnico já existe. Buscando ID...");
            // Tentar buscar por email (precisa de token)
            res = await fetch(`${BASE_URL}/tecnicos/email/${tecnico.email}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const tecData = await res.json();
            if (res.status === 200) {
                tecnicoId = tecData.id;
                console.log("   ✅ ID do técnico recuperado:", tecnicoId);
            } else {
                console.error("   ❌ Não foi possível recuperar o técnico:", tecData);
            }
        } else {
            console.error("   ❌ Erro ao cadastrar técnico:", data);
        }
    } catch (e) {
        console.error("   ❌ Erro na requisição do técnico:", e);
    }

    // 3. Aprovar Técnico (Ação de Admin)
    if (tecnicoId) {
        console.log("\n3. Aprovando Técnico (Admin)...");
        try {
            const res = await fetch(`${BASE_URL}/admin/profissionais/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    idTecnico: tecnicoId,
                    acao: 'aprovar'
                })
            });
            const data = await res.json();
            if (res.status === 200) {
                console.log("   ✅ Técnico aprovado com sucesso!");
            } else {
                console.error("   ❌ Erro ao aprovar técnico:", data);
            }
        } catch (e) {
            console.error("   ❌ Erro na aprovação:", e);
        }
    }

    // 4. Criar Dispositivo (Ação de Admin)
    console.log("\n4. Criando Dispositivo...");
    const dispositivo = {
        nome: "Lâmpada Inteligente Wi-Fi",
        marca: "Positivo",
        preco: 89.90,
        linkCompra: "https://loja.exemplo.com/lampada"
    };
    const manual = {
        descricao: "Manual de instalação da lâmpada Wi-Fi.",
        linkVideo: "https://youtube.com/exemplo"
    };

    try {
        const res = await fetch(`${BASE_URL}/conteudo/admin/criar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                dispositivo,
                manual
            })
        });

        const data = await res.json();
        if (res.status === 201) {
            console.log("   ✅ Dispositivo criado com sucesso! ID:", data.id);
        } else {
            console.error("   ❌ Erro ao criar dispositivo:", data);
        }
    } catch (e) {
        console.error("   ❌ Erro na criação do dispositivo:", e);
    }

    console.log("\n=== Fluxo Concluído ===");
}

main();
