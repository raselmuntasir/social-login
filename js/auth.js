/**
 * Auth & Permission Management
 */

const AuthManager = {
    _currentAdmin: null,
    _permissions: new Set(),

    /**
     * Initialize Auth
     */
    async init() {
        const storedAdmin = sessionStorage.getItem('admin_profile');
        if (storedAdmin) {
            this._currentAdmin = JSON.parse(storedAdmin);
            await this.loadPermissions();
        }
    },

    /**
     * Set Current Admin
     */
    async login(adminData) {
        this._currentAdmin = adminData;
        sessionStorage.setItem('admin_profile', JSON.stringify(adminData));
        sessionStorage.setItem('admin_auth', 'true');
        await this.loadPermissions();
        
        // Log action
        AuditLogger.log('Login', `Admin ${adminData.name} logged in`);
    },

    /**
     * Load permissions from the role
     */
    async loadPermissions() {
        if (!this._currentAdmin || !this._currentAdmin.role_id) return;
        
        try {
            const { data, error } = await _supabase
                .from('roles')
                .select('permissions')
                .eq('id', this._currentAdmin.role_id)
                .single();
            
            if (!error && data) {
                this._permissions = new Set(data.permissions || []);
            }
        } catch (err) {
            console.error('Failed to load permissions:', err);
        }
    },

    /**
     * Check if current admin has permission
     */
    can(permission) {
        // Super Admins always have all permissions
        if (this._currentAdmin?.role_name === 'Super Admin') return true;
        return this._permissions.has(permission);
    },

    /**
     * Logout
     */
    logout() {
        sessionStorage.removeItem('admin_profile');
        sessionStorage.removeItem('admin_auth');
        window.location.reload();
    },

    getProfile() {
        return this._currentAdmin;
    }
};

const AuditLogger = {
    /**
     * Log an action to Supabase
     */
    async log(action, details) {
        try {
            const admin = AuthManager._currentAdmin;
            await _supabase.from('audit_logs').insert([{
                admin_id: admin?.id || 0,
                admin_name: admin?.name || 'System',
                action: action,
                details: details,
                ip_address: '0.0.0.0', // Optional
                created_at: new Date().toISOString()
            }]);
        } catch (err) {
            console.log('Logging failed (table might not exist):', err);
        }
    }
};

window.AuthManager = AuthManager;
window.AuditLogger = AuditLogger;
