/**
 * SettingsManager — Centralized Settings System
 * Loads all settings from Supabase and applies them everywhere:
 *   - Settings page: populates all input fields & tag containers
 *   - Create Order page: populates all dynamic dropdowns
 *   - Sidebar/header: applies business name, shipping defaults, etc.
 */

class SettingsManager {

    // ─── DEFAULTS (used if database has no value yet) ─────────────────────
    static DEFAULTS = {
        order_sources:        'Landing Page,Mobile Call,Messenger,WhatsApp,FB Group,Bulk SMS,Failed Orders,Wordpress Website,POS',
        order_tags:           'Urgent,High Value,Fragile,Pre-order,Gift,COD Verified',
        customer_tags:        'New Customer,VIP Customer,Repeat Buyer,Wholesaler,Blacklisted,Influencer',
        additional_statuses:  '',
        currency:             '৳',
        default_shipping:     '150',
        low_stock_alert:      '5',
    };

    // ─── LOAD & APPLY — Call this when Settings page opens ───────────────
    static async loadSettings() {
        if (!window.AppAPI) return;
        try {
            const s = await window.AppAPI.getSettings();

            // --- General Tab ---
            this._setVal('setting-business-name',   s['business_name']);
            this._setVal('setting-business-mobile',  s['business_mobile']);
            this._setVal('setting-business-email',   s['business_email']);
            this._setVal('setting-web-url',          s['business_web_url']);
            this._setVal('setting-address',          s['business_address']);

            // Logo preview
            if (s['business_logo']) {
                const img = document.getElementById('setting-logo-preview');
                const ph  = document.getElementById('logo-placeholder');
                if (img) { img.src = s['business_logo']; img.classList.remove('hidden'); }
                if (ph)  ph.classList.add('hidden');
            }

            // --- Order Tab ---
            this._setVal('settings-currency',          s['currency']          || this.DEFAULTS.currency);
            this._setVal('settings-default-shipping',  s['default_shipping']  || this.DEFAULTS.default_shipping);
            this._setVal('settings-low-stock-alert',   s['low_stock_alert']   || this.DEFAULTS.low_stock_alert);

            this.renderPills('settings-order-sources-container',     s['order_sources']        || this.DEFAULTS.order_sources);
            this.renderPills('settings-order-tags-container',         s['order_tags']           || this.DEFAULTS.order_tags);
            this.renderPills('settings-additional-statuses-container',s['additional_statuses']  || this.DEFAULTS.additional_statuses);

            // --- Customer Tab ---
            this.renderPills('settings-customer-tags-container', s['customer_tags'] || this.DEFAULTS.customer_tags);

        } catch (err) {
            console.error('[SettingsManager] loadSettings error:', err);
        }
    }

    // ─── SAVE — Collects all settings inputs and saves to Supabase ────────
    static async saveSettings(saveBtnId = 'save-general-settings') {
        if (!window.AppAPI) return;
        const btn = document.getElementById(saveBtnId);
        if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }

        try {
            // Handle logo upload if a new file was selected
            let imageUrl = document.getElementById('setting-logo-preview')?.src || '';
            const logoInput = document.getElementById('setting-logo-input');
            const file = logoInput?.files[0];
            if (file && window._supabase) {
                try {
                    const compressedBlob = await compressImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.7 });
                    const fileName = `logo_${Date.now()}.jpg`;
                    const { data: uploadData, error: uploadErr } = await window._supabase.storage
                        .from('product-images').upload(fileName, compressedBlob, { contentType: 'image/jpeg' });
                    if (!uploadErr) {
                        const { data: urlData } = window._supabase.storage.from('product-images').getPublicUrl(fileName);
                        imageUrl = urlData.publicUrl;
                    }
                } catch (e) { console.warn('Logo upload skipped:', e); }
            }

            const payload = {
                // General
                'business_name':     this._getVal('setting-business-name'),
                'business_mobile':   this._getVal('setting-business-mobile'),
                'business_email':    this._getVal('setting-business-email'),
                'business_web_url':  this._getVal('setting-web-url'),
                'business_address':  this._getVal('setting-address'),
                'business_logo':     imageUrl,
                // Order
                'currency':          this._getVal('settings-currency'),
                'default_shipping':  this._getVal('settings-default-shipping'),
                'low_stock_alert':   this._getVal('settings-low-stock-alert'),
                'order_sources':     this.getPillsValue('settings-order-sources-container'),
                'order_tags':        this.getPillsValue('settings-order-tags-container'),
                'additional_statuses': this.getPillsValue('settings-additional-statuses-container'),
                // Customer
                'customer_tags':     this.getPillsValue('settings-customer-tags-container'),
            };

            await window.AppAPI.updateMultipleSettings(payload);

            // Show a nice toast instead of alert
            this._toast('✅ Settings saved successfully!', 'green');
        } catch (err) {
            console.error('[SettingsManager] saveSettings error:', err);
            this._toast('❌ Failed to save settings.', 'red');
        } finally {
            if (btn) {
                btn.textContent = 'Update';
                btn.disabled = false;
            }
        }
    }

    // ─── POPULATE CREATE ORDER DROPDOWNS ─────────────────────────────────
    static async populateCreateOrderDropdowns() {
        if (!window.AppAPI) return;
        try {
            const s = await window.AppAPI.getSettings();

            this._populateSelect('order-source',  s['order_sources']   || this.DEFAULTS.order_sources,  'Select Order Source');
            this._populateSelect('order-tag',     s['order_tags']       || this.DEFAULTS.order_tags,     'Select Order Tag');
            this._populateSelect('customer-tag',  s['customer_tags']    || this.DEFAULTS.customer_tags,  'Select Tag');

            // Apply default shipping charge to the shipping field
            const shippingInput = document.getElementById('order-shipping');
            if (shippingInput && !shippingInput.value) {
                shippingInput.value = s['default_shipping'] || this.DEFAULTS.default_shipping;
                // Trigger calculations
                shippingInput.dispatchEvent(new Event('input', { bubbles: true }));
            }

        } catch (err) {
            console.error('[SettingsManager] populateCreateOrderDropdowns error:', err);
        }
    }

    // ─── INIT TAGS INPUT (Enter/Comma to add pill) ────────────────────────
    static initTagsInput(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const input = container.querySelector('input');
        if (!input) return;

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const val = input.value.replace(',', '').trim();
                if (val) {
                    this._addPill(container, input, val);
                    input.value = '';
                }
            }
        });
    }

    // ─── RENDER PILLS FROM COMMA STRING ──────────────────────────────────
    static renderPills(containerId, commaSeparated) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const input = container.querySelector('input');
        container.querySelectorAll('span').forEach(s => s.remove());
        if (!commaSeparated) return;
        commaSeparated.split(',').map(v => v.trim()).filter(Boolean).forEach(val => {
            this._addPill(container, input, val);
        });
    }

    // ─── GET PILLS AS COMMA STRING ────────────────────────────────────────
    static getPillsValue(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return '';
        return Array.from(container.querySelectorAll('span'))
            .map(s => s.firstChild?.textContent?.trim())
            .filter(Boolean)
            .join(',');
    }

    // ─── PRIVATE HELPERS ──────────────────────────────────────────────────
    static _addPill(container, inputEl, text) {
        const span = document.createElement('span');
        span.className = 'bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium';
        span.innerHTML = `${text} <i class="fas fa-times cursor-pointer text-[10px]" onclick="this.parentElement.remove()"></i>`;
        container.insertBefore(span, inputEl);
    }

    static _populateSelect(selectId, commaSeparated, placeholder) {
        const sel = document.getElementById(selectId);
        if (!sel) return;
        sel.innerHTML = `<option value="">${placeholder}</option>`;
        commaSeparated.split(',').map(v => v.trim()).filter(Boolean).forEach(val => {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = val;
            sel.appendChild(opt);
        });
    }

    static _setVal(id, value) {
        const el = document.getElementById(id);
        if (el && value !== undefined && value !== null) el.value = value;
    }

    static _getVal(id) {
        return document.getElementById(id)?.value || '';
    }

    static _toast(message, color = 'green') {
        const toast = document.createElement('div');
        const bg = color === 'green' ? 'bg-green-600' : 'bg-red-600';
        toast.className = `fixed bottom-5 right-5 ${bg} text-white px-5 py-3 rounded-xl text-sm font-bold z-[9999] shadow-2xl flex items-center gap-2 animate-bounce`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

window.SettingsManager = SettingsManager;
