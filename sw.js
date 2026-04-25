/**
 * Service Worker - Top One Admin
 * Strategy: Cache-first for static assets, Network-first for API calls
 * এটি ব্রাউজারে সব static file ক্যাশ করে রাখে,
 * ফলে পরের বার লোড হয় সার্ভার থেকে নয়, সরাসরি ব্রাউজার থেকে!
 */

const CACHE_NAME = 'topone-admin-v1';
const STATIC_ASSETS = [
    '/js/ui_utils.js',
    '/js/auth.js',
    '/js/api.js',
    '/js/app.js',
    '/js/settings_manager.js',
    '/js/views/filter_manager.js',
    '/js/views/dashboard.js',
    '/js/views/product_list.js',
    '/js/views/create_product.js',
    '/js/views/create_order.js',
    '/js/views/all_orders.js',
    '/js/views/status_orders.js',
    '/js/views/purchase.js',
    '/js/views/suppliers.js',
    '/js/views/return_collection.js',
    '/js/views/courier_payment.js',
    '/js/views/bulk_print.js',
    '/js/views/send_courier.js',
    '/js/views/payments.js',
    '/js/views/pre_orders.js',
    '/js/views/customers.js',
    '/js/views/roles.js',
    '/js/views/admins.js',
    '/js/views/profile.js',
    '/js/views/settings_general.js',
    '/js/views/settings_website.js',
    '/js/views/settings_courier.js',
    '/js/views/settings_tabs/tab_general.js',
    '/js/views/settings_tabs/tab_order.js',
    '/js/views/settings_tabs/tab_invoice.js',
    '/js/views/settings_tabs/tab_customer.js',
    '/js/views/settings_tabs/tab_others.js',
    '/images/logo.png',
];

// ─── Install: Pre-cache all static assets ───
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW] Pre-caching static assets...');
            return cache.addAll(STATIC_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// ─── Activate: Remove old caches ───
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// ─── Fetch Strategy ───
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Skip: Supabase API calls (always fresh data)
    if (url.hostname.includes('supabase.co')) {
        return; // Network only
    }

    // Skip: Fraud checker API
    if (url.hostname.includes('onrender.com')) {
        return;
    }

    // Skip: Non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Strategy: Cache-first for JS/CSS/Images
    if (
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.jpg') ||
        url.pathname.endsWith('.webp') ||
        url.pathname.endsWith('.svg') ||
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com') ||
        url.hostname.includes('cdnjs.cloudflare.com') ||
        url.hostname.includes('cdn.jsdelivr.net')
    ) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;
                return fetch(event.request).then(response => {
                    if (response && response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    }
                    return response;
                });
            })
        );
        return;
    }

    // Strategy: Network-first for HTML pages
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
