import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Mock Project Data
const MOCK_PROJECTS: Project[] = [
    {
        id: 'proj1',
        name: 'Casa Inteligente',
        status: 'in-progress',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    },
    {
        id: 'proj2',
        name: 'Apartamento Centro',
        status: 'completed',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days ago
    },
    {
        id: 'proj3',
        name: 'Escritório Smart',
        status: 'draft',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
];

// Mock Device Data
const MOCK_DEVICES: Device[] = [
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newProject: Project = {
            id: Math.random().toString(36).substr(2, 9),
            name: `Projeto ${data.type === 'house' ? 'Casa' : 'Apartamento'}`,
            status: 'draft',
            data,
            createdAt: new Date().toISOString(),
        };

        // In a real app, we would save this to the backend
        console.log('Project created:', newProject);
        return newProject;
    },

    async getRecommendations(projectId: string): Promise<Device[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Return random subset of mock devices for demo purposes
        // In a real app, this would depend on the project data (rooms, budget)
        return MOCK_DEVICES.filter(() => Math.random() > 0.3);
    },

    async saveBudget(projectId: string, items: Item[]): Promise<void> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const selectedItems = items.filter(i => i.selected);
        console.log(`Budget saved for project ${projectId}:`, selectedItems);

        // Store locally for demo (optional)
        await AsyncStorage.setItem(`budget_${projectId}`, JSON.stringify(selectedItems));
    },

    async listByUser(): Promise<Project[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));

        // In a real app, this would fetch from the backend using the authenticated user's ID
        // For now, return mock projects
        return MOCK_PROJECTS;
    }
};
