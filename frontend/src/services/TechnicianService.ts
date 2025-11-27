import api from './api';

export interface Technician {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    email: string;
    phone: string;
    description: string;
    avatar?: string;
    status: 'pending' | 'active' | 'rejected' | 'inactive';
}

type BackendStatus = 'pendente' | 'ativo' | 'reprovado' | 'inativo';

function mapBackendStatusToFrontend(status: BackendStatus | string | undefined): Technician['status'] {
    switch (status) {
        case 'pendente':
            return 'pending';
        case 'reprovado':
            return 'rejected';
        case 'inativo':
            return 'inactive';
        case 'ativo':
        default:
            return 'active';
    }
}

function mapBackendTechnician(t: any): Technician {
    return {
        id: String(t.id),
        name: t.nome ?? '',
        specialty: t.especialidade ?? '',
        rating: 0,
        email: t.email ?? '',
        phone: t.telefone ?? '',
        description: t.especialidade ?? '',
        status: mapBackendStatusToFrontend(t.status as BackendStatus),
    };
}

const MOCK_TECHNICIANS: Technician[] = [
    {
        id: '1',
        name: 'João Silva',
        specialty: 'Eletricista',
        rating: 4.8,
        email: 'joao.silva@email.com',
        phone: '(11) 99999-1111',
        description: 'Especialista em instalações residenciais e automação.',
        status: 'active',
    },
    {
        id: '2',
        name: 'Maria Santos',
        specialty: 'Técnica em Segurança',
        rating: 4.9,
        email: 'maria.santos@email.com',
        phone: '(11) 99999-2222',
        description: 'Instalação de câmeras, alarmes e fechaduras digitais.',
        status: 'active',
    },
    {
        id: '3',
        name: 'Carlos Oliveira',
        specialty: 'Integrador de Sistemas',
        rating: 4.7,
        email: 'carlos.oliveira@email.com',
        phone: '(11) 99999-3333',
        description: 'Configuração de hubs e assistentes virtuais.',
        status: 'active',
    },
    {
        id: '4',
        name: 'Ana Pereira',
        specialty: 'Eletricista',
        rating: 4.5,
        email: 'ana.pereira@email.com',
        phone: '(11) 99999-4444',
        description: 'Manutenção e reparos elétricos.',
        status: 'active',
    },
    {
        id: '5',
        name: 'Pedro Costa',
        specialty: 'Técnico em Redes',
        rating: 4.6,
        email: 'pedro.costa@email.com',
        phone: '(11) 99999-5555',
        description: 'Otimização de Wi-Fi e redes domésticas.',
        status: 'active',
    },
    {
        id: '6',
        name: 'Roberto Alves',
        specialty: 'Eletricista',
        rating: 0,
        email: 'roberto.alves@email.com',
        phone: '(11) 99999-6666',
        description: 'Instalações elétricas residenciais e comerciais.',
        status: 'pending',
    },
    {
        id: '7',
        name: 'Juliana Campos',
        specialty: 'Técnica em Automação',
        rating: 0,
        email: 'juliana.campos@email.com',
        phone: '(11) 99999-7777',
        description: 'Especialista em automação residencial completa.',
        status: 'pending',
    },
    {
        id: '8',
        name: 'Fernando Lima',
        specialty: 'Integrador de Sistemas',
        rating: 0,
        email: 'fernando.lima@email.com',
        phone: '(11) 99999-8888',
        description: 'Integração de sistemas de segurança e automação.',
        status: 'pending',
    },
];

// In-memory storage (fallback only, not used with backend)
let techniciansData = [...MOCK_TECHNICIANS];

export const TechnicianService = {
    async getAll(): Promise<Technician[]> {
        try {
            const response = await api.get('/tecnicos');
            const data = response.data as any[];
            return data.map(mapBackendTechnician);
        } catch (error) {
            console.error('Erro ao listar técnicos, usando mock:', error);
            return techniciansData;
        }
    },

    async getById(id: string): Promise<Technician | undefined> {
        try {
            const response = await api.get(`/tecnicos/id/${id}`);
            return mapBackendTechnician(response.data);
        } catch (error: any) {
            if (error?.response?.status === 404) {
                return undefined;
            }
            console.error('Erro ao buscar técnico, usando mock:', error);
            return techniciansData.find(t => t.id === id);
        }
    },

    async getPendingTechnicians(): Promise<Technician[]> {
        // Backend não possui rota específica para pendentes.
        // Mantemos apenas fallback local.
        return techniciansData.filter(t => t.status === 'pending');
    },

    async approve(id: string): Promise<Technician | undefined> {
        await api.post('/admin/profissionais/status', { idTecnico: id, acao: 'aprovar' });
        return this.getById(id);
    },

    async reject(id: string): Promise<Technician | undefined> {
        await api.post('/admin/profissionais/status', { idTecnico: id, acao: 'reprovar' });
        return this.getById(id);
    },

    async deactivate(id: string): Promise<Technician | undefined> {
        await api.post('/admin/profissionais/status', { idTecnico: id, acao: 'desativar' });
        return this.getById(id);
    },

    async reactivate(id: string): Promise<Technician | undefined> {
        await api.post('/admin/profissionais/status', { idTecnico: id, acao: 'reativar' });
        return this.getById(id);
    },

    async updateTechnicianData(
        id: string,
        data: Partial<Technician>
    ): Promise<Technician | undefined> {
        // Não há endpoint específico para edição de dados de contato no backend admin.
        // Mantemos apenas atualização no mock local.
        const technicianIndex = techniciansData.findIndex(t => t.id === id);
        if (technicianIndex === -1) {
            return undefined;
        }

        techniciansData[technicianIndex] = {
            ...techniciansData[technicianIndex],
            ...data,
        };

        return techniciansData[technicianIndex];
    },

    async delete(id: string): Promise<boolean> {
        // Não há endpoint de deleção; usamos "reprovar" como equivalente.
        await api.post('/admin/profissionais/status', { idTecnico: id, acao: 'reprovar' });
        return true;
    },
};
