// Active sidebar link tracking
let _activeStatusLinkId = null;

// ─── Performance: Cache profile so we only hit Supabase ONCE ───
let _profileCache = null;
let _profileFetchPromise = null;

// Steadfast Courier API Configuration
let STEADFAST_API_KEY = '';
let STEADFAST_SECRET_KEY = '';
const STEADFAST_BASE_URL = 'https://portal.packzy.com/api/v1';

// Reset all sidebar link styles to default
function resetSidebarLinks() {
    const mainLinks = ['link-dashboard', 'link-pre-orders', 'link-customers', 'link-roles', 'link-admins', 'link-inventory'];
    const submenuLinks = [
        'link-create-new', 'link-all-orders', 'link-pending', 'link-confirmed', 
        'link-failed-orders', 'link-processing', 'link-hold', 'link-hold-followup',
        'link-in-courier', 'link-cod-changed', 'link-delivered', 'link-completed',
        'link-canceled', 'link-pending-return', 'link-returned', 'link-damage',
        'link-hand-delivery', 'link-hand-delivery-completed', 'link-others',
        'link-return-collection', 'link-courier-payment', 'link-bulk-print', 
        'link-send-courier', 'link-payments', 'link-general-settings', 
        'link-website-settings', 'link-courier-settings'
    ];

    // Reset Main Links
    mainLinks.forEach(id => {
        const link = document.getElementById(id);
        if (link) {
            link.className = 'flex items-center px-3 py-2.5 text-gray-300 hover:text-white hover:bg-black/20 rounded-md transition-colors';
        }
    });
    
    // Reset Dashboard Icon
    const dbIcon = document.getElementById('icon-dashboard');
    if (dbIcon) dbIcon.className = 'fas fa-home w-7 text-center text-gray-400';

    // Reset All Submenu Links
    submenuLinks.forEach(id => {
        const link = document.getElementById(id);
        if (link) {
            link.className = 'block pl-11 pr-3 py-2 text-[13px] text-gray-400 hover:text-white hover:bg-black/20 rounded-md transition-colors';
        }
    });
}

// Router logic
async function handleRouting() {
    const hash = window.location.hash || '#/dashboard';
    const container = document.getElementById('view-container');
    
    // ─── Non-blocking: profile loads in background, doesn't delay page switch ───
    loadGlobalUserProfile(); // No await — fire and forget
    
    // Reset sidebar first
    resetSidebarLinks();

    if (hash === '#/dashboard') {
        container.innerHTML = dashboardHTML;
        highlightLink('link-dashboard');
        const dbIcon = document.getElementById('icon-dashboard');
        if (dbIcon) dbIcon.className = 'fas fa-home w-7 text-center';
        fetchOrders();
    } else if (hash === '#/profile') {
        container.innerHTML = profileHTML;
        initProfilePage();
    } else if (hash === '#/create-order') {
        container.innerHTML = createOrderHTML;
        highlightLink('link-create-new', true);
        initOrderCalculations();
        fetchSteadfastDistricts();
        initOrderForm();
        fetchProductsForOrder();
        initNumericFields();
    } else if (hash === '#/products') {
        container.innerHTML = productListHTML;
        highlightLink('link-inventory', false);
        fetchAllProducts();
    } else if (hash === '#/create-product') {
        container.innerHTML = createProductHTML;
        highlightLink('link-inventory', false);
        initProductForm();
        
        // Lazy-load CKEditor only when needed (saves ~2MB on all other pages)
        loadCKEditorLazy();
    } else if (hash === '#/purchase') {
        container.innerHTML = purchaseHTML;
        highlightLink('link-inventory', false);
    } else if (hash === '#/roles') {
        container.innerHTML = rolesHTML;
        highlightLink('link-roles', false);
    } else if (hash === '#/admins') {
        container.innerHTML = adminsHTML;
        highlightLink('link-admins', false);
    } else if (hash === '#/settings/general') {
        container.innerHTML = settingsGeneralHTML;
        highlightLink('link-general-settings', true);
        initGeneralSettings();
    } else if (hash === '#/settings/website') {
        container.innerHTML = settingsWebsiteHTML;
        highlightLink('link-website-settings', true);
    } else if (hash === '#/settings/courier') {
        container.innerHTML = settingsCourierHTML;
        highlightLink('link-courier-settings', true);
        initCourierSettings();
        loadCourierSettings();
    } else if (hash === '#/suppliers') {
        container.innerHTML = suppliersHTML;
        highlightLink('link-inventory', false);
    } else if (hash === '#/all-orders') {
        container.innerHTML = allOrdersHTML;
        highlightLink('link-all-orders', true);
        setTimeout(() => fetchAllOrders(), 50);
    } else if (hash === '#/return-collection') {
        container.innerHTML = returnCollectionHTML;
        highlightLink('link-return-collection', true);
    } else if (hash === '#/courier-payment') {
        container.innerHTML = courierPaymentHTML;
        highlightLink('link-courier-payment', true);
    } else if (hash === '#/bulk-print') {
        container.innerHTML = bulkPrintHTML;
        highlightLink('link-bulk-print', true);
    } else if (hash === '#/send-courier') {
        container.innerHTML = sendCourierHTML;
        highlightLink('link-send-courier', true);
    } else if (hash === '#/payments') {
        container.innerHTML = paymentsHTML;
        highlightLink('link-payments', true);
    } else if (hash === '#/pre-orders') {
        container.innerHTML = preOrdersHTML;
        highlightLink('link-pre-orders');
    } else if (hash === '#/customers') {
        container.innerHTML = customersHTML;
        highlightLink('link-customers');
        fetchCustomers();
    } else if (hash === '#/roles') {
        container.innerHTML = rolesHTML;
        highlightLink('link-roles');
        fetchRoles();
    } else if (hash.startsWith('#/status/')) {
        const status = decodeURIComponent(hash.replace('#/status/', ''));
        showOrdersByStatus(status);
    }
}

// Helper to highlight sidebar links
function highlightLink(id, isSubmenu = false) {
    const link = document.getElementById(id);
    if (link) {
        if (isSubmenu) {
            link.className = 'block pl-11 pr-3 py-2 text-[13px] text-brand-orange bg-black/20 rounded-md transition-colors';
        } else {
            link.className = 'flex items-center px-3 py-2.5 text-brand-orange bg-black/20 rounded-md transition-colors nav-link';
        }
    }
}

// Trial Banner Logic
function initTrialBanner() {
    const ENABLE_TRIAL_MODE = false; // Set to true if you ever want to sell or rent this software
    const banner = document.getElementById('trial-banner');
    
    if (!banner) return;

    if (!ENABLE_TRIAL_MODE || localStorage.getItem('hideTrialBanner') === 'true') {
        banner.style.display = 'none';
        return;
    }

    banner.style.display = 'flex';

    // Target Date Logic (e.g., 25/04/2026)
    const targetDate = new Date('2026-04-25T23:59:59');
    const now = new Date();
    const diffTime = targetDate - now;
    
    let diffDays = 0;
    let diffHours = 0;

    if (diffTime > 0) {
        diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    }

    const daysEl = document.getElementById('trial-days');
    const hoursEl = document.getElementById('trial-hours');
    if (daysEl) daysEl.innerText = diffDays.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerText = diffHours.toString().padStart(2, '0');

    // Fetch total orders to calculate remaining
    _supabase.from('orders').select('id', { count: 'exact', head: true }).then(({ count, error }) => {
        if (!error) {
            const totalLimit = 150;
            let remaining = totalLimit - (count || 0);
            if (remaining < 0) remaining = 0;
            
            const ordersEl = document.getElementById('trial-orders');
            if (ordersEl) ordersEl.innerText = remaining;
        }
    });
}

// Handle browser navigation
window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', () => {
    initTrialBanner();
    handleRouting();
});
function showView(viewName) {
    window.location.hash = `#/${viewName}`;
}

// Show orders filtered by a specific status
function showOrdersByStatus(status) {
    const container = document.getElementById('view-container');
    container.innerHTML = statusOrdersHTML(status);

    // Highlight the matching status link
    const statusIdMap = {
        'Pending': 'link-pending', 'Confirmed': 'link-confirmed', 'Failed Orders': 'link-failed-orders',
        'Processing': 'link-processing', 'Hold': 'link-hold', 'Hold Followup': 'link-hold-followup',
        'In Courier': 'link-in-courier', 'COD Changed': 'link-cod-changed', 'Delivered': 'link-delivered',
        'Completed': 'link-completed', 'Canceled': 'link-canceled', 'Pending Return': 'link-pending-return',
        'Returned': 'link-returned', 'Damage': 'link-damage', 'Hand Delivery': 'link-hand-delivery',
        'Hand Delivery Completed': 'link-hand-delivery-completed', 'Others': 'link-others',
        'Return Collection': 'link-return-collection', 'Courier Payment Validate': 'link-courier-payment'
    };
    const linkId = statusIdMap[status];
    if (linkId) {
        highlightLink(linkId, true);
    }
    
    setTimeout(() => fetchOrdersByStatus(status), 50);
}

// Supabase Initialization
const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

/** 
 * FRAUD CHECKER CONFIGURATION
 * Local Dev: http://localhost:5000
 * Production: https://your-app-name.onrender.com (Change this after hosting)
 */
const FRAUD_API_URL = 'http://localhost:5000';

// Initialize with extra headers to prevent 406 errors
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
        headers: { 'Accept': 'application/json' }
    }
});

async function fetchOrders() {
    try {
        const data = await AppAPI.getOrders();
        updateDashboardStats(data);
        renderTable(data.slice(0, 10)); // Show top 10 recent
        fetchLowStockProducts();
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
}

function updateDashboardStats(orders) {
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'Pending').length,
        confirmed: orders.filter(o => o.status === 'Confirmed').length,
        processing: orders.filter(o => o.status === 'Processing').length,
        delivered: orders.filter(o => o.status === 'Delivered').length,
        completed: orders.filter(o => o.status === 'Completed').length,
        canceled: orders.filter(o => o.status === 'Canceled').length,
        inCourier: orders.filter(o => o.status === 'In Courier').length,
        sales: orders.reduce((sum, o) => sum + (parseFloat(o.amount) || 0), 0),
        purchase: orders.reduce((sum, o) => sum + (parseFloat(o.purchase_price) || 0), 0)
    };

    const profit = stats.sales - stats.purchase;
    const conversion = stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0;

    // Mapping of stat IDs to their counts in the NEW dashboard UI
    const statElements = {
        'totalCount': stats.total,
        'pendingCount': stats.pending,
        'completedCount': stats.completed,
        'inCourierCount': stats.inCourier,
        'olderCount': orders.filter(o => {
            const days = (new Date() - new Date(o.created_at)) / (1000 * 60 * 60 * 24);
            return days > 7 && o.status !== 'Completed';
        }).length,
        'conversionRate': conversion + '%',
        'salesTotal': stats.sales + '৳',
        'purchaseTotal': stats.purchase + '৳',
        'profitTotal': profit + '৳',
        'unitsCount': orders.length // Assuming 1 unit per order for now or sum of items
    };

    for (const [id, value] of Object.entries(statElements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    }
}

async function fetchLowStockProducts() {
    try {
        const products = await AppAPI.getLowStockProducts(5);
        const tableBody = document.getElementById('lowestStockTable');
        if (!tableBody) return;

        if (products.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-gray-500 bg-gray-50/50 text-xs">All products are in healthy stock</td></tr>';
            return;
        }

        tableBody.innerHTML = products.map(p => `
            <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                <td class="px-4 py-3">${p.title}</td>
                <td class="px-4 py-3">
                    <img src="${p.image || 'https://via.placeholder.com/40'}" class="w-8 h-8 rounded border object-cover">
                </td>
                <td class="px-4 py-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] bg-red-100 text-red-600 font-bold">${p.stock} Left</span>
                </td>
                <td class="px-4 py-3">
                    <button onclick="window.location.hash='#/create-product'" class="text-blue-500 hover:text-blue-700 text-[10px] font-bold">Refill</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching low stock:', error);
    }
}

async function fetchOrdersByStatus(status) {
    const { data, error } = await _supabase
        .from('orders')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching status orders:', error);
        return;
    }

    const table = document.getElementById('orders-table-body');
    if (table) {
        table.innerHTML = data.map((order, idx) => `
            <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                <td class="px-4 py-3">${idx + 1}</td>
                <td class="px-4 py-3">${new Date(order.created_at).toLocaleDateString()}</td>
                <td class="px-4 py-3 font-medium">${order.customer_name}<br><span class="text-gray-500 text-[10px]">${order.customer_phone}</span></td>
                <td class="px-4 py-3">${order.product_name}</td>
                <td class="px-4 py-3">${order.amount} TK</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-700 font-medium">${order.status}</span>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="6" class="p-4 text-center text-gray-500">No orders found</td></tr>';
    }
}

async function fetchAllOrders() {
    const { data, error } = await _supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all orders:', error);
        return;
    }

    const table = document.getElementById('allOrderTable');
    if (table) {
        table.innerHTML = data.map((order, idx) => `
            <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors text-[11px]">
                <td class="px-4 py-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-700 font-medium">${order.status}</span>
                </td>
                <td class="px-2 py-3 text-center"><input type="checkbox"></td>
                <td class="px-4 py-3"><i class="fas fa-sticky-note text-gray-400"></i></td>
                <td class="px-4 py-3 font-medium text-blue-600">#${order.id.toString().slice(-6)}</td>
                <td class="px-4 py-3 font-medium">${order.name || '-'}<br><span class="text-gray-500 text-[10px]">${order.phone || '-'}</span></td>
                <td class="px-4 py-3">${new Date(order.created_at).toLocaleDateString()}</td>
                <td class="px-4 py-3 truncate max-w-[150px]">${order.address || '-'}</td>
                <td class="px-4 py-3">${order.courier || 'None'}</td>
                <td class="px-4 py-3 font-bold text-gray-900">${order.amount} TK</td>
                <td class="px-4 py-3 text-gray-500">Admin</td>
            </tr>
        `).join('') || '<tr><td colspan="10" class="p-4 text-center text-gray-500">No orders found</td></tr>';
    }
}

function renderTable(orders) {
    const table = document.getElementById('recentOrdersTable');
    if (!table) return;

    if (orders.length === 0) {
        table.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-gray-500">No orders found</td></tr>';
        return;
    }

    table.innerHTML = orders.map((order, idx) => `
        <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors">
            <td class="px-4 py-3">${idx + 1}</td>
            <td class="px-4 py-3">${new Date(order.created_at).toLocaleDateString()}</td>
            <td class="px-4 py-3 font-medium text-gray-800">${order.name || '-'}<br><span class="text-gray-500 text-[10px] font-normal">${order.phone || '-'}</span></td>
            <td class="px-4 py-3 text-gray-600">${order.product_name}</td>
            <td class="px-4 py-3 font-bold text-gray-900">${order.amount} TK</td>
            <td class="px-4 py-3">
                <span class="px-2 py-1 rounded-full text-[10px] bg-purple-100 text-purple-700 font-semibold">${order.status}</span>
            </td>
        </tr>
    `).join('');
}

async function fetchCustomers() {
    const { data, error } = await _supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching customers:', error);
        return;
    }

    renderCustomersTable(data);
    
    // Setup Search (Dynamic)
    const oldSearchInput = document.getElementById('customer-search');
    if (oldSearchInput) {
        // Clone to remove any existing event listeners from previous renders
        const searchInput = oldSearchInput.cloneNode(true);
        oldSearchInput.parentNode.replaceChild(searchInput, oldSearchInput);
        
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = data.filter(c => 
                (c.name && c.name.toLowerCase().includes(term)) || 
                (c.phone && c.phone.includes(term)) || 
                (c.email && c.email.toLowerCase().includes(term))
            );
            renderCustomersTable(filtered);
        });
    }
}

function renderCustomersTable(customers) {
    const table = document.getElementById('customers-table-body');
    if (!table) return;

    if (customers.length === 0) {
        table.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-gray-500">No customers found</td></tr>';
        return;
    }

    table.innerHTML = customers.map((c, idx) => `
        <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors text-[11px]">
            <td class="px-4 py-3">${idx + 1}</td>
            <td class="px-4 py-3 font-medium">${c.name}<br><span class="text-gray-400 text-[10px]">${c.phone}</span></td>
            <td class="px-4 py-3">${c.total_orders}</td>
            <td class="px-4 py-3 font-bold">${c.total_amount}৳</td>
            <td class="px-4 py-3">
                <span class="px-2 py-0.5 rounded-full text-[10px] bg-green-100 text-green-700 font-medium">${c.status}</span>
            </td>
            <td class="px-4 py-3 text-right">
                <button class="text-blue-500 hover:text-blue-700 mr-2"><i class="fas fa-edit"></i></button>
                <button class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

async function fetchRoles() {
    const { data, error } = await _supabase
        .from('roles')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching roles:', error);
        return;
    }

    const table = document.getElementById('roles-table-body');
    if (table) {
        table.innerHTML = data.map((role, idx) => `
            <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                <td class="px-4 py-3">${idx + 1}</td>
                <td class="px-4 py-3 font-medium text-gray-800">${role.name}</td>
                <td class="px-4 py-3 text-gray-500 text-xs">${Array.isArray(role.permissions) ? role.permissions.join(', ') : 'No permissions'}</td>
                <td class="px-4 py-3">
                    <div class="flex space-x-2">
                        <button class="text-blue-500 hover:bg-blue-50 p-1.5 rounded transition-colors"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="4" class="p-4 text-center text-gray-500">No roles found</td></tr>';
    }
}

function initOrderCalculations() {
    const fields = ['subtotal', 'discount', 'shipping', 'advance'];
    const elements = {};
    
    // Set default date to today using Flatpickr
    const dateInput = document.getElementById('order-date');
    if (dateInput && typeof flatpickr !== 'undefined') {
        flatpickr(dateInput, {
            dateFormat: "d-M-Y",
            defaultDate: "today"
        });
    }

    fields.forEach(id => {
        elements[id] = document.getElementById(id);
    });
    
    const afterDiscountEl = document.getElementById('after-discount');
    const grandTotalEl = document.getElementById('grand-total');
    const dueEl = document.getElementById('due');

    const calculate = () => {
        const subtotal = parseFloat(elements.subtotal?.value) || 0;
        const discount = parseFloat(elements.discount?.value) || 0;
        const shipping = parseFloat(elements.shipping?.value) || 0;
        const advance = parseFloat(elements.advance?.value) || 0;

        const afterDiscount = subtotal - discount;
        const grandTotal = afterDiscount + shipping;
        const due = grandTotal - advance;

        if (afterDiscountEl) afterDiscountEl.innerText = afterDiscount > 0 ? afterDiscount : '';
        if (grandTotalEl) grandTotalEl.innerText = grandTotal > 0 ? grandTotal : '';
        if (dueEl) dueEl.innerText = due > 0 ? due : '';
    };

    fields.forEach(id => {
        if (elements[id]) {
            elements[id].addEventListener('input', calculate);
        }
    });
}

async function fetchSteadfastDistricts() {
    const districtDropdown = document.getElementById('order-district');
    if (!districtDropdown) return;

    const fallbackDistricts = [
        "Dhaka City", "Dhaka", "Chittagong", "Gazipur", "Narayanganj", "Sylhet", "Rajshahi", 
        "Khulna", "Barisal", "Rangpur", "Mymensingh", "Comilla", "Brahmanbaria", 
        "Noakhali", "Feni", "Chandpur", "Lakshmipur"
    ].sort();

    const populateDropdown = (areas, label = "Select District/Area") => {
        districtDropdown.innerHTML = `<option value="">${label}</option>` + 
            areas.map(area => `<option value="${area}">${area}</option>`).join('');
    };

    try {
        // 1. Try to fetch from own Database first (Cache)
        const { data: dbDistricts, error: dbError } = await _supabase.from('districts').select('name').order('name');
        
        if (!dbError && dbDistricts && dbDistricts.length > 0) {
            console.log("Loading districts from local cache...");
            populateDropdown(dbDistricts.map(d => d.name));
            return;
        }

        // 2. If no data in DB, fetch from API
        console.log("Cache empty, fetching from Steadfast API...");
        const { data: settings } = await _supabase.from('settings').select('*');
        if (settings) {
            settings.forEach(item => {
                if (item.key === 'steadfast_api_key') STEADFAST_API_KEY = item.value;
                if (item.key === 'steadfast_secret_key') STEADFAST_SECRET_KEY = item.value;
            });
        }
// Courier Settings Logic
async function loadCourierSettings() {
    try {
        const settings = await AppAPI.getSettings();
        
        // Populate Global Settings
        if (settings['enable_courier']) {
            const toggle = document.getElementById('enable-courier-toggle');
            if (toggle) {
                toggle.value = settings['enable_courier'];
                toggleCourierDetails(settings['enable_courier']);
            }
        }
        
        // Map of Setting Keys to Element IDs
        const fieldMap = {
            'steadfast_api_key': 'steadfast-api-key',
            'steadfast_secret_key': 'steadfast-secret-key',
            'carrybee_mobile': 'carrybee-mobile',
            'carrybee_password': 'carrybee-password',
            'carrybee_client_id': 'carrybee-client-id',
            'carrybee_client_secret': 'carrybee-client-secret',
            'pathao_client_id': 'pathao-client-id',
            'pathao_client_secret': 'pathao-client-secret',
            'redx_api_token': 'redx-api-token',
            'default_courier_note': 'default-courier-note',
            'default_cod_charge': 'default-cod-charge'
        };

        for (const [key, id] of Object.entries(fieldMap)) {
            const el = document.getElementById(id);
            if (el && settings[key]) el.value = settings[key];
        }

        // Toggles
        const toggleMap = {
            'steadfast_enabled': 'toggle-steadfast',
            'carrybee_enabled': 'toggle-carrybee',
            'pathao_enabled': 'toggle-pathao',
            'redx_enabled': 'toggle-redx'
        };

        for (const [key, id] of Object.entries(toggleMap)) {
            const el = document.getElementById(id);
            if (el) el.checked = settings[key] === 'true';
        }

    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

function initCourierSettings() {
    const saveBtn = document.getElementById('save-courier-settings');
    if (!saveBtn) return;

    saveBtn.addEventListener('click', async () => {
        saveBtn.innerText = 'Updating...';
        saveBtn.disabled = true;

        try {
            const settingsData = {
                'enable_courier': document.getElementById('enable-courier-toggle')?.value,
                'steadfast_api_key': document.getElementById('steadfast-api-key')?.value,
                'steadfast_secret_key': document.getElementById('steadfast-secret-key')?.value,
                'steadfast_enabled': document.getElementById('toggle-steadfast')?.checked.toString(),
                'carrybee_mobile': document.getElementById('carrybee-mobile')?.value,
                'carrybee_enabled': document.getElementById('toggle-carrybee')?.checked.toString(),
                'pathao_client_id': document.getElementById('pathao-client-id')?.value,
                'pathao_enabled': document.getElementById('toggle-pathao')?.checked.toString(),
                'redx_api_token': document.getElementById('redx-api-token')?.value,
                'redx_enabled': document.getElementById('toggle-redx')?.checked.toString(),
                'default_courier_note': document.getElementById('default-courier-note')?.value,
                'default_cod_charge': document.getElementById('default-cod-charge')?.value
            };

            await AppAPI.updateMultipleSettings(settingsData);
            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings.');
        } finally {
            saveBtn.innerText = 'Update';
            saveBtn.disabled = false;
        }
    });
}
        if (!STEADFAST_API_KEY || !STEADFAST_SECRET_KEY) {
            populateDropdown(fallbackDistricts, "Select District (Fallback)");
            return;
        }

        const response = await fetch(`${STEADFAST_BASE_URL}/police_stations`, {
            headers: { 'Api-Key': STEADFAST_API_KEY, 'Secret-Key': STEADFAST_SECRET_KEY }
        });

        if (!response.ok) throw new Error("API failed");

        const result = await response.json();
        if (result && result.data) {
            const areas = [...new Set(result.data.map(item => item.name))].sort();
            populateDropdown(areas);

            // 3. Save to local DB for future use (Background sync)
            console.log("Syncing API data to local cache...");
            const insertData = areas.map(name => ({ name }));
            _supabase.from('districts').upsert(insertData, { onConflict: 'name' }).then(({ error }) => {
                if (error) console.error("Cache sync failed:", error);
                else console.log("Local cache updated!");
            });
        } else {
            populateDropdown(fallbackDistricts, "Select District (Fallback)");
        }

    } catch (err) {
        console.error("Districts error:", err);
        populateDropdown(fallbackDistricts, "Select District (Fallback)");
    }
}

function initOrderForm() {
    const submitBtn = document.getElementById('submit-order');
    const mobileInput = document.getElementById('order-mobile');

    if (mobileInput) {
        let debounceTimer;
        mobileInput.addEventListener('input', (e) => {
            const phone = e.target.value.trim();
            clearTimeout(debounceTimer);

            const badge = document.getElementById('customer-autofill-badge');
            const msg = document.getElementById('customer-autofill-msg');

            if (phone.length < 11) {
                if (badge) badge.classList.add('hidden');
                return;
            }

            debounceTimer = setTimeout(async () => {
                try {
                    // Use direct fetch to bypass library-specific 406 errors
                    const custRes = await fetch(`${SUPABASE_URL}/rest/v1/customers?phone=eq.${phone}&select=*`, {
                        headers: {
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`,
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (custRes.ok) {
                        const customers = await custRes.json();
                        const customer = customers[0];

                        if (customer) {
                            const nameEl    = document.getElementById('order-name');
                            const emailEl   = document.getElementById('order-email');
                            const addressEl = document.getElementById('order-address');
                            const totalEl   = document.getElementById('cust-total-orders');
                            const doneEl    = document.getElementById('cust-completed-orders');

                            if (nameEl && customer.name) nameEl.value = customer.name;
                            if (emailEl && customer.email) emailEl.value = customer.email;
                            if (addressEl && customer.address) addressEl.value = customer.address;
                            if (totalEl) totalEl.value = customer.total_orders || 0;

                            // Fetch completed count using fetch
                            const orderRes = await fetch(`${SUPABASE_URL}/rest/v1/orders?phone=eq.${phone}&status=in.(Completed,Delivered)&select=count`, {
                                headers: { 
                                    'apikey': SUPABASE_KEY, 
                                    'Authorization': `Bearer ${SUPABASE_KEY}`, 
                                    'Prefer': 'count=exact' 
                                }
                            });
                            const completedCount = orderRes.headers.get('content-range')?.split('/')[1] || 0;
                            
                            if (doneEl) doneEl.value = completedCount;

                            if (badge && msg) {
                                msg.textContent = `✅ Returning Customer — ${customer.total_orders || 0} orders`;
                                badge.classList.remove('hidden');
                            }
                        } else {
                            if (badge && msg) {
                                msg.textContent = '🆕 New Customer';
                                badge.classList.remove('hidden');
                            }
                            const totalEl = document.getElementById('cust-total-orders');
                            const doneEl  = document.getElementById('cust-completed-orders');
                            if (totalEl) totalEl.value = 0;
                            if (doneEl)  doneEl.value  = 0;
                        }
                    }

                    // Trigger Fraud Check
                    performFraudCheck(phone);
                } catch (err) {
                    console.warn('Customer lookup error:', err);
                }
            }, 500);
        });
    }

    if (!submitBtn) return;

    submitBtn.addEventListener('click', async () => {
        const productNames = (window.selectedOrderProducts && window.selectedOrderProducts.length > 0) 
            ? window.selectedOrderProducts.map(p => `${p.title} (${p.quantity})`).join(', ') 
            : 'Manual Order';

        const orderData = {
            name: document.getElementById('order-name')?.value,
            phone: document.getElementById('order-mobile')?.value,
            address: document.getElementById('order-address')?.value,
            district: document.getElementById('order-district')?.value,
            amount: parseFloat(document.getElementById('subtotal')?.value || 0) + parseFloat(document.getElementById('shipping')?.value || 0) - parseFloat(document.getElementById('discount')?.value || 0),
            status: document.getElementById('order-status')?.value || 'Pending',
            product_name: productNames,
            created_at: new Date().toISOString()
        };

        if (!orderData.name || !orderData.phone) {
            alert('Please fill in required fields (Name and Mobile)');
            return;
        }

        submitBtn.innerText = 'Submitting...';
        submitBtn.disabled = true;

        try {
            // 1. Insert the order using native fetch
            const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(orderData)
            });
            
            if (!res.ok) throw new Error('Order submission failed');

            alert('Order created successfully!');
            window.location.hash = '#/all-orders';
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order.');
        } finally {
            submitBtn.innerText = 'Submit';
            submitBtn.disabled = false;
        }
    });
}

function initProductForm() {
    const submitBtn = document.getElementById('submit-product');
    const imageInput = document.getElementById('prod-image-input');
    const previewContainer = document.getElementById('prod-image-preview-container');
    const placeholder = document.getElementById('prod-image-placeholder');
    const previewImg = document.getElementById('prod-image-preview');

    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (previewImg) previewImg.src = event.target.result;
                    if (placeholder) placeholder.classList.add('hidden');
                    if (previewContainer) previewContainer.classList.remove('hidden');
                }
                reader.readAsDataURL(file);
            }
        });
    }

    if (!submitBtn) return;

    submitBtn.addEventListener('click', async () => {
        let imageUrl = '';
        const file = imageInput?.files[0];

        submitBtn.innerText = 'Uploading Image...';
        submitBtn.disabled = true;

        if (file) {
            try {
                // Compress product image to max 1000x1000
                const compressedBlob = await compressImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.7 });
                
                const fileName = `product_${Date.now()}.jpg`;
                const { data, error } = await _supabase.storage
                    .from('product-images')
                    .upload(fileName, compressedBlob, { contentType: 'image/jpeg' });

                if (error) {
                    console.warn('Storage upload failed (Bucket might not exist):', error);
                    // Fallback: If storage fails, we could use base64 (but it's large)
                    // For now, let's just alert
                    if (error.message.includes('bucket not found')) {
                        alert('Warning: Please create a public bucket named "product-images" in your Supabase Storage to save images.');
                    }
                } else {
                    const { data: urlData } = _supabase.storage
                        .from('product-images')
                        .getPublicUrl(fileName);
                    imageUrl = urlData.publicUrl;
                }
            } catch (err) {
                console.error('Image upload error:', err);
            }
        }

        const productData = {
            title: document.getElementById('prod-title')?.value,
            short_description: document.getElementById('prod-short-desc')?.value,
            regular_price: parseFloat(document.getElementById('prod-regular-price')?.value || 0),
            sale_price: parseFloat(document.getElementById('prod-sale-price')?.value || 0),
            sku: document.getElementById('prod-sku')?.value,
            unit: document.getElementById('prod-unit')?.value,
            unit_amount: parseFloat(document.getElementById('prod-unit-amount')?.value || 1),
            category: document.getElementById('prod-category')?.value,
            brand: document.getElementById('prod-brand')?.value,
            type: document.getElementById('prod-type')?.value,
            image: imageUrl,
            created_at: new Date().toISOString()
        };

        if (!productData.title || !productData.sale_price) {
            alert('Please fill in required fields (Title and Sale Price)');
            submitBtn.innerText = 'Create';
            submitBtn.disabled = false;
            return;
        }

        submitBtn.innerText = 'Creating Product...';

        try {
            const { error } = await _supabase.from('products').insert([productData]);
            if (error) throw error;
            alert('Product created successfully!');
            window.location.hash = '#/products';
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product.');
        } finally {
            submitBtn.innerText = 'Create';
            submitBtn.disabled = false;
        }
    });
}

window.removeProductImage = function() {
    const imageInput = document.getElementById('prod-image-input');
    const previewContainer = document.getElementById('prod-image-preview-container');
    const placeholder = document.getElementById('prod-image-placeholder');
    const previewImg = document.getElementById('prod-image-preview');

    if (imageInput) imageInput.value = '';
    if (previewContainer) previewContainer.classList.add('hidden');
    if (placeholder) placeholder.classList.remove('hidden');
    if (previewImg) previewImg.src = '#';
}

window.selectedOrderProducts = []; // Global state for order products

async function fetchProductsForOrder() {
    const searchBox = document.getElementById('product-search-box');
    const searchInput = document.getElementById('product-search-input');
    const dropdownList = document.getElementById('product-dropdown-list');
    
    if (!searchBox || !searchInput || !dropdownList) return;

    // Reset state on load
    window.selectedOrderProducts = [];
    renderSelectedProductsTable();

    let products = [];
    
    try {
        const { data, error } = await _supabase.from('products').select('*');
        if (error) throw error;
        products = data || [];
    } catch (error) {
        console.error('Error fetching products for order:', error);
        return;
    }

    // Render Dropdown Items
    const renderDropdown = (filterText = '') => {
        const filtered = products.filter(p => p.title.toLowerCase().includes(filterText.toLowerCase()));
        
        if (filtered.length === 0) {
            dropdownList.innerHTML = '<div class="p-4 text-center text-xs text-gray-500 italic">No products found</div>';
            return;
        }

        dropdownList.innerHTML = filtered.map(p => `
            <div class="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer flex items-center gap-3 transition-colors product-option" data-id="${p.id}">
                <div class="w-8 h-8 rounded bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                    ${p.image ? `<img src="${p.image}" class="w-full h-full object-cover">` : `<i class="fas fa-box text-gray-400 text-xs"></i>`}
                </div>
                <div class="flex-1">
                    <div class="text-[13px] font-bold text-gray-800">${p.title}</div>
                    <div class="text-[10px] text-gray-500 font-medium">${p.sale_price}৳</div>
                </div>
            </div>
        `).join('');

        // Attach click events
        dropdownList.querySelectorAll('.product-option').forEach(el => {
            el.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const selectedProduct = products.find(prod => prod.id == id);
                if (selectedProduct) {
                    addProductToTable(selectedProduct);
                    dropdownList.classList.add('hidden');
                    searchInput.value = '';
                    renderDropdown(''); // reset
                }
            });
        });
    };

    // Toggle Dropdown
    searchBox.addEventListener('click', (e) => {
        dropdownList.classList.toggle('hidden');
        if (!dropdownList.classList.contains('hidden')) {
            searchInput.focus();
        }
    });

    // Handle Search input
    searchInput.addEventListener('input', (e) => {
        dropdownList.classList.remove('hidden');
        renderDropdown(e.target.value);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && !dropdownList.contains(e.target)) {
            dropdownList.classList.add('hidden');
        }
    });

    // Initial render
    renderDropdown('');
}

function addProductToTable(product) {
    const existing = window.selectedOrderProducts.find(p => p.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        window.selectedOrderProducts.push({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.sale_price || 0,
            quantity: 1,
            discount: 0
        });
    }
    renderSelectedProductsTable();
}

window.removeSelectedProduct = function(id) {
    window.selectedOrderProducts = window.selectedOrderProducts.filter(p => p.id != id);
    renderSelectedProductsTable();
};

window.updateProductQuantity = function(id, delta) {
    const item = window.selectedOrderProducts.find(p => p.id == id);
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) item.quantity = 1;
        renderSelectedProductsTable();
    }
};

window.updateProductPrice = function(id, value) {
    const item = window.selectedOrderProducts.find(p => p.id == id);
    if (item) {
        item.price = parseFloat(value) || 0;
        renderSelectedProductsTable();
    }
};

window.updateProductDiscount = function(id, value) {
    const item = window.selectedOrderProducts.find(p => p.id == id);
    if (item) {
        item.discount = parseFloat(value) || 0;
        renderSelectedProductsTable();
    }
};

function renderSelectedProductsTable() {
    const tbody = document.getElementById('selected-products-body');
    if (!tbody) return;

    if (window.selectedOrderProducts.length === 0) {
        tbody.innerHTML = `
            <tr id="empty-product-row">
                <td colspan="6" class="py-8 text-center text-gray-400 italic text-xs border-b border-x border-gray-200">No products selected</td>
            </tr>
        `;
        const subtotalInput = document.getElementById('subtotal');
        if(subtotalInput) {
            subtotalInput.value = 0;
            subtotalInput.dispatchEvent(new Event('input'));
        }
        return;
    }

    let totalSubtotal = 0;

    tbody.innerHTML = window.selectedOrderProducts.map(p => {
        const rowSubtotal = (p.price * p.quantity) - p.discount;
        totalSubtotal += rowSubtotal;

        return `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="py-2 px-4 border-r border-gray-100">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                            ${p.image ? `<img src="${p.image}" class="w-full h-full object-cover">` : `<i class="fas fa-box text-gray-400 text-xs"></i>`}
                        </div>
                        <div class="text-[13px] text-gray-800">${p.title} <br><span class="text-gray-400 text-[11px]">(${p.quantity} Unit)</span></div>
                    </div>
                </td>
                <td class="py-2 px-4 border-r border-gray-100 text-center">
                    <div class="w-5 h-5 bg-black rounded-full mx-auto shadow-sm"></div>
                </td>
                <td class="py-2 px-4 border-r border-gray-100">
                    <input type="number" value="${p.price}" onchange="updateProductPrice(${p.id}, this.value)" class="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500">
                </td>
                <td class="py-2 px-4 border-r border-gray-100 text-center">
                    <div class="flex items-center justify-center gap-1">
                        <button onclick="updateProductQuantity(${p.id}, -1)" class="w-6 h-6 bg-gray-500 text-white rounded flex items-center justify-center hover:bg-gray-600 focus:outline-none"><i class="fas fa-minus text-[10px]"></i></button>
                        <input type="text" value="${p.quantity}" readonly class="w-10 text-center border border-gray-300 rounded py-1 text-sm bg-white">
                        <button onclick="updateProductQuantity(${p.id}, 1)" class="w-6 h-6 bg-gray-500 text-white rounded flex items-center justify-center hover:bg-gray-600 focus:outline-none"><i class="fas fa-plus text-[10px]"></i></button>
                    </div>
                </td>
                <td class="py-2 px-4 border-r border-gray-100">
                    <input type="number" value="${p.discount}" onchange="updateProductDiscount(${p.id}, this.value)" class="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500">
                </td>
                <td class="py-2 px-4">
                    <input type="text" value="${rowSubtotal}" readonly class="w-24 border border-gray-200 bg-gray-100 rounded px-2 py-1 text-sm text-gray-500 mb-1 cursor-not-allowed">
                    <a href="javascript:void(0)" onclick="removeSelectedProduct(${p.id})" class="block text-xs text-orange-500 hover:text-orange-700">Remove</a>
                </td>
            </tr>
        `;
    }).join('');

    // Update main subtotal in the order calculations
    const mainSubtotalInput = document.getElementById('subtotal');
    if (mainSubtotalInput) {
        mainSubtotalInput.value = totalSubtotal;
        mainSubtotalInput.dispatchEvent(new Event('input')); // Trigger recalculation of Total Amount
    }
}

async function fetchAllProducts() {
    const table = document.getElementById('productListTable');
    if (!table) return;

    try {
        const { data, error } = await _supabase.from('products').select('*').order('created_at', { ascending: false });
        if (error) throw error;

        if (data.length === 0) {
            table.innerHTML = '<tr><td colspan="11" class="px-4 py-8 text-center text-gray-400 italic">No products found</td></tr>';
            return;
        }

        table.innerHTML = data.map((p, idx) => `
            <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                <td class="px-3 py-3 border-r border-gray-100 text-center">${idx + 1}</td>
                <td class="px-3 py-3 border-r border-gray-100 text-center"><input type="checkbox" class="rounded border-gray-300"></td>
                <td class="px-3 py-3 border-r border-gray-100 font-medium">${p.title}</td>
                <td class="px-3 py-3 border-r border-gray-100 text-gray-500">${p.sku || '-'}</td>
                <td class="px-3 py-3 border-r border-gray-100 text-center">
                    <img src="${p.image || 'https://via.placeholder.com/40'}" class="w-8 h-8 rounded border object-cover mx-auto">
                </td>
                <td class="px-3 py-3 border-r border-gray-100">${p.type || 'Simple'}</td>
                <td class="px-3 py-3 border-r border-gray-100">${p.regular_price || 0}৳</td>
                <td class="px-3 py-3 border-r border-gray-100 font-bold">${p.sale_price}৳</td>
                <td class="px-3 py-3 border-r border-gray-100">
                    <span class="px-2 py-0.5 rounded-full text-[10px] ${p.stock <= 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} font-bold">${p.stock || 0} In Stock</span>
                </td>
                <td class="px-3 py-3 border-r border-gray-100">
                    <span class="px-2 py-0.5 rounded-full text-[10px] bg-green-100 text-green-700 font-medium">Active</span>
                </td>
                <td class="px-3 py-3 text-right">
                    <button class="text-blue-500 hover:text-blue-700 mr-2"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteProduct(${p.id})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching all products:', error);
    }
}

window.deleteProduct = async function(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        const { error } = await _supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        
        alert('Product deleted successfully!');
        fetchAllProducts(); // Refresh the list
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
    }
}

// General Settings Initialization & Save Logic
async function initGeneralSettings() {
    const saveBtn = document.getElementById('save-general-settings');
    const logoInput = document.getElementById('setting-logo-input');
    const previewImg = document.getElementById('setting-logo-preview');
    const placeholder = document.getElementById('logo-placeholder');
    
    if (!saveBtn) return;

    // 1. Load Existing Settings
    try {
        const settings = await AppAPI.getSettings();
        
        const fieldMap = {
            'business_name': 'setting-business-name',
            'business_mobile': 'setting-business-mobile',
            'business_email': 'setting-business-email',
            'business_web_url': 'setting-web-url',
            'business_address': 'setting-address'
        };

        for (const [key, id] of Object.entries(fieldMap)) {
            const el = document.getElementById(id);
            if (el && settings[key]) el.value = settings[key];
        }

        // Handle Logo Preview
        if (settings['business_logo']) {
            previewImg.src = settings['business_logo'];
            previewImg.classList.remove('hidden');
            placeholder.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error loading general settings:', error);
    }

    // 2. Logo Preview Logic
    if (logoInput) {
        logoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (previewImg) {
                        previewImg.src = event.target.result;
                        previewImg.classList.remove('hidden');
                    }
                    if (placeholder) placeholder.classList.add('hidden');
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // 3. Save Logic
    saveBtn.addEventListener('click', async () => {
        const originalText = saveBtn.innerText;
        saveBtn.innerText = 'Updating...';
        saveBtn.disabled = true;

        let imageUrl = previewImg.src;

        // If a new file was selected, upload it first
        const file = logoInput?.files[0];
        if (file) {
            try {
                // Compress product image to max 1000x1000
                const compressedBlob = await compressImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.7 });
                
                const fileName = `logo_${Date.now()}.jpg`;
                
                const { data, error } = await _supabase.storage
                    .from('product-images')
                    .upload(fileName, compressedBlob, { contentType: 'image/jpeg' });

                if (error) {
                    console.warn('Storage upload failed:', error);
                } else {
                    const { data: urlData } = _supabase.storage
                        .from('product-images')
                        .getPublicUrl(fileName);
                    imageUrl = urlData.publicUrl;
                }
            } catch (err) {
                console.error('Logo upload error:', err);
            }
        }

        const settingsData = {
            'business_name': document.getElementById('setting-business-name')?.value,
            'business_mobile': document.getElementById('setting-business-mobile')?.value,
            'business_email': document.getElementById('setting-business-email')?.value,
            'business_web_url': document.getElementById('setting-web-url')?.value,
            'business_address': document.getElementById('setting-address')?.value,
            'business_logo': imageUrl
        };

        try {
            await AppAPI.updateMultipleSettings(settingsData);
            alert('General settings updated successfully!');
        } catch (error) {
            console.error('Error saving general settings:', error);
            alert('Failed to save settings.');
        } finally {
            saveBtn.innerText = originalText;
            saveBtn.disabled = false;
        }
    });
}

window.removeGeneralLogo = function() {
    const previewImg = document.getElementById('setting-logo-preview');
    const placeholder = document.getElementById('logo-placeholder');
    const logoInput = document.getElementById('setting-logo-input');

    if (previewImg) {
        previewImg.src = '';
        previewImg.classList.add('hidden');
    }
    if (placeholder) {
        placeholder.classList.remove('hidden');
    }
    if (logoInput) {
        logoInput.value = '';
    }
};

// Profile Dropdown Toggle Logic
window.toggleProfileDropdown = function(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
};

// Global Click Listener to close dropdowns
window.addEventListener('click', function(e) {
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileTrigger = document.getElementById('profile-trigger');
    
    if (profileDropdown && !profileDropdown.contains(e.target) && !profileTrigger.contains(e.target)) {
        profileDropdown.classList.add('hidden');
    }
});

// Global Profile Sync (Header/Dropdown)
// Uses in-memory cache — only fetches from Supabase once per session
async function loadGlobalUserProfile() {
    try {
        // If already cached, apply immediately without any network call
        if (_profileCache) {
            applyProfileToUI(_profileCache);
            return;
        }

        // If a fetch is already in-flight, reuse the same promise
        if (!_profileFetchPromise) {
            _profileFetchPromise = AppAPI.getSettings();
        }

        const settings = await _profileFetchPromise;
        _profileCache = settings; // Save to cache
        applyProfileToUI(settings);
    } catch (error) {
        console.error('Error loading global profile:', error);
    }
}

function applyProfileToUI(settings) {
    const name = settings['admin_name'] || 'Top One Bazar';
    const imageUrl = settings['admin_image'];

    const headerName = document.getElementById('header-user-name');
    const dropdownName = document.getElementById('dropdown-user-name');
    const headerImg = document.getElementById('header-user-img');
    const headerIcon = document.getElementById('header-user-icon');

    if (headerName) headerName.innerText = name;
    if (dropdownName) dropdownName.innerText = name;

    if (headerImg && headerIcon) {
        if (imageUrl) {
            headerImg.src = imageUrl;
            headerImg.classList.remove('hidden');
            headerIcon.classList.add('hidden');
        } else {
            headerImg.classList.add('hidden');
            headerIcon.classList.remove('hidden');
        }
    }
}

// Profile Page Initialization
async function initProfilePage() {
    const profilePicInput = document.getElementById('profile-pic-input');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    const updateProfileBtn = document.getElementById('update-profile-btn');
    const updatePasswordBtn = document.getElementById('update-password-btn');

    // 1. Load Existing Profile Data
    try {
        const settings = await AppAPI.getSettings();
        
        const adminName = settings['admin_name'] || 'Top One Bazar';
        if (settings['admin_name']) document.getElementById('profile-name').value = settings['admin_name'];
        if (settings['admin_email']) document.getElementById('profile-email').value = settings['admin_email'];
        if (settings['admin_mobile']) document.getElementById('profile-mobile').value = settings['admin_mobile'];
        if (settings['admin_address']) document.getElementById('profile-address').value = settings['admin_address'];

        // Set display name in the header card
        const displayName = document.getElementById('profile-display-name');
        if (displayName) displayName.innerText = adminName;

        // Show profile picture if available, otherwise show default SVG avatar
        const picDefault = document.getElementById('profile-pic-default');
        if (settings['admin_image']) {
            profilePicPreview.src = settings['admin_image'];
            profilePicPreview.classList.remove('hidden');
            if (picDefault) picDefault.classList.add('hidden');
        } else {
            profilePicPreview.classList.add('hidden');
            if (picDefault) picDefault.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error loading profile settings:', error);
    }

    // 2. Picture Preview Logic
    if (profilePicInput && profilePicPreview) {
        profilePicInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (profilePicPreview) {
                        profilePicPreview.src = event.target.result;
                        profilePicPreview.classList.remove('hidden');
                    }
                    const picDefault = document.getElementById('profile-pic-default');
                    if (picDefault) picDefault.classList.add('hidden');
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // 3. Save Logic (Profile Info)
    if (updateProfileBtn) {
        updateProfileBtn.addEventListener('click', async () => {
            const originalText = updateProfileBtn.innerHTML;
            updateProfileBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Updating...';
            updateProfileBtn.disabled = true;

            let imageUrl = profilePicPreview.src;
            if (imageUrl.startsWith('data:')) imageUrl = ''; // If it's base64 but not uploaded yet, reset it to empty for now

            // 1. Get old image URL for cleanup
            const oldImageUrl = _profileCache?.admin_image;

            // If a new file was selected, upload it
            const file = profilePicInput?.files[0];
            if (file) {
                try {
                    // Compress profile image to max 500x500
                    const compressedBlob = await compressImage(file, { maxWidth: 500, maxHeight: 500, quality: 0.8 });
                    const fileName = `admin_profile_${Date.now()}.jpg`;
                    
                    const { data, error } = await _supabase.storage
                        .from('product-images')
                        .upload(fileName, compressedBlob, { contentType: 'image/jpeg' });

                    if (!error) {
                        const { data: urlData } = _supabase.storage
                            .from('product-images')
                            .getPublicUrl(fileName);
                        imageUrl = urlData.publicUrl;

                        // Cleanup: Delete old image from storage if it exists and is different
                        if (oldImageUrl && oldImageUrl.includes('supabase.co')) {
                            const oldPath = oldImageUrl.split('/').pop();
                            if (oldPath) {
                                await _supabase.storage.from('product-images').remove([oldPath]);
                                console.log('✅ Old profile image deleted:', oldPath);
                            }
                        }
                        // Clear the file input so it doesn't re-upload on next click
                        if (profilePicInput) profilePicInput.value = '';
                    }
                } catch (err) {
                    console.error('Profile image upload error:', err);
                }
            }

            const profileData = {
                'admin_name': document.getElementById('profile-name')?.value,
                'admin_email': document.getElementById('profile-email')?.value,
                'admin_mobile': document.getElementById('profile-mobile')?.value,
                'admin_address': document.getElementById('profile-address')?.value,
                'admin_image': imageUrl
            };

            try {
                await AppAPI.updateMultipleSettings(profileData);
                _profileCache = null;       // Bust cache so next load re-fetches
                _profileFetchPromise = null;
                await loadGlobalUserProfile(); // Sync Header/Dropdown
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Error saving profile:', error);
                alert('Failed to save profile changes.');
            } finally {
                updateProfileBtn.innerHTML = originalText;
                updateProfileBtn.disabled = false;
            }
        });
    }

    // 4. Password Security (Mock logic)
    if (updatePasswordBtn) {
        updatePasswordBtn.addEventListener('click', function() {
            const oldPass = document.getElementById('profile-old-password')?.value;
            const newPass = document.getElementById('profile-new-password')?.value;
            const confirmPass = document.getElementById('profile-confirm-password')?.value;

            if (!oldPass || !newPass || !confirmPass) {
                alert('Please fill in all password fields.');
                return;
            }

            if (newPass !== confirmPass) {
                alert('New passwords do not match!');
                return;
            }
            
            alert('Password updated successfully! (Note: This is a placeholder action)');
        });
    }
}

window.removeProfilePic = async function() {
    const previewImg = document.getElementById('profile-pic-preview');
    const picDefault = document.getElementById('profile-pic-default');
    const fileInput = document.getElementById('profile-pic-input');
    const removeBtn = document.querySelector('[onclick="window.removeProfilePic()"]');

    // Show loading state
    if (removeBtn) {
        removeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Removing...';
        removeBtn.disabled = true;
    }

    try {
        // 1. Get current image URL from Supabase settings
        const currentImageUrl = previewImg?.src || '';

        // 2. Delete file from Supabase Storage (if it's a Supabase hosted URL)
        if (currentImageUrl && currentImageUrl.includes('supabase.co/storage')) {
            // Extract file path from URL: .../product-images/filename.ext
            const urlParts = currentImageUrl.split('/product-images/');
            if (urlParts.length > 1) {
                const filePath = urlParts[1].split('?')[0]; // remove any query params
                const { error: storageError } = await _supabase.storage
                    .from('product-images')
                    .remove([filePath]);
                if (storageError) {
                    console.warn('Storage delete warning:', storageError.message);
                } else {
                    console.log('✅ File deleted from Supabase Storage:', filePath);
                }
            }
        }

        // 3. Clear admin_image in settings table
        await AppAPI.updateSetting('admin_image', '');
        console.log('✅ admin_image cleared from settings');

        // 4. Bust profile cache so header reflects change
        _profileCache = null;
        _profileFetchPromise = null;
        loadGlobalUserProfile();

        // 5. Update UI — hide photo, show SVG avatar
        if (previewImg) {
            previewImg.src = '';
            previewImg.classList.add('hidden');
        }
        if (picDefault) picDefault.classList.remove('hidden');
        if (fileInput) fileInput.value = '';

    } catch (err) {
        console.error('Error removing profile picture:', err);
        alert('ছবি রিমুভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
        if (removeBtn) {
            removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Remove';
            removeBtn.disabled = false;
        }
    }
};

// ─── Lazy CKEditor Loader ───────────────────────────────────────────────
// Loads CKEditor script only once on demand (first visit to Create Product page)
let _ckEditorLoaded = false;
let _ckEditorLoading = false;

function loadCKEditorLazy() {
    const initEditor = () => {
        if (typeof CKEDITOR !== 'undefined') {
            if (CKEDITOR.instances['product-description']) {
                CKEDITOR.instances['product-description'].destroy(true);
            }
            CKEDITOR.config.versionCheck = false;
            CKEDITOR.replace('product-description', {
                height: 300,
                removeButtons: 'PasteFromWord',
                removePlugins: 'exportpdf'
            });
        }
    };

    if (_ckEditorLoaded) {
        initEditor();
        return;
    }

    if (_ckEditorLoading) {
        const interval = setInterval(() => {
            if (typeof CKEDITOR !== 'undefined') {
                clearInterval(interval);
                _ckEditorLoaded = true;
                initEditor();
            }
        }, 100);
        return;
    }

    _ckEditorLoading = true;
    const script = document.createElement('script');
    script.src = 'https://cdn.ckeditor.com/4.22.1/full/ckeditor.js';
    script.onload = () => {
        _ckEditorLoaded = true;
        _ckEditorLoading = false;
        initEditor();
    };
    document.head.appendChild(script);
}

// ─── Global Header Search ───────────────────────────────────────────────
function initGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    const resultsPanel = document.getElementById('global-search-results');
    const loader = document.getElementById('global-search-loader');
    let searchTimer = null;

    if (!searchInput || !resultsPanel) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();

        if (query.length < 2) {
            resultsPanel.classList.add('hidden');
            resultsPanel.innerHTML = '';
            if (loader) loader.classList.add('hidden');
            return;
        }

        // Show loading spinner on the right
        if (loader) loader.classList.remove('hidden');

        clearTimeout(searchTimer);
        searchTimer = setTimeout(async () => {
            try {
                let supabaseQuery = _supabase.from('orders').select('*');
                if (!isNaN(query)) {
                    supabaseQuery = supabaseQuery.or(`id.eq.${parseInt(query) || 0},phone.ilike.%${query}%`);
                } else {
                    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,status.ilike.%${query}%`);
                }

                const { data, error } = await supabaseQuery.limit(8);
                
                // Hide loading spinner
                if (loader) loader.classList.add('hidden');

                if (error) throw error;

                if (!data || data.length === 0) {
                    resultsPanel.innerHTML = '<div class="p-4 text-center text-sm text-gray-500 italic">No result found!</div>';
                } else {
                    resultsPanel.innerHTML = data.map(order => `
                        <a href="#/all-orders" class="flex items-center justify-between px-4 py-3 hover:bg-purple-50 transition-colors border-b border-gray-50 last:border-0 group">
                            <div class="flex flex-col">
                                <span class="text-[13px] font-bold text-gray-800 group-hover:text-purple-700">#${order.id} - ${order.name || 'No Name'}</span>
                                <span class="text-[11px] text-gray-500">${order.phone || 'No Phone'}</span>
                            </div>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider 
                                ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                  order.status === 'Canceled' ? 'bg-red-100 text-red-700' : 
                                  'bg-purple-100 text-purple-700'}">
                                ${order.status}
                            </span>
                        </a>
                    `).join('');
                }
                resultsPanel.classList.remove('hidden');
            } catch (err) {
                console.error('Search error:', err);
                if (loader) loader.classList.add('hidden');
            }
        }, 400);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            resultsPanel.classList.add('hidden');
            searchInput.blur();
        }
    });

    document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('global-search-wrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            resultsPanel.classList.add('hidden');
        }
    });
}
initGlobalSearch();


// ─── Numeric Input Restriction ──────────────────────────────────────────
function restrictToNumbers(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Prevent non-numeric characters on keypress
    el.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });

    // Clean up pasted content or mobile input
    el.addEventListener('input', (e) => {
        const originalValue = el.value;
        const cleanedValue = originalValue.replace(/[^0-9]/g, '');
        if (originalValue !== cleanedValue) {
            el.value = cleanedValue;
        }
    });
}

// Re-initialize numeric restrictions after routing
function initNumericFields() {
    const numericFields = [
        'order-mobile', 
        'order-alternative', 
        'discount', 
        'shipping', 
        'advance', 
        'subtotal'
    ];
    numericFields.forEach(id => restrictToNumbers(id));
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initNumericFields);
initNumericFields();

// ─── Image Compression Utility ──────────────────────────────────────────
/**
 * Compresses an image file and returns a Blob
 * @param {File} file - The original image file
 * @param {Object} options - maxWidth, maxHeight, quality
 * @returns {Promise<Blob>}
 */
async function compressImage(file, { maxWidth = 1200, maxHeight = 1200, quality = 0.7 } = {}) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate aspect ratio and new dimensions
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error('Canvas to Blob failed'));
                }, 'image/jpeg', quality);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
}


// ─── Fraud Check & Success Rate Analysis ────────────────────────────────
async function performFraudCheck(phone) {
    const fraudSection = document.getElementById('fraud-check-section');
    if (!fraudSection) return;

    // Show section and reset UI to loading state
    fraudSection.classList.remove('hidden');
    const msg = document.getElementById('fraud-insight-msg');
    if (msg) msg.innerHTML = '<div class="flex items-center gap-2 text-indigo-600 font-bold"><i class="fas fa-circle-notch fa-spin"></i> Analyzing global delivery history...</div>';

    // Clear previous breakdown if any
    const oldBreakdown = document.getElementById('courier-breakdown-details');
    if (oldBreakdown) oldBreakdown.innerHTML = '';

    try {
        // 1. Fetch internal stats using direct fetch (to fix 406 error)
        const internalRes = await fetch(`${SUPABASE_URL}/rest/v1/orders?phone=eq.${phone}&select=status`, {
            headers: { 
                'apikey': SUPABASE_KEY, 
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Accept': 'application/json'
            }
        });
        const internalOrders = internalRes.ok ? await internalRes.json() : [];

        const internalTotal = internalOrders.length;
        const internalSuccess = internalOrders.filter(o => ['Completed', 'Delivered'].includes(o.status)).length;
        const internalFailed = internalOrders.filter(o => ['Canceled', 'Failed', 'Returned'].includes(o.status)).length;

        // 2. Fetch external stats using the dedicated Fraud API Server
        let externalData = { total: 0, success: 0, cancel: 0, couriers: [] };
        try {
            console.log('Fetching fraud data from dedicated server:', FRAUD_API_URL);
            const funcRes = await fetch(`${FRAUD_API_URL}/api/check/${phone}`);
            
            if (funcRes.ok) {
                const funcData = await funcRes.json();
                if (funcData && !funcData.error) {
                    externalData = funcData;
                    console.log('Fraud Data Received:', externalData);
                } else {
                    console.warn('Scraper API error:', funcData.error);
                }
            } else {
                console.error('Fraud API call failed with status:', funcRes.status);
            }
        } catch (e) {
            console.error('Fraud API connection failed. Is the server running?', e);
        }

        // 3. Aggregate Data
        const total = internalTotal + (externalData.total || 0);
        const success = internalSuccess + (externalData.success || 0);
        const failed = internalFailed + (externalData.cancel || 0);
        const successRate = total > 0 ? Math.round((success / total) * 100) : 0;

        // 4. Update Main UI
        const totalEl = document.getElementById('fraud-total');
        const successEl = document.getElementById('fraud-success');
        const failedEl = document.getElementById('fraud-failed');
        const percentText = document.getElementById('fraud-percent-text');
        const scoreText = document.getElementById('fraud-score-text');
        
        if (totalEl) totalEl.innerText = total;
        if (successEl) successEl.innerText = success;
        if (failedEl) failedEl.innerText = failed;
        if (percentText) percentText.innerText = successRate + '%';
        if (scoreText) scoreText.innerText = successRate + '%';
        
        const bar = document.getElementById('fraud-score-bar');
        const circle = document.getElementById('fraud-circle-path');
        const tag = document.getElementById('fraud-tag');

        if (bar) bar.style.width = successRate + '%';
        if (circle) circle.setAttribute('stroke-dasharray', `${successRate}, 100`);

        // 5. Build Insight Message & Risk Tags
        let riskColor = '#6366f1';
        let riskText = 'New Customer';
        let insight = '';

        if (total === 0) {
            insight = "No previous order history detected in your database or external courier networks.";
            if (tag) tag.classList.add('hidden');
        } else if (successRate >= 80) {
            riskColor = '#22c55e';
            riskText = 'Safe Customer';
            insight = `Excellent reliability! This customer has a ${successRate}% delivery success rate across ${total} orders.`;
            if (bar) bar.className = 'bg-green-500 h-full transition-all duration-1000';
        } else if (successRate >= 50) {
            riskColor = '#f59e0b';
            riskText = 'Moderate Risk';
            insight = `Average reliability. ${failed} orders were canceled/returned in the past. Proceed with verification.`;
            if (bar) bar.className = 'bg-yellow-500 h-full transition-all duration-1000';
        } else {
            riskColor = '#ef4444';
            riskText = 'High Risk Alert';
            insight = `Warning! Extremely low delivery rate (${successRate}%). Highly recommend advance payment.`;
            if (bar) bar.className = 'bg-red-500 h-full transition-all duration-1000';
        }

        if (circle) circle.setAttribute('stroke', riskColor);
        if (msg) msg.innerText = insight;
        
        if (tag && total > 0) {
            tag.innerText = riskText;
            tag.className = `inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                successRate >= 80 ? 'bg-green-100 text-green-700' : 
                successRate >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`;
            tag.classList.remove('hidden');
        }

        // 6. Enhanced Courier Breakdown Grid (Merging Internal & External)
        const allCouriers = [];

        // Add Internal Shop Data if exists
        if (internalTotal > 0) {
            allCouriers.push({
                name: "Your Shop History",
                total: internalTotal,
                success: internalSuccess,
                cancel: internalFailed,
                isInternal: true
            });
        }

        // Add External Courier Data
        if (externalData.couriers && externalData.couriers.length > 0) {
            externalData.couriers.forEach(c => allCouriers.push(c));
        }

        if (allCouriers.length > 0) {
            const footer = fraudSection.querySelector('.p-6');
            let breakdownDiv = document.getElementById('courier-breakdown-details');
            
            if (!breakdownDiv) {
                breakdownDiv = document.createElement('div');
                breakdownDiv.id = 'courier-breakdown-details';
                breakdownDiv.className = 'mt-8 pt-6 border-t border-gray-100';
                footer.appendChild(breakdownDiv);
            }

            const cardsHTML = allCouriers.map(c => {
                const rate = Math.round((c.success / c.total) * 100);
                const colorClass = rate >= 80 ? 'text-green-600' : rate >= 50 ? 'text-yellow-600' : 'text-red-600';
                const bgClass = rate >= 80 ? 'bg-green-50' : rate >= 50 ? 'bg-yellow-50' : 'bg-red-50';
                const borderClass = c.isInternal ? 'border-purple-300 ring-1 ring-purple-100' : 'border-gray-100';

                return `
                    <div class="bg-white p-3 rounded-xl border ${borderClass} shadow-sm flex flex-col justify-between hover:border-purple-200 transition-colors group">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-[10px] font-black ${c.isInternal ? 'text-purple-600' : 'text-gray-400'} uppercase tracking-tighter truncate w-24 group-hover:text-purple-600">
                                ${c.isInternal ? '<i class="fas fa-store mr-1"></i>' : ''}${c.name}
                            </span>
                            <span class="text-[9px] font-bold ${bgClass} ${colorClass} px-1.5 py-0.5 rounded shadow-sm">${rate}%</span>
                        </div>
                        <div class="flex justify-between items-end">
                            <div>
                                <p class="text-[8px] font-bold text-gray-400 uppercase leading-none mb-1">Total Parcels</p>
                                <p class="text-sm font-black text-gray-700 leading-none">${c.total}</p>
                            </div>
                            <div class="flex gap-2">
                                <div class="text-right">
                                    <p class="text-[8px] font-bold text-green-400 uppercase leading-none mb-1">Success</p>
                                    <p class="text-[11px] font-bold text-green-600 leading-none">${c.success}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-[8px] font-bold text-red-400 uppercase leading-none mb-1">Cancel</p>
                                    <p class="text-[11px] font-bold text-red-600 leading-none">${c.cancel}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            breakdownDiv.innerHTML = `
                <h3 class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <i class="fas fa-chart-pie"></i> Delivery Success Breakdown
                </h3>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    ${cardsHTML}
                </div>
            `;
        }

    } catch (err) {
        console.error('Fraud check error:', err);
        if (msg) msg.innerHTML = '<span class="text-red-500 font-bold">Error: API Server not connected. Please run server.js</span>';
    }
}

