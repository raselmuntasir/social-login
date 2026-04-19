/**
 * Top One Admin - API Utility Wrapper
 * Centralized Supabase operations
 */

const API = {
    // 1. Order Operations
    async getOrders() {
        const { data, error } = await _supabase
            .from('orders')
            .select('*, name, phone, address, product_name, amount, status, created_at')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getOrdersByStatus(status) {
        const { data, error } = await _supabase
            .from('orders')
            .select('*')
            .eq('status', status)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async createOrder(orderData) {
        const { data, error } = await _supabase
            .from('orders')
            .insert([orderData]);
        if (error) throw error;
        return data;
    },

    // 2. Setting Operations (Key-Value pairs)
    async getSettings() {
        const { data, error } = await _supabase
            .from('settings')
            .select('*');
        if (error) throw error;
        
        // Convert to a clean object
        const settings = {};
        data.forEach(item => {
            settings[item.key] = item.value;
        });
        return settings;
    },

    async updateSetting(key, value) {
        const { data, error } = await _supabase
            .from('settings')
            .upsert({ key, value }, { onConflict: 'key' });
        if (error) throw error;
        return data;
    },

    async updateMultipleSettings(settingsObj) {
        const upsertData = Object.entries(settingsObj).map(([key, value]) => ({ key, value }));
        const { data, error } = await _supabase
            .from('settings')
            .upsert(upsertData, { onConflict: 'key' });
        if (error) throw error;
        return data;
    },

    // 3. Product Operations
    async getProducts() {
        const { data, error } = await _supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getLowStockProducts(limit = 10) {
        const { data, error } = await _supabase
            .from('products')
            .select('*')
            .lt('stock', 10) // Example threshold
            .order('stock', { ascending: true })
            .limit(limit);
        if (error) throw error;
        return data;
    }
};

// Export to window so other scripts can use it
window.AppAPI = API;
