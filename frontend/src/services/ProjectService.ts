import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ProjectData {
    type: 'house' | 'apartment';
    rooms: string[];
    budgetLimit: number;
}

export interface Project {
    id: string;
    name: string;
    data: ProjectData;
    createdAt: string;
}

export interface Device {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    image?: string; // Optional image URL
}

export interface Item extends Device {
    selected: boolean;
}

// Mock Data
const MOCK_DEVICES: Device[] = [
    { id: '1', name: 'Lâmpada Inteligente', brand: 'Philips Hue', price: 150.00, category: 'Iluminação' },
    { id: '2', name: 'Tomada Inteligente', brand: 'Positivo', price: 80.00, category: 'Energia' },
    { id: '3', name: 'Assistente Virtual', brand: 'Amazon Echo Dot', price: 350.00, category: 'Hub' },
    { id: '4', name: 'Câmera de Segurança', brand: 'Intelbras', price: 250.00, category: 'Segurança' },
    { id: '5', name: 'Fechadura Digital', brand: 'Yale', price: 1200.00, category: 'Segurança' },
    { id: '6', name: 'Sensor de Presença', brand: 'Xiaomi', price: 60.00, category: 'Sensores' },
    { id: '7', name: 'Interruptor Inteligente', brand: 'Sonoff', price: 90.00, category: 'Iluminação' },
    { id: '8', name: 'Controle Universal IR', brand: 'Positivo', price: 100.00, category: 'Controle' },
];

export const ProjectService = {
    async create(data: ProjectData): Promise<Project> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newProject: Project = {
            id: Math.random().toString(36).substr(2, 9),
            name: `Projeto ${data.type === 'house' ? 'Casa' : 'Apartamento'}`,
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
    }
};
