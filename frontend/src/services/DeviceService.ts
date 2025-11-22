export interface DeviceDetail {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    image?: string;
    description: string;
    specs: {
        label: string;
        value: string;
    }[];
}

export interface DeviceManual {
    id: string;
    content: string;
    videoUrl?: string;
    pdfUrl?: string;
}

// Mock device data with detailed information
const MOCK_DEVICES: DeviceDetail[] = [
    {
        id: '1',
        name: 'Lâmpada Inteligente',
        brand: 'Philips Hue',
        price: 150.00,
        category: 'Iluminação',
        description: 'Lâmpada LED inteligente com controle de cor RGB e integração com assistentes virtuais. Perfeita para criar ambientes personalizados.',
        specs: [
            { label: 'Potência', value: '9W' },
            { label: 'Voltagem', value: '110-220V' },
            { label: 'Conectividade', value: 'Wi-Fi 2.4GHz' },
            { label: 'Vida útil', value: '25.000 horas' },
        ]
    },
    {
        id: '2',
        name: 'Tomada Inteligente',
        brand: 'Positivo',
        price: 80.00,
        category: 'Energia',
        description: 'Controle remotamente seus aparelhos eletrônicos. Monitore o consumo de energia em tempo real.',
        specs: [
            { label: 'Corrente máxima', value: '10A' },
            { label: 'Voltagem', value: '110-220V' },
            { label: 'Conectividade', value: 'Wi-Fi 2.4GHz' },
            { label: 'Compatibilidade', value: 'Alexa, Google Assistant' },
        ]
    },
    {
        id: '3',
        name: 'Assistente Virtual',
        brand: 'Amazon Echo Dot',
        price: 350.00,
        category: 'Hub',
        description: 'Central de comando para sua casa inteligente. Controle todos os dispositivos por voz.',
        specs: [
            { label: 'Alto-falante', value: '1.6"' },
            { label: 'Conectividade', value: 'Wi-Fi, Bluetooth' },
            { label: 'Assistente', value: 'Alexa' },
            { label: 'Microfones', value: '4 microfones' },
        ]
    },
    {
        id: '4',
        name: 'Câmera de Segurança',
        brand: 'Intelbras',
        price: 250.00,
        category: 'Segurança',
        description: 'Câmera IP com visão noturna e detecção de movimento. Receba alertas no celular.',
        specs: [
            { label: 'Resolução', value: '1080p Full HD' },
            { label: 'Visão noturna', value: 'Até 10 metros' },
            { label: 'Armazenamento', value: 'Cloud + microSD' },
            { label: 'Conectividade', value: 'Wi-Fi 2.4GHz' },
        ]
    },
];

// Mock manual data
const MOCK_MANUALS: { [key: string]: DeviceManual } = {
    '1': {
        id: '1',
        content: `# Manual de Instalação - Lâmpada Inteligente Philips Hue

## 1. Preparação
- Certifique-se de que sua rede Wi-Fi está funcionando
- Desligue a energia no disjuntor antes de instalar
- Tenha em mãos seu smartphone com o app Philips Hue

## 2. Instalação Física
1. Remova a lâmpada antiga
2. Rosqueie a lâmpada Philips Hue no bocal (E27)
3. Religue a energia no disjuntor

## 3. Configuração do App
1. Baixe o app "Philips Hue" na loja de aplicativos
2. Crie uma conta ou faça login
3. Siga as instruções para adicionar a lâmpada
4. Configure cenas e automações

## 4. Integração com Assistentes
- Alexa: "Alexa, descubra dispositivos"
- Google Assistant: Abra o app Google Home > Adicionar > Configurar dispositivo

## Solução de Problemas
- Lâmpada não responde: Verifique se está dentro do alcance do Wi-Fi
- Não aparece no app: Reinicie a lâmpada (desligue/ligue 3x)`,
        videoUrl: 'https://www.youtube.com/watch?v=example',
    },
    '2': {
        id: '2',
        content: `# Manual de Instalação - Tomada Inteligente Positivo

## 1. Requisitos
- Rede Wi-Fi 2.4GHz
- Smartphone com app "Smart Life" ou "Tuya Smart"

## 2. Instalação
1. Conecte a tomada inteligente na tomada convencional
2. O LED começará a piscar rapidamente

## 3. Configuração
1. Baixe o app "Smart Life"
2. Crie uma conta
3. Toque em "+" para adicionar dispositivo
4. Selecione "Tomada"
5. Insira a senha do Wi-Fi
6. Aguarde a confirmação

## 4. Uso
- Ligue/desligue pelo app
- Configure timers e cronogramas
- Monitore o consumo de energia

## Dicas
- Não use com aquecedores acima de 1200W
- Mantenha atualizado o firmware pelo app`,
        pdfUrl: '/manuals/tomada-positivo.pdf',
    },
};

export const DeviceService = {
    async getDeviceById(id: string): Promise<DeviceDetail | null> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const device = MOCK_DEVICES.find(d => d.id === id);
        return device || null;
    },

    async getDeviceManual(id: string): Promise<DeviceManual | null> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return MOCK_MANUALS[id] || null;
    },

    async getAllDevices(): Promise<DeviceDetail[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 400));

        return MOCK_DEVICES;
    }
};
