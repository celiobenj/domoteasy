import api from './api';

export interface Plan {
    id: string;
    name: string;
    price: number;
    period: 'monthly' | 'yearly';
    features: string[];
    recommended?: boolean;
}

interface BackendPlan {
    id: number;
    nome: string;
    valor: number;
    descricao?: string;
    duracaoDias?: number;
}

function mapBackendPlan(p: BackendPlan): Plan {
    let period: 'monthly' | 'yearly' = 'monthly';
    if (p.duracaoDias && p.duracaoDias >= 365) {
        period = 'yearly';
    }

    const features: string[] = p.descricao
        ? p.descricao.split(/\r?\n/).filter(Boolean)
        : ['Acesso aos recursos do plano Premium'];

    return {
        id: String(p.id),
        name: p.nome,
        price: p.valor,
        period,
        features,
        recommended: period === 'yearly',
    };
}

export const SubscriptionService = {
    async getPlans(): Promise<Plan[]> {
        const response = await api.get<BackendPlan[]>('/planos');
        return response.data.map(mapBackendPlan);
    },

    /**
     * Cria assinatura e registra pagamento no backend.
     */
    async subscribe(plan: Plan): Promise<void> {
        // 1) Criar assinatura vinculada ao plano
        const contratarRes = await api.post('/assinatura/contratar', {
            idPlano: Number(plan.id),
        });

        const assinatura = contratarRes.data as { id: number };
        const fakeTransactionId = `TX-${Date.now()}`;

        // 2) Registrar pagamento e ativar assinatura
        await api.post('/pagamentos', {
            idAssinatura: assinatura.id,
            valor: plan.price,
            idTransacao: fakeTransactionId,
        });
    },

    async cancelSubscription(): Promise<void> {
        await api.patch('/assinatura/cancelar');
    },

    async getSubscriptionStatus(): Promise<'free' | 'premium'> {
        try {
            const response = await api.get('/assinatura/meu-plano');
            const assinatura = response.data as { status?: string };
            if (assinatura && assinatura.status === 'ativa') {
                return 'premium';
            }
            return 'free';
        } catch (error: any) {
            // 404 = sem assinatura ainda
            if (error?.response?.status === 404) {
                return 'free';
            }
            throw error;
        }
    },
};
