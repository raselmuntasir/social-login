/**
 * Top One Admin - API Utility Wrapper
 * Centralized Supabase operations
 */

const API = {
    // 1. Order Operations
    async getOrders() {
        const { data, error } = await _supabase
            .from('orders')
            .select('id, name, phone, address, product_name, amount, status, created_at, purchase_price, shipping_charge, advance_amount, courier, courier_total, courier_completed, courier_pct, courier_to, courier_su, courier_fa')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    // Lightweight: only fetch counts by status (for sidebar badges & dashboard stats)
    async getOrderCountsByStatus() {
        const { data, error } = await _supabase
            .from('orders')
            .select('status');
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

    // 2. Setting Operations (Key-Value pairs) — cached
    _settingsCache: null,
    async getSettings(forceRefresh = false) {
        if (!forceRefresh && this._settingsCache) return this._settingsCache;
        const { data, error } = await _supabase
            .from('settings')
            .select('*');
        if (error) throw error;
        
        // Convert to a clean object
        const settings = {};
        data.forEach(item => {
            settings[item.key] = item.value;
        });
        this._settingsCache = settings;
        return settings;
    },

    async updateSetting(key, value) {
        this._settingsCache = null; // Invalidate cache
        const { data, error } = await _supabase
            .from('settings')
            .upsert({ key, value }, { onConflict: 'key' });
        if (error) throw error;
        return data;
    },

    async updateMultipleSettings(settingsObj) {
        this._settingsCache = null; // Invalidate cache
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

    _lowStockCache: null,
    _lowStockFetchTime: 0,
    async getLowStockProducts(limit = 10) {
        const now = Date.now();
        if (this._lowStockCache && now - this._lowStockFetchTime < 120000) {
            return this._lowStockCache;
        }
        const { data, error } = await _supabase
            .from('products')
            .select('id, title, stock, image')
            .lt('stock', 10)
            .order('stock', { ascending: true })
            .limit(limit);
        if (error) throw error;
        this._lowStockCache = data;
        this._lowStockFetchTime = now;
        return data;
    }
};

// Export to window so other scripts can use it
window.AppAPI = API;
