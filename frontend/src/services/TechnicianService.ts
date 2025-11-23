export interface Technician {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    email: string;
    phone: string;
    description: string;
    avatar?: string;
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
    },
    {
        id: '2',
        name: 'Maria Santos',
        specialty: 'Técnica em Segurança',
        rating: 4.9,
        email: 'maria.santos@email.com',
        phone: '(11) 99999-2222',
        description: 'Instalação de câmeras, alarmes e fechaduras digitais.',
    },
    {
        id: '3',
        name: 'Carlos Oliveira',
        specialty: 'Integrador de Sistemas',
        rating: 4.7,
        email: 'carlos.oliveira@email.com',
        phone: '(11) 99999-3333',
        description: 'Configuração de hubs e assistentes virtuais.',
    },
    {
        id: '4',
        name: 'Ana Pereira',
        specialty: 'Eletricista',
        rating: 4.5,
        email: 'ana.pereira@email.com',
        phone: '(11) 99999-4444',
        description: 'Manutenção e reparos elétricos.',
    },
    {
        id: '5',
        name: 'Pedro Costa',
        specialty: 'Técnico em Redes',
        rating: 4.6,
        email: 'pedro.costa@email.com',
        phone: '(11) 99999-5555',
        description: 'Otimização de Wi-Fi e redes domésticas.',
    },
];

export const TechnicianService = {
    async getAll(): Promise<Technician[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_TECHNICIANS;
    },

    async getById(id: string): Promise<Technician | undefined> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_TECHNICIANS.find(t => t.id === id);
    }
};
