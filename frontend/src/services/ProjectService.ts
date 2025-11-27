import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export interface ProjectData {
    type: 'house' | 'apartment';
    rooms: string[];
    budgetLimit: number;
}

export interface Project {
    id: string;
    name: string;
    status: 'draft' | 'in-progress' | 'completed';
    createdAt: string;
    data?: ProjectData;
}

export interface Device {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    image?: string;
    description: string;
    specs: { label: string; value: string }[];
    purchaseLink: string;
}

export interface Item extends Device {
    selected: boolean;
}

// Mock Project Data (fallback only)
const MOCK_PROJECTS: Project[] = [];

// Mock Device Data (no longer used for recommendations)
const MOCK_DEVICES: Device[] = [];
    {
        id: '1',
        name: 'Lâmpada Inteligente',
        brand: 'Philips Hue',
        price: 150.00,
        category: 'Iluminação',
        description: 'Lâmpada LED inteligente com controle de cor e intensidade via app. Compatível com Alexa e Google Home.',
        specs: [
            { label: 'Potência', value: '9W' },
            { label: 'Vida útil', value: '25.000 horas' },
            { label: 'Cores', value: '16 milhões' },
        ],
        purchaseLink: 'https://www.amazon.com.br/lampada-philips-hue'
    },
    {
        id: '2',
        name: 'Tomada Inteligente',
        brand: 'Positivo',
        price: 80.00,
        category: 'Energia',
        description: 'Tomada Wi-Fi inteligente com monitoramento de consumo de energia em tempo real.',
        specs: [
            { label: 'Voltagem', value: '110/220V' },
            { label: 'Corrente máxima', value: '10A' },
            { label: 'Conectividade', value: 'Wi-Fi 2.4GHz' },
        ],
        purchaseLink: 'https://www.magazineluiza.com.br/tomada-positivo'
    },
    {
        id: '3',
        name: 'Assistente Virtual',
        brand: 'Amazon Echo Dot',
        price: 350.00,
        category: 'Hub',
        description: 'Smart speaker com Alexa. Controle dispositivos, ouça música e faça perguntas.',
        specs: [
            { label: 'Alto-falante', value: '1.6"' },
            { label: 'Conectividade', value: 'Wi-Fi, Bluetooth' },
            { label: 'Assistente', value: 'Alexa' },
        ],
        purchaseLink: 'https://www.amazon.com.br/echo-dot'
    },
    {
        id: '4',
        name: 'Câmera de Segurança',
        brand: 'Intelbras',
        price: 250.00,
        category: 'Segurança',
        description: 'Câmera IP Full HD com visão noturna e detecção de movimento.',
        specs: [
            { label: 'Resolução', value: '1080p Full HD' },
            { label: 'Visão noturna', value: 'Até 10m' },
            { label: 'Ângulo', value: '120°' },
        ],
        purchaseLink: 'https://www.intelbras.com/pt-br/camera-wifi'
    },
    {
        id: '5',
        name: 'Fechadura Digital',
        brand: 'Yale',
        price: 1200.00,
        category: 'Segurança',
        description: 'Fechadura eletrônica com senha, cartão e app. Instala em qualquer porta.',
        specs: [
            { label: 'Tipo', value: 'Biométrica + Senha' },
            { label: 'Bateria', value: '6 meses' },
            { label: 'Conectividade', value: 'Bluetooth + Wi-Fi' },
        ],
        purchaseLink: 'https://www.yale.com.br/fechadura-digital'
    },
    {
        id: '6',
        name: 'Sensor de Presença',
        brand: 'Xiaomi',
        price: 60.00,
        category: 'Sensores',
        description: 'Sensor de movimento compacto com bateria de longa duração.',
        specs: [
            { label: 'Alcance', value: '7 metros' },
            { label: 'Bateria', value: '2 anos' },
            { label: 'Protocolo', value: 'Zigbee' },
        ],
        purchaseLink: 'https://www.mi.com/br/sensor-presenca'
    },
    {
        id: '7',
        name: 'Interruptor Inteligente',
        brand: 'Sonoff',
        price: 90.00,
        category: 'Iluminação',
        description: 'Interruptor Wi-Fi que substitui interruptores convencionais sem alteração elétrica.',
        specs: [
            { label: 'Voltagem', value: '110/220V' },
            { label: 'Canais', value: '1 via' },
            { label: 'Conectividade', value: 'Wi-Fi 2.4GHz' },
        ],
        purchaseLink: 'https://www.sonoff.com.br/interruptor-wifi'
    },
    {
        id: '8',
        name: 'Controle Universal IR',
        brand: 'Positivo',
        price: 100.00,
        category: 'Controle',
        description: 'Controle remoto universal que substitui todos os controles da casa via app.',
        specs: [
            { label: 'Tipo', value: 'Infravermelho' },
            { label: 'Alcance', value: '8 metros' },
            { label: 'Dispositivos', value: 'Ilimitados' },
        ],
        purchaseLink: 'https://www.positivocasa.com.br/controle-universal'
    },
];

export const ProjectService = {
    async create(data: ProjectData): Promise<Project> {
        const nome = `Projeto ${data.type === 'house' ? 'Casa' : 'Apartamento'}`;
        const descricao = `Cômodos: ${data.rooms.join(', ') || 'Não informado'} | Orçamento: R$ ${data.budgetLimit.toFixed(2)}`;
        const preferencias = JSON.stringify(data);

        const response = await api.post('/projetos', {
            nome,
            descricao,
            preferencias,
            itens: [],
        });

        const result = response.data as { id: number; mensagem?: string };

        const newProject: Project = {
            id: String(result.id),
            name: nome,
            status: 'draft',
            data,
            createdAt: new Date().toISOString(),
        };

        return newProject;
    },

    async getRecommendations(projectId: string): Promise<Device[]> {
        // Reutiliza dispositivos reais cadastrados pelo admin
        const { DeviceService } = await import('./DeviceService');
        const all = await DeviceService.getAllDevices();

        // Mapeia DeviceDetail -> Device (para a tela de recomendações)
        return all.map((d) => ({
            id: d.id,
            name: d.name,
            brand: d.brand,
            price: d.price,
            category: d.category,
            image: d.image,
            description: d.description,
            specs: d.specs,
            purchaseLink: d.purchaseLink ?? '',
        }));
    },

    async saveBudget(projectId: string, items: Item[]): Promise<void> {
        const selectedItems = items.filter(i => i.selected);
        await AsyncStorage.setItem(`budget_${projectId}`, JSON.stringify(selectedItems));
    },

    async updateItems(projectId: string, deviceIds: string[]): Promise<void> {
        await api.post('/projetos/itens', {
            idProjeto: Number(projectId),
            itens: deviceIds.map(id => Number(id)),
        });
    },

    async generateBudget(projectId: string): Promise<{ id: string; valorTotal: number }> {
        const response = await api.post('/orcamentos/gerar', {
            idProjeto: Number(projectId),
        });
        const data = response.data as { id: number; valorTotal: number };
        return { id: String(data.id), valorTotal: data.valorTotal };
    },

    async listByUser(): Promise<Project[]> {
        try {
            const response = await api.get('/projetos');
            const projetos = response.data as any[];

            return projetos.map((p) => {
                const nome = p.nome ?? 'Projeto';
                const createdAt: string = p.dataCriacao
                    ? new Date(p.dataCriacao).toISOString()
                    : new Date().toISOString();

                const project: Project = {
                    id: String(p.id),
                    name: nome,
                    status: 'draft',
                    createdAt,
                };

                return project;
            });
        } catch (error) {
            console.error('Erro ao listar projetos do usuário, usando mock:', error);
            return MOCK_PROJECTS;
        }
    }
};
