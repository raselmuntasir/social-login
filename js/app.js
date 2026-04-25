// Active sidebar link tracking
let _activeStatusLinkId = null;

// ─── Performance: Cache profile so we only hit Supabase ONCE ───
let _profileCache = null;
let _profileFetchPromise = null;

// Global Cache for Orders to prevent excessive API calls
let _cachedOrders = null;
let _lastOrdersFetchTime = 0;
const CACHE_TTL_MS = 60000; // 60 seconds

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

// ─── Routing & Loading Navigation ───
function getLoaderHTML() {
    return `
        <div id="page-loader" class="flex flex-col items-center justify-center h-full space-y-4">
            <div class="relative w-16 h-16">
                <div class="absolute inset-0 border-4 border-purple-100 rounded-full"></div>
                <div class="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div class="flex flex-col items-center">
                <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Data</p>
                <p class="text-[10px] text-gray-300 mt-1 uppercase tracking-tighter">Please wait a moment...</p>
            </div>
        </div>
    `;
}

async function navigateTo(viewHTML, initFn) {
    const container = document.getElementById('view-container');
    if (!container) return;

    // 1. Show Loader
    container.innerHTML = getLoaderHTML();
    
    // 2. Prepare content hidden initially
    const tempDiv = document.createElement('div');
    tempDiv.className = 'opacity-0 transition-opacity duration-300 flex-1 flex flex-col h-full';
    tempDiv.innerHTML = viewHTML;
    
    // Append to container immediately (so init functions can find elements)
    // but keep it hidden via opacity
    container.appendChild(tempDiv);
    
    // 3. Initialize content (fetch data)
    try {
        if (initFn) await initFn();
    } catch (err) {
        console.error('Initialization error:', err);
    }

    // 4. Show content and remove loader
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('opacity-0');
        setTimeout(() => loader.remove(), 300);
    }
    
    requestAnimationFrame(() => {
        tempDiv.classList.remove('opacity-0');
        tempDiv.classList.add('opacity-100');
    });
    
    // Initialize icons if any
    if (window.lucide) window.lucide.createIcons();
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
        highlightLink('link-dashboard');
        navigateTo(dashboardHTML, async () => {
            const dbIcon = document.getElementById('icon-dashboard');
            if (dbIcon) dbIcon.className = 'fas fa-home w-7 text-center';
            await fetchOrders(); // Full fetch only on dashboard
        });
    } else if (hash === '#/profile') {
        navigateTo(profileHTML, initProfilePage);
    } else if (hash === '#/create-order') {
        highlightLink('link-create-new', true);
        navigateTo(createOrderHTML, async () => {
            initOrderCalculations();
            await fetchSteadfastDistricts();
            initOrderForm();
            await fetchProductsForOrder();
            initNumericFields();
            if (window.SettingsManager) {
                await window.SettingsManager.populateCreateOrderDropdowns();
                await window.SettingsManager.applyAdditionalStatuses();
            }
        });
    } else if (hash === '#/products') {
        highlightLink('link-inventory', false);
        navigateTo(productListHTML, async () => {
            await fetchAllProducts();
            if (window.SettingsManager) await window.SettingsManager.populateProductDropdowns();
        });
    } else if (hash === '#/create-product') {
        highlightLink('link-inventory', false);
        navigateTo(createProductHTML, async () => {
            initProductForm();
            loadCKEditorLazy();
            if (window.SettingsManager) await window.SettingsManager.populateProductDropdowns();
        });
    } else if (hash === '#/purchase') {
        highlightLink('link-inventory', false);
        navigateTo(purchaseHTML);

    } else if (hash === '#/settings/general') {
        highlightLink('link-general-settings', true);
        navigateTo(settingsGeneralHTML, initGeneralSettings);
    } else if (hash === '#/settings/website') {
        highlightLink('link-website-settings', true);
        navigateTo(settingsWebsiteHTML);
    } else if (hash === '#/settings/courier') {
        highlightLink('link-courier-settings', true);
        navigateTo(settingsCourierHTML, async () => {
            initCourierSettings();
            await loadCourierSettings();
        });
    } else if (hash === '#/suppliers') {
        highlightLink('link-inventory', false);
        navigateTo(suppliersHTML);
    } else if (hash === '#/all-orders') {
        highlightLink('link-all-orders', true);
        navigateTo(allOrdersHTML, async () => {
            try { await fetchAllOrders(); } catch(e) { console.error('fetchAllOrders error:', e); }
            if (window.SettingsManager) window.SettingsManager.populateFilterDropdowns();
            if (window.initOrderFilterSection) initOrderFilterSection('all');
            // Populate district filter using the SAME function as create order
            fetchSteadfastDistricts('filter-order-district');
        });
    } else if (hash === '#/return-collection') {
        highlightLink('link-return-collection', true);
        navigateTo(returnCollectionHTML);
    } else if (hash === '#/courier-payment') {
        highlightLink('link-courier-payment', true);
        navigateTo(courierPaymentHTML);
    } else if (hash === '#/bulk-print') {
        highlightLink('link-bulk-print', true);
        navigateTo(bulkPrintHTML);
    } else if (hash === '#/send-courier') {
        highlightLink('link-send-courier', true);
        navigateTo(sendCourierHTML);
    } else if (hash === '#/payments') {
        highlightLink('link-payments', true);
        navigateTo(paymentsHTML);
    } else if (hash === '#/pre-orders') {
        highlightLink('link-pre-orders');
        navigateTo(preOrdersHTML);
    } else if (hash === '#/customers') {
        highlightLink('link-customers');
        navigateTo(customersHTML, fetchCustomers);
    } else if (hash === '#/roles') {
        if (!AuthManager.can('manage_roles')) {
            if (window.UI) UI.alert('Access Denied', 'আপনি এই পেজে প্রবেশের অনুমতি নেই।', 'error');
            window.location.hash = '#/dashboard';
            return;
        }
        highlightLink('link-roles');
        navigateTo(rolesHTML, fetchRoles);
    } else if (hash === '#/admins') {
        if (!AuthManager.can('manage_admins')) {
            if (window.UI) UI.alert('Access Denied', 'আপনি এই পেজে প্রবেশের অনুমতি নেই।', 'error');
            window.location.hash = '#/dashboard';
            return;
        }
        highlightLink('link-admins');
        navigateTo(adminsHTML, fetchAdmins);
    } else if (hash === '#/profile') {
        navigateTo(profileHTML, initProfile);
    } else if (hash.startsWith('#/status/')) {
        const status = decodeURIComponent(hash.replace('#/status/', ''));
        navigateTo(statusOrdersHTML(status), async () => {
            try {
                await showOrdersByStatus(status);
                initBulkActions();
            } catch(e) { console.error('showOrdersByStatus error:', e); }
            if (window.SettingsManager) window.SettingsManager.populateFilterDropdowns();
            if (window.initOrderFilterSection) initOrderFilterSection('status');
            // Populate district filter using the SAME function as create order
            fetchSteadfastDistricts('filter-order-district');
        });
    }

    // Always refresh counts for sidebar badges (lightweight — only fetches status column)
    updateSidebarBadges();
}

// Lightweight sidebar badge update — only fetches 'status' column
async function updateSidebarBadges() {
    try {
        const orders = await AppAPI.getOrderCountsByStatus();
        const pendingCount = orders.filter(o => o.status === 'Pending').length;
        const badge = document.getElementById('sidebar-pending-count');
        if (badge) {
            badge.innerText = pendingCount;
            if (pendingCount > 0) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    } catch (e) {
        console.error('Badge update error:', e);
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
    // Inject additional statuses into sidebar immediately
    if (window.SettingsManager) window.SettingsManager.applyAdditionalStatuses();
});
function showView(viewName) {
    window.location.hash = `#/${viewName}`;
}

// Show orders filtered by a specific status
async function showOrdersByStatus(status) {
    const container = document.getElementById('view-container');
    
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
    
    await fetchOrdersByStatus(status);
}

// Supabase Initialization
const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

/** 
 * FRAUD CHECKER CONFIGURATION
 * Local Dev: http://localhost:5000
 * Production: https://soc-9ocu.onrender.com
 */
const FRAUD_API_URL = 'https://soc-9ocu.onrender.com';

// Initialize with extra headers to prevent 406 errors
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
        headers: { 'Accept': 'application/json' }
    }
});

// ─── Realtime: Listen for new orders and updates ───
function initRealtimeListeners() {
    _supabase
        .channel('schema-db-changes')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'orders' },
            (payload) => {
                console.log('Realtime New Order:', payload.new);
                updateSidebarBadges();
                
                // Auto-refresh current view if it's an order list
                const hash = window.location.hash;
                if (hash === '#/dashboard') {
                    if (typeof fetchOrders === 'function') fetchOrders(true);
                } else if (hash === '#/all-orders') {
                    // Refresh all orders table
                    AppAPI.getOrders().then(data => {
                        if (window._renderAllOrdersTable) window._renderAllOrdersTable(data);
                    });
                } else if (hash.startsWith('#/status/')) {
                    const status = decodeURIComponent(hash.replace('#/status/', ''));
                    if (typeof showOrdersByStatus === 'function') showOrdersByStatus(status);
                }
                
                // Show a small toast notification
                if (window.SettingsManager && window.SettingsManager._toast) {
                    window.SettingsManager._toast('🔔 New Order Received!', 'indigo');
                }
            }
        )
        .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'orders' },
            (payload) => {
                // If it was just a fraud scan update, we might not want to refresh the whole table 
                // but for simplicity we'll refresh counts
                updateSidebarBadges();
            }
        )
        .on(
            'postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'orders' },
            (payload) => {
                console.log('Realtime Order Deleted:', payload.old);
                updateSidebarBadges();
                
                // Refresh current view if needed
                const hash = window.location.hash;
                if (hash === '#/dashboard') {
                    if (typeof fetchOrders === 'function') fetchOrders(true);
                } else if (hash === '#/all-orders') {
                    if (typeof fetchAllOrders === 'function') fetchAllOrders();
                } else if (hash.startsWith('#/status/')) {
                    const status = decodeURIComponent(hash.replace('#/status/', ''));
                    if (typeof showOrdersByStatus === 'function') showOrdersByStatus(status);
                }
            }
        )
        .subscribe();
}

// Call it immediately
initRealtimeListeners();

async function fetchOrders(forceRefresh = false) {
    try {
        const now = Date.now();
        if (!forceRefresh && _cachedOrders && (now - _lastOrdersFetchTime < CACHE_TTL_MS)) {
            updateDashboardStats(_cachedOrders);
            renderTable(_cachedOrders.slice(0, 10));
            // Skip fetching low stock repeatedly
            return;
        }

        const data = await AppAPI.getOrders();
        _cachedOrders = data;
        _lastOrdersFetchTime = now;

        updateDashboardStats(data);
        renderTable(data.slice(0, 10)); // Show top 10 recent
        await fetchLowStockProducts();
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

    // --- Sidebar Badges ---
    const sidebarPending = document.getElementById('sidebar-pending-count');
    if (sidebarPending) {
        sidebarPending.innerText = stats.pending;
        if (stats.pending > 0) {
            sidebarPending.classList.remove('hidden');
        } else {
            sidebarPending.classList.add('hidden');
        }
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

    _renderStatusOrdersTable(data);
}

// Global function to render the status orders table
window._renderStatusOrdersTable = function(data) {
    if (window._renderAllOrdersTable) {
        window._renderAllOrdersTable(data);
    }
};

// Toggle Expandable Order Details Row
function toggleOrderDetails(btn, orderId) {
    const detailsRow = document.getElementById(`details-${orderId}`);
    const icon = btn.querySelector('.toggle-icon');
    
    if (detailsRow.classList.contains('hidden')) {
        detailsRow.classList.remove('hidden');
        btn.classList.replace('text-emerald-500', 'text-rose-500');
        icon.setAttribute('data-lucide', 'minus-circle');
    } else {
        detailsRow.classList.add('hidden');
        btn.classList.replace('text-rose-500', 'text-emerald-500');
        icon.setAttribute('data-lucide', 'plus-circle');
    }
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Utility to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-slate-800 text-white px-5 py-2.5 rounded-lg text-xs z-[300] shadow-2xl border border-white/10 flex items-center gap-2 animate-bounce';
        toast.innerHTML = '<i class="fas fa-check-circle text-emerald-400"></i> কপি করা হয়েছে!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    });
}

function updateSelectedSummary() {
    const selectedCheckboxes = document.querySelectorAll('.order-id-check:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.value);
    const summaryInfo = document.querySelectorAll('.status-entry-info');
    
    summaryInfo.forEach(el => {
        if (selectedIds.length > 0) {
            el.innerHTML = `<span class="bg-brand-orange/10 text-brand-orange px-2 py-1 rounded font-bold border border-brand-orange/20">${selectedIds.length} orders selected</span>`;
        }
    });
}

function initBulkActions() {
    // Listen for checkbox changes to update summary
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('status-row-check') || e.target.id === 'selectAllStatus') {
            setTimeout(updateSelectedSummary, 50);
        }
    });

    // We use a more generic way to find the buttons since they are in a template
    document.addEventListener('click', async (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        if (target.innerText.includes('Change Selected')) {
            const selectedCheckboxes = document.querySelectorAll('.order-id-check:checked');
            const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.value);
            // Find the nearby select
            const select = target.previousElementSibling;
            const newStatus = select?.value;

            if (selectedIds.length === 0) {
                alert('Please select at least one order');
                return;
            }
            if (!newStatus) {
                alert('Please select a status');
                return;
            }

            if (!confirm(`Are you sure you want to change ${selectedIds.length} orders to ${newStatus}?`)) return;

            target.disabled = true;
            const oldText = target.innerText;
            target.innerText = 'Updating...';

            try {
                const { error } = await _supabase
                    .from('orders')
                    .update({ status: newStatus })
                    .in('id', selectedIds);

                if (error) throw error;

                alert('Orders updated successfully!');
                fetchOrders(); 
                const hash = window.location.hash;
                if (hash.startsWith('#/status/')) {
                    const status = decodeURIComponent(hash.replace('#/status/', ''));
                    showOrdersByStatus(status);
                }
            } catch (err) {
                console.error('Bulk update error:', err);
                alert('Failed to update orders');
            } finally {
                target.disabled = false;
                target.innerText = oldText;
            }
        }
    });
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

    // Use the shared render function (also used by filter)
    if (window._renderAllOrdersTable) {
        window._renderAllOrdersTable(data || []);
    } else {
        const table = document.getElementById('allOrderTable');
        if (table) {
            table.innerHTML = '<tr><td colspan="10" class="p-4 text-center text-gray-500">Please refresh. Filter manager is not loaded.</td></tr>';
        }
    }
}

// Global Order Delete Function
window.deleteOrder = async function(orderId) {
    if(!confirm('Are you sure you want to delete Order #' + orderId + '?')) return;
    
    try {
        const { error } = await _supabase.from('orders').delete().eq('id', orderId);
        if (error) throw error;
        
        alert('Order deleted successfully!');
        updateSidebarBadges(); // Update sidebar count immediately
        if (window.fetchAllOrders) window.fetchAllOrders();
        // Also refresh dashboard stats if on dashboard
        if (window.location.hash === '#/dashboard') fetchOrders(true);
    } catch (err) {
        console.error('Error deleting order:', err);
        alert('Failed to delete order. Check console for details.');
    }
};

window.deleteSelectedOrders = async function() {
    const checkboxes = document.querySelectorAll('.order-row-check:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one order to delete.');
        return;
    }
    
    if(!confirm(`Are you sure you want to delete ${checkboxes.length} selected orders?`)) return;
    
    const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.value));
    
    try {
        const { error } = await _supabase.from('orders').delete().in('id', idsToDelete);
        if (error) throw error;
        
        alert(`${checkboxes.length} orders deleted successfully!`);
        document.getElementById('selectAllOrders').checked = false;
        updateSidebarBadges(); // Update sidebar count immediately
        if (window.fetchAllOrders) window.fetchAllOrders();
        // Also refresh dashboard stats if on dashboard
        if (window.location.hash === '#/dashboard') fetchOrders(true);
    } catch (err) {
        console.error('Error deleting multiple orders:', err);
        alert('Failed to delete selected orders.');
    }
};

window.copyOrderInfo = function(orderId) {
    if (!window.allOrders) return;
    const order = window.allOrders.find(o => o.id == orderId);
    if (!order) return;
    
    const name = order.name || 'Unknown';
    const address = order.address || 'No Address';
    const phone = order.phone || '';
    
    // Parse product name and format
    const products = order.product_name || 'Manual Order';
    const productPrice = order.amount || 0;
    
    const shipping = order.shipping_cost || 0;
    const total = parseFloat(order.amount || 0);
    const paid = parseFloat(order.paid || 0);
    const due = total - paid;
    
    const textToCopy = `${name}
${address}
${phone}
----------------------
1 x ${products} - ${total}.00 Tk
----------------------
Shipping: ${shipping}.00 Tk
Total: ${total}.00 Tk
Paid: ${paid}.00 Tk
Due: ${due}.00 Tk`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Order Info Copied!');
    }).catch(err => {
        console.error('Failed to copy', err);
    });
};

window.toggleSelectAllOrders = function(checkbox) {
    const checkboxes = document.querySelectorAll('.order-row-check');
    checkboxes.forEach(cb => {
        cb.checked = checkbox.checked;
    });
};

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
            <td class="px-4 py-3 font-medium text-gray-800">${UI.escapeHTML(order.name || '-')}<br><span class="text-gray-500 text-[10px] font-normal">${UI.escapeHTML(order.phone || '-')}</span></td>
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

async function fetchSteadfastDistricts(targetId = 'order-district') {
    const districtDropdown = document.getElementById(targetId);
    if (!districtDropdown) return;

    const fallbackDistricts = [
        "Dhaka City", "Dhaka", "Chittagong", "Gazipur", "Narayanganj", "Sylhet", "Rajshahi", 
        "Khulna", "Barisal", "Rangpur", "Mymensingh", "Comilla", "Brahmanbaria", 
        "Noakhali", "Feni", "Chandpur", "Lakshmipur"
    ].sort();

    const populateDropdown = (areas, label = "Select District/Area") => {
        const currentLabel = targetId.includes('filter') ? "All District" : label;
        districtDropdown.innerHTML = `<option value="">${currentLabel}</option>` + 
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

        // 2. If no data in DB, fetch from API using cached settings
        console.log("Cache empty, fetching from Steadfast API...");
        const settings = await AppAPI.getSettings(); // Uses cache
        if (settings) {
            STEADFAST_API_KEY = settings['steadfast_api_key'] || '';
            STEADFAST_SECRET_KEY = settings['steadfast_secret_key'] || '';
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

                    // Reset lastFraudStats
                    window.lastFraudStats = null;
                    
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
            created_at: new Date().toISOString(),
            ...(window.lastFraudStats || {})
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
            await fetchOrders(); // Refresh counts before redirecting
            window.location.hash = '#/status/Pending';
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
            category: document.getElementById('prod-category')?.value || '',
            brand: document.getElementById('prod-brand')?.value || '',
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
    if (!window.SettingsManager) {
        console.error('SettingsManager not loaded');
        return;
    }

    // 1. Load all settings from DB into the UI
    await window.SettingsManager.loadSettings();

    // 2. Init tags inputs (Enter/comma to add pills)
    window.SettingsManager.initTagsInput('settings-order-sources-container');
    window.SettingsManager.initTagsInput('settings-order-tags-container');
    window.SettingsManager.initTagsInput('settings-additional-statuses-container');
    window.SettingsManager.initTagsInput('settings-customer-tags-container');

    // 3. Logo preview on file select
    const logoInput = document.getElementById('setting-logo-input');
    const previewImg = document.getElementById('setting-logo-preview');
    const placeholder = document.getElementById('logo-placeholder');
    if (logoInput) {
        logoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (previewImg) { previewImg.src = ev.target.result; previewImg.classList.remove('hidden'); }
                if (placeholder) placeholder.classList.add('hidden');
            };
            reader.readAsDataURL(file);
        });
    }

    // 4. Wire Save button to SettingsManager
    const saveBtn = document.getElementById('save-general-settings');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => window.SettingsManager.saveSettings('save-general-settings'));
    }
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
    const name = settings['admin_name'] || 'Admin';
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
        
        const adminName = settings['admin_name'] || 'Admin';
        if (settings['admin_name']) document.getElementById('profile-name').value = settings['admin_name'];
        if (settings['admin_email']) document.getElementById('profile-email').value = settings['admin_email'];
        if (settings['admin_mobile']) document.getElementById('profile-mobile').value = settings['admin_mobile'];
        if (settings['admin_address']) document.getElementById('profile-address').value = settings['admin_address'];

        // Set display name in the header card
        const displayName = document.getElementById('profile-display-name');
        if (displayName) displayName.innerText = adminName;

        // Show profile picture only after it has successfully loaded
        const picDefault = document.getElementById('profile-pic-default');
        const adminImgValue = settings['admin_image'];
        const hasValidUrl = adminImgValue && 
                           adminImgValue.trim() !== '' && 
                           adminImgValue !== 'null' && 
                           adminImgValue !== 'undefined' &&
                           (adminImgValue.startsWith('http') || adminImgValue.startsWith('data:image'));

        if (hasValidUrl) {
            // First set the src but keep it hidden
            profilePicPreview.src = adminImgValue;
            
            // Only toggle visibility after success
            profilePicPreview.onload = function() {
                profilePicPreview.classList.remove('hidden');
                if (picDefault) picDefault.classList.add('hidden');
            };

            // If image fails to load, stay on default
            profilePicPreview.onerror = function() {
                profilePicPreview.classList.add('hidden');
                if (picDefault) picDefault.classList.remove('hidden');
            };
        } else {
            profilePicPreview.src = '';
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
    
    // Clear previous breakdown and show loader
    const container = document.getElementById('courier-rows-container');
    if (container) {
        container.innerHTML = `
            <div class="flex justify-center items-center p-8">
                <div class="flex items-center gap-2 text-indigo-600 font-bold text-xs bg-indigo-50 px-4 py-2 rounded-full">
                    <i class="fas fa-circle-notch fa-spin"></i> Analyzing global delivery history...
                </div>
            </div>
        `;
    }

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
        // BizMation (Internal)
        const bizTotal = internalTotal;
        const bizSuccess = internalSuccess;
        const bizFailed = internalFailed;
        const bizRate = bizTotal > 0 ? Math.round((bizSuccess / bizTotal) * 100) : 0;

        // All External
        const allTotal = externalData.total || 0;
        const allSuccess = externalData.success || 0;
        const allFailed = externalData.cancel || 0;
        const allRate = allTotal > 0 ? Math.round((allSuccess / allTotal) * 100) : 0;

        // 4. Update Donuts
        const updateDonut = (prefix, total, success, failed, rate, color) => {
            const elTotal = document.getElementById(`${prefix}-total`);
            const elSuccess = document.getElementById(`${prefix}-success`);
            const elFailed = document.getElementById(`${prefix}-failed`);
            const elPercent = document.getElementById(`${prefix}-percent`);
            const elArc = document.getElementById(`${prefix}-arc`);

            if (elTotal) elTotal.innerText = total;
            if (elSuccess) elSuccess.innerText = success;
            if (elFailed) elFailed.innerText = failed;
            if (elPercent) elPercent.innerText = rate + '%';

            if (elArc) {
                const circ = 326.7;
                const offset = circ - (rate / 100) * circ;
                elArc.style.strokeDashoffset = offset;
                if (color) elArc.setAttribute('stroke', color);
            }
        };

        // BizMation Donut Color
        let bizColor = '#10b981'; // emerald-500
        if (bizRate < 50) bizColor = '#f43f5e'; // rose-500
        else if (bizRate < 80) bizColor = '#f59e0b'; // amber-500
        
        updateDonut('biz', bizTotal, bizSuccess, bizFailed, bizRate, bizTotal === 0 ? '#cbd5e1' : bizColor);

        // All External Donut Color
        let allColor = '#6366f1'; // indigo-500 (default)
        let badgeText = 'New';
        if (allRate >= 80) { allColor = '#10b981'; badgeText = 'Excellent'; }
        else if (allRate > 0 && allRate < 50) { allColor = '#f43f5e'; badgeText = 'Poor'; }
        else if (allRate >= 50 && allRate < 80) { allColor = '#f59e0b'; badgeText = 'Good'; }
        
        updateDonut('all', allTotal, allSuccess, allFailed, allRate, allTotal === 0 ? '#cbd5e1' : allColor);

        // Save for order submission
        window.lastFraudStats = {
            courier_total: allTotal, 
            courier_completed: allSuccess, 
            courier_pct: allRate,
            courier_to: allTotal,
            courier_su: allSuccess,
            courier_fa: allFailed,
            courier: badgeText
        };

        // 5. Update Courier Rows (Table Section)
        const container = document.getElementById('courier-rows-container');
        if (container) {
            let rowsHTML = '';

            // Handle external couriers
            if (externalData.couriers && externalData.couriers.length > 0) {
                rowsHTML = externalData.couriers.map((c, i) => {
                    const cTotal = c.total || 0;
                    const cSuccess = c.success || 0;
                    const cFailed = c.cancel || 0;
                    const cRate = cTotal > 0 ? Math.round((cSuccess / cTotal) * 100) : 0;
                    
                    let barColor = 'from-emerald-400 to-emerald-500';
                    let textColor = 'text-emerald-500';
                    let bgWidth = cTotal === 0 ? 0 : cRate;
                    
                    if (cTotal === 0) {
                        barColor = 'from-slate-300 to-slate-400';
                        textColor = 'text-slate-500';
                    } else if (cRate < 50) {
                        barColor = 'from-rose-400 to-rose-500';
                        textColor = 'text-rose-500';
                    } else if (cRate < 80) {
                        barColor = 'from-amber-400 to-amber-500';
                        textColor = 'text-amber-500';
                    }
                    
                    return `
                    <div class="bg-white border border-slate-200 rounded-xl p-3 px-4 hover:border-indigo-300 transition-all shadow-sm group">
                        <div class="flex items-center gap-4">
                            <div class="w-28 flex-shrink-0 flex items-center gap-2">
                                <p class="font-bold text-slate-700 text-[13px] truncate" title="${c.name}">${c.name}</p>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center justify-between mb-1.5">
                                    <span class="text-xs font-black ${textColor}">${cTotal === 0 ? '—' : cRate + '%'}</span>
                                    <div class="flex items-center gap-1.5 text-[11px]">
                                        <span class="text-slate-400 font-semibold">To: <span class="text-slate-700">${cTotal}</span></span>
                                        <span class="text-slate-300">|</span>
                                        <span class="text-slate-400 font-semibold">Su: <span class="text-emerald-500">${cSuccess}</span></span>
                                        <span class="text-slate-300">|</span>
                                        <span class="text-slate-400 font-semibold">Fa: <span class="text-rose-500">${cFailed}</span></span>
                                    </div>
                                </div>
                                <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                                    <div class="bg-gradient-to-r ${barColor} h-full transition-all duration-1000 ease-out" style="width: 0%" data-width="${bgWidth}"></div>
                                </div>
                            </div>
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center ml-2 flex-shrink-0 bg-slate-50 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                <i class="fas fa-truck text-slate-400 group-hover:text-indigo-500 transition-colors"></i>
                            </div>
                        </div>
                    </div>
                    `;
                }).join('');
            } else {
                rowsHTML = `
                <div class="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-6 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
                    No external courier history found
                </div>
                `;
            }

            container.innerHTML = rowsHTML;

            // Trigger progress bar animations after a slight delay
            setTimeout(() => {
                const bars = container.querySelectorAll('.bg-gradient-to-r');
                bars.forEach(bar => {
                    const w = bar.getAttribute('data-width');
                    if (w) bar.style.width = w + '%';
                });
            }, 100);
        }

    } catch (err) {
        console.error('Fraud check error:', err);
        if (msg) msg.innerHTML = '<span class="text-red-500 font-bold">Error: API Server not connected. Please run server.js</span>';
    }
}


// Global function to sync/refresh courier stats for an existing order
window.syncCourierStats = async function(orderId, phone) {
    if (!phone) return;
    
    // Find the button and add spin animation
    const btn = event?.currentTarget;
    const icon = btn?.querySelector('svg');
    if (icon) icon.classList.add('fa-spin');
    
    console.log('Syncing courier stats for order', orderId, phone);
    
    try {
        const API_URL = 'https://soc-9ocu.onrender.com';
        const funcRes = await fetch(`${API_URL}/api/check/${phone}`);
        if (funcRes.ok) {
            const funcData = await funcRes.json();
            if (funcData && !funcData.error) {
                const allTotal = funcData.total || 0;
                const allSuccess = funcData.success || 0;
                const allFailed = funcData.cancel || 0;
                const allRate = allTotal > 0 ? Math.round((allSuccess / allTotal) * 100) : 0;
                
                let badgeText = 'Unknown'; 
                if (allTotal > 0) {
                    if (allRate >= 80) { badgeText = 'Excellent'; }
                    else if (allRate > 0 && allRate < 50) { badgeText = 'Poor'; }
                    else if (allRate >= 50 && allRate < 80) { badgeText = 'Good'; }
                }

                const updateData = {
                    courier_total: allTotal, 
                    courier_completed: allSuccess, 
                    courier_pct: allRate,
                    courier_to: allTotal,
                    courier_su: allSuccess,
                    courier_fa: allFailed,
                    courier: badgeText
                };

                const { error } = await _supabase
                    .from('orders')
                    .update(updateData)
                    .eq('id', orderId);

                if (error) throw error;

                // Refresh the current view
                const hash = window.location.hash;
                if (hash === '#/all-orders' || hash === '#/dashboard') {
                    if (typeof fetchOrders === 'function') fetchOrders(true);
                } else if (hash.startsWith('#/status/')) {
                    const status = decodeURIComponent(hash.replace('#/status/', ''));
                    if (typeof showOrdersByStatus === 'function') showOrdersByStatus(status);
                }
                
                if (window.SettingsManager && window.SettingsManager._toast) {
                    window.SettingsManager._toast('✅ Stats updated successfully!', 'green');
                }
            }
        }
    } catch (err) {
        console.error('Sync failed:', err);
    } finally {
        if (icon) icon.classList.remove('fa-spin');
    }
};
