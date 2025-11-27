import api from './api';

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

// Admin CMS Device Interface
export interface Device {
    id: string;
    name: string;
    brand: string;
    price: number;
    image?: string;
    purchaseLink?: string;
    videoUrl?: string;
    pdfUrl?: string;
}

export interface DeviceManual {
    id: string;
    content: string;
    videoUrl?: string;
    pdfUrl?: string;
}

// Backend response interface (Portuguese keys)
interface BackendDevice {
    id?: string | number;
    nome?: string;
    marca?: string;
    preco?: number | string;
    linkCompra?: string;
    imagem?: string;
    videoUrl?: string;
    pdfUrl?: string;
}

/**
 * Adapter: Maps backend Portuguese data to frontend English interface
 */
const adaptBackendDevice = (backendData: BackendDevice): DeviceDetail => {
    // Ensure price is a number
    const price = typeof backendData.preco === 'string'
        ? parseFloat(backendData.preco) || 0
        : backendData.preco || 0;

    return {
        id: String(backendData.id || ''),
        name: backendData.nome || '',
        brand: backendData.marca || '',
        price: price,
        category: 'Dispositivo', // Default category if not provided
        image: backendData.imagem,
        description: '', // Backend doesn't provide description yet
        specs: [], // Backend doesn't provide specs yet
    };
};

/**
 * Adapter for admin device list
 */
const adaptBackendDeviceAdmin = (backendData: BackendDevice): Device => {
    const price = typeof backendData.preco === 'string'
        ? parseFloat(backendData.preco) || 0
        : backendData.preco || 0;

    return {
        id: String(backendData.id || ''),
        name: backendData.nome || '',
        brand: backendData.marca || '',
        price: price,
        image: backendData.imagem,
        purchaseLink: backendData.linkCompra,
        videoUrl: backendData.videoUrl,
        pdfUrl: backendData.pdfUrl,
    };
};

// Mock manual data (backend doesn't provide this yet)
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
        // TODO: Implement backend endpoint for single device - currently mock
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock implementation - get from list
        const devices = await this.getAllDevices();
        return devices.find(d => d.id === id) || null;
    },

    async getDeviceManual(id: string): Promise<DeviceManual | null> {
        // TODO: Backend doesn't provide manuals yet - currently mock
        await new Promise(resolve => setTimeout(resolve, 300));

        return MOCK_MANUALS[id] || null;
    },

    async getAllDevices(): Promise<DeviceDetail[]> {
        try {
            const response = await api.get('/conteudo/dispositivos');
            // Backend returns data in response.data.desc (array)
            const backendDevices = response.data?.desc || [];

            // Map each backend device to frontend format
            return backendDevices.map(adaptBackendDevice);
        } catch (error) {
            console.error('Error fetching devices:', error);
            // Return empty array on error to prevent UI crashes
            return [];
        }
    },

    // ===== ADMIN CMS Methods =====

    /**
     * Get all devices for admin CMS
     * @returns Promise with array of devices
     */
    async getAdminDevices(): Promise<Device[]> {
        try {
            const response = await api.get('/conteudo/dispositivos');
            const backendDevices = response.data?.desc || [];

            // Map each backend device to admin format
            return backendDevices.map(adaptBackendDeviceAdmin);
        } catch (error) {
            console.error('Error fetching admin devices:', error);
            return [];
        }
    },

    /**
     * Get a device by ID for admin CMS
     * @param id Device ID
     * @returns Promise with device or null
     */
    async getById(id: number): Promise<Device | null> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 500));

        const devices = await this.getAdminDevices();
        return devices.find(d => d.id === id.toString()) || null;
    },

    /**
     * Update a device (LEGACY - use updateDevice instead)
     * @param id Device ID
     * @param data Device data
     */
    async update(id: number, data: Omit<Device, 'id'>): Promise<void> {
        // TODO: Backend doesn't support update yet - currently mock
        console.log("Mock Update:", data);
        await new Promise(resolve => setTimeout(resolve, 800));
    },

    /**
     * Create a new device
     * @param data Device data without ID
     * @returns Promise with created device
     */
    async createDevice(data: Omit<Device, 'id'>): Promise<Device> {
        try {
            // Transform flat frontend data into nested backend structure
            const payload = {
                dispositivo: {
                    nome: data.name,
                    marca: data.brand,
                    preco: Number(data.price),
                    linkCompra: data.purchaseLink
                },
                manual: {
                    descricao: data.pdfUrl || "Manual PDF", // Backend requires 'descricao'
                    linkVideo: data.videoUrl
                }
            };

            const response = await api.post('/conteudo/admin/criar', payload);

            // Verify successful status code
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }

            // Return the created device with the ID from backend
            const createdDevice: Device = {
                id: String(response.data?.desc?.id || Date.now()),
                ...data,
            };

            console.log('Device created successfully:', createdDevice);
            return createdDevice;
        } catch (error) {
            console.error('Error creating device:', error);
            throw error;
        }
    },

    /**
     * Update an existing device
     * @param id Device ID
     * @param data Partial device data to update
     * @returns Promise with updated device or undefined if not found
     */
    async updateDevice(id: string, data: Partial<Device>): Promise<Device | undefined> {
        // TODO: Backend doesn't support update yet - currently mock
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log('Mock: Updating device', id, data);
        return undefined;
    },

    /**
     * Delete a device by ID
     * @param id Device ID
     * @returns Promise with boolean indicating success
     */
    async deleteDevice(id: string): Promise<boolean> {
        // TODO: Backend doesn't support delete yet - currently mock
        await new Promise(resolve => setTimeout(resolve, 600));
        console.log('Mock: Deleting device', id);
        return false;
    }
};
