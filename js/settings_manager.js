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

    // ─── POPULATE FILTER DROPDOWNS (All Orders + Status Orders pages) ────────
    static async populateFilterDropdowns() {
        if (!window.AppAPI) return;
        try {
            const s = await window.AppAPI.getSettings();
            const sources  = s['order_sources']       || this.DEFAULTS.order_sources;
            const tags     = s['order_tags']           || this.DEFAULTS.order_tags;
            const additional = s['additional_statuses'] || '';

            // Order Source filter
            this._populateSelect('filter-order-source', sources, 'All Source');
            // Always keep "All Source" as first option
            const srcEl = document.getElementById('filter-order-source');
            if (srcEl) srcEl.insertAdjacentHTML('afterbegin', '<option value="">All Source</option>');

            // Order Tag filter
            const tagEl = document.getElementById('filter-order-tag');
            if (tagEl) {
                tagEl.innerHTML = '<option value="">All Tag</option><option>No Tag</option>';
                tags.split(',').map(v => v.trim()).filter(Boolean).forEach(tag => {
                    const opt = document.createElement('option');
                    opt.value = tag; opt.textContent = tag;
                    tagEl.appendChild(opt);
                });
            }

            // Assign Tag (action dropdown)
            this._populateSelect('action-assign-tag', tags, 'Select Tag');

            // Change Status (action dropdown) — default statuses + additional
            const changeStatusEl = document.getElementById('action-change-status');
            if (changeStatusEl) {
                const defaultStatuses = ['Pending','Confirmed','Processing','Hold','Hold Followup','In Courier','Delivered','Completed','Canceled','Returned','Pending Return','Damage','Hand Delivery','Hand Delivery Completed','Others'];
                changeStatusEl.innerHTML = '<option value="">Select Status</option>';
                defaultStatuses.forEach(st => {
                    const opt = document.createElement('option');
                    opt.value = st; opt.textContent = st;
                    changeStatusEl.appendChild(opt);
                });
                // Append additional statuses
                additional.split(',').map(v => v.trim()).filter(Boolean).forEach(st => {
                    const opt = document.createElement('option');
                    opt.value = st; opt.textContent = st;
                    opt.setAttribute('data-additional', '1');
                    changeStatusEl.appendChild(opt);
                });
            }

            // Filter Status dropdown (All Orders filter section) — also add additional statuses
            const filterStatusEl = document.getElementById('filter-status');
            if (filterStatusEl && additional) {
                additional.split(',').map(v => v.trim()).filter(Boolean).forEach(st => {
                    // Avoid duplicates
                    if (!filterStatusEl.querySelector(`option[value="${st}"]`)) {
                        const opt = document.createElement('option');
                        opt.value = st; opt.textContent = st;
                        opt.setAttribute('data-additional', '1');
                        filterStatusEl.appendChild(opt);
                    }
                });
            }

            // District filter dropdown (newly added)
            await this.populateDistricts('filter-order-district', 'All District');

        } catch (err) {
            console.error('[SettingsManager] populateFilterDropdowns error:', err);
        }
    }

    // New helper to populate any district dropdown — Matches create_order logic
    static async populateDistricts(targetId, label = 'Select District') {
        const dropdown = document.getElementById(targetId);
        if (!dropdown) return;

        const fallbackDistricts = [
            "Dhaka City", "Dhaka", "Chittagong", "Gazipur", "Narayanganj", "Sylhet", "Rajshahi", 
            "Khulna", "Barisal", "Rangpur", "Mymensingh", "Comilla", "Brahmanbaria", 
            "Noakhali", "Feni", "Chandpur", "Lakshmipur"
        ].sort();

        const populate = (areas, lbl = label) => {
            dropdown.innerHTML = `<option value="">${lbl}</option>` + 
                                areas.map(d => `<option value="${d}">${d}</option>`).join('');
        };

        try {
            // 1. Try Supabase Cache
            const { data, error } = await window._supabase.from('districts').select('name').order('name');
            if (!error && data && data.length > 0) {
                populate(data.map(d => d.name));
                return;
            }

            // 2. Try API (Matches app.js logic)
            const settings = await window.AppAPI.getSettings();
            const apiKey = settings['steadfast_api_key'];
            const secretKey = settings['steadfast_secret_key'];

            if (apiKey && secretKey) {
                const baseUrl = 'https://portal.packzy.com/api/v1';
                const res = await fetch(`${baseUrl}/police_stations`, {
                    headers: { 'Api-Key': apiKey, 'Secret-Key': secretKey }
                });
                const result = await res.json();
                if (result && result.data) {
                    // Match app.js logic: extract unique names from police_stations response
                    const areas = [...new Set(result.data.map(item => item.name))].sort();
                    populate(areas);
                    // Sync cache
                    window._supabase.from('districts').upsert(areas.map(name => ({ name })), { onConflict: 'name' }).then(() => {});
                    return;
                }
            }

            populate(fallbackDistricts);
        } catch (e) {
            console.error('[SettingsManager] populateDistricts error:', e);
            populate(fallbackDistricts);
        }
    }

    // ─── APPLY ADDITIONAL STATUSES ────────────────────────────────────────
    // 1. Appends to Order Status dropdown in Create Order
    // 2. Injects sidebar links dynamically
    static async applyAdditionalStatuses() {
        if (!window.AppAPI) return;
        try {
            const s = await window.AppAPI.getSettings();
            const raw = s['additional_statuses'] || '';
            const statuses = raw.split(',').map(v => v.trim()).filter(Boolean);

            // --- 1. Append to Order Status dropdown ---
            const orderStatusSelect = document.getElementById('order-status');
            if (orderStatusSelect) {
                // Remove previously injected additional options (marked with data-additional)
                orderStatusSelect.querySelectorAll('option[data-additional]').forEach(o => o.remove());
                // Append new ones
                statuses.forEach(status => {
                    const opt = document.createElement('option');
                    opt.value = status;
                    opt.textContent = status;
                    opt.setAttribute('data-additional', '1');
                    orderStatusSelect.appendChild(opt);
                });
            }

            // --- 2. Inject sidebar links ---
            const sidebarContainer = document.getElementById('sidebar-additional-statuses');
            if (sidebarContainer) {
                sidebarContainer.innerHTML = '';
                statuses.forEach(status => {
                    const safeId = 'link-custom-' + status.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="#/status/${encodeURIComponent(status)}" id="${safeId}" class="block pl-11 pr-3 py-2 text-[13px] text-gray-400 hover:text-white hover:bg-black/20 rounded-md transition-colors">${status}</a>`;
                    sidebarContainer.appendChild(li);
                });
            }

        } catch (err) {
            console.error('[SettingsManager] applyAdditionalStatuses error:', err);
        }
    }
}

window.SettingsManager = SettingsManager;
