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

// Mock Project Data removed


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

    async generateBudget(itemIds: string[]): Promise<{ id: string; valorTotal: number }> {
        const response = await api.post('/orcamentos/gerar', {
            itens: itemIds,
        });

        // Backend returns { desc: { valorTotal: ... } }
        const data = response.data;
        const valorTotal = data.desc?.valorTotal || data.valorTotal || 0;

        return { id: 'new', valorTotal };
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
            console.error('Erro ao listar projetos do usuário:', error);
            return [];
        }
    }
};
