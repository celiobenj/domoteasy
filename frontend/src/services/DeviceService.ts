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
    purchaseLink?: string;
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

export const DeviceService = {
    async getDeviceById(id: string): Promise<DeviceDetail | null> {
        try {
            // Fetch all and find, or use specific endpoint if available
            // Using getAllDevices is a valid non-mock approach if specific endpoint is missing
            const devices = await this.getAllDevices();
            return devices.find(d => d.id === id) || null;
        } catch (error) {
            console.error('Error fetching device by id:', error);
            return null;
        }
    },

    async getDeviceManual(id: string): Promise<DeviceManual | null> {
        try {
            const response = await api.get(`/conteudo/manual/${id}`);
            // Backend returns { desc: { id, content, videoUrl, pdfUrl } }
            const manualData = response.data?.desc;

            if (!manualData) return null;

            return {
                id: String(manualData.id),
                content: manualData.conteudo || manualData.descricao || '',
                videoUrl: manualData.linkVideo,
                pdfUrl: manualData.linkPdf || manualData.pdfUrl,
            };
        } catch (error: any) {
            if (error.response?.status === 403) {
                throw new Error("Subscription Required");
            }
            console.error('Error fetching manual:', error);
            return null;
        }
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
        throw new Error("Feature not available on server");
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
        throw new Error("Feature not available on server");
    },

    /**
     * Delete a device by ID
     * @param id Device ID
     * @returns Promise with boolean indicating success
     */
    async deleteDevice(id: string): Promise<boolean> {
        throw new Error("Feature not available on server");
    }
};
