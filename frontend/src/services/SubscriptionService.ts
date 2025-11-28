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
            // Backend sends array directly in response.data (not nested in desc)
            const backendPlans = Array.isArray(response.data) ? response.data : [];

            // Map each backend plan to frontend format
            return backendPlans.map(adaptBackendPlan);
        } catch (error) {
            console.error('Error fetching plans:', error);
            // Return empty array on error to prevent UI crashes
            return [];
        }
    },

    async subscribe(planId: string, paymentData: any): Promise<void> {
        throw new Error("Feature not available on server");
    },

    async cancelSubscription(): Promise<void> {
        throw new Error("Feature not available on server");
    },

    async getSubscriptionStatus(): Promise<string> {
        try {
            const response = await api.get('/usuario/info');
            const tipo = response.data?.tipoAssinatura || 'free';
            return tipo.toLowerCase().includes('premium') ? 'premium' : 'free';
        } catch (error) {
            console.error('Error fetching subscription status:', error);
            return 'free';
        }
    }
};
