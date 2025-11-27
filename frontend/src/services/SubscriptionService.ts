import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export interface Plan {
    id: string;
    name: string;
    price: number;
    period: 'monthly' | 'yearly';
    features: string[];
    recommended?: boolean;
}

// Backend response interface (Portuguese keys)
interface BackendPlan {
    id?: string | number;
    nome?: string;
    valor?: number | string;
    descricao?: string;
    duracaoDias?: number;
}

/**
 * Adapter: Maps backend Portuguese data to frontend English interface
 */
const adaptBackendPlan = (backendData: BackendPlan): Plan => {
    // Ensure price is a number
    const price = typeof backendData.valor === 'string'
        ? parseFloat(backendData.valor) || 0
        : backendData.valor || 0;

    // Determine period based on duration (30 days = monthly, 365 = yearly)
    const duration = backendData.duracaoDias || 30;
    const period: 'monthly' | 'yearly' = duration >= 365 ? 'yearly' : 'monthly';

    // Parse features from description (split by newline or comma)
    const description = backendData.descricao || '';
    const features = description
        ? description.split(/[\n,]/).map(f => f.trim()).filter(f => f.length > 0)
        : [];

    // Yearly plans are recommended by default
    const recommended = period === 'yearly';

    return {
        id: String(backendData.id || ''),
        name: backendData.nome || '',
        price: price,
        period: period,
        features: features,
        recommended: recommended,
    };
};

export const SubscriptionService = {
    async getPlans(): Promise<Plan[]> {
        try {
            const response = await api.get('/planos');
            // Backend returns data in response.data.desc (array)
            const backendPlans = response.data?.desc || [];

            // Map each backend plan to frontend format
            return backendPlans.map(adaptBackendPlan);
        } catch (error) {
            console.error('Error fetching plans:', error);
            // Return empty array on error to prevent UI crashes
            return [];
        }
    },

    async subscribe(planId: string, paymentData: any): Promise<void> {
        // TODO: Implement backend endpoint - currently mock
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Assinado plano ${planId} com dados de pagamento:`, paymentData);
                resolve();
            }, 2000);
        });
    },

    async cancelSubscription(): Promise<void> {
        // TODO: Implement backend endpoint - currently mock
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Assinatura cancelada');
                resolve();
            }, 1000);
        });
    },

    async getSubscriptionStatus(): Promise<string> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 500));
        return 'free';
    }
};
