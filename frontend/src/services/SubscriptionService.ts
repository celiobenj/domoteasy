import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Plan {
    id: string;
    name: string;
    price: number;
    period: 'monthly' | 'yearly';
    features: string[];
    recommended?: boolean;
}

const PLANS: Plan[] = [
    {
        id: 'monthly',
        name: 'Premium Mensal',
        price: 29.99,
        period: 'monthly',
        features: [
            'Todos os benefícios do plano Comum',
            'Assistência técnica 24/7',
            'Tutoriais de instalação'
        ]
    },
    {
        id: 'yearly',
        name: 'Premium Anual',
        price: 24.99, // Preço por mês
        period: 'yearly',
        features: [
            'Todos os benefícios do plano Premium Mensal',
            'Maior custo benefício'
        ],
        recommended: true
    }
];

export const SubscriptionService = {
    async getPlans(): Promise<Plan[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return PLANS;
    },

    async subscribe(planId: string, paymentData: any): Promise<void> {
        // Simula uma chamada de API para processar o pagamento e assinar
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Assinado plano ${planId} com dados de pagamento:`, paymentData);
                resolve();
            }, 2000);
        });
    },

    async cancelSubscription(): Promise<void> {
        // Simula cancelamento
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Assinatura cancelada');
                resolve();
            }, 1000);
        });
    },

    async getSubscriptionStatus(): Promise<string> {
        // Simula verificação de status
        await new Promise(resolve => setTimeout(resolve, 500));
        return 'free';
    }
};
