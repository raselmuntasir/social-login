/**
 * FilterManager — Date Range Picker + Order Filtering
 * Fixed: lazy Flatpickr init + close-others-on-open
 */

// ─── ACTIVE FILTER STATE ─────────────────────────────────────────────────────
window._orderFilters = {
    startDate:   null,
    endDate:     null,
    dateLabel:   'All Time',
    orderSource: '',
    orderTag:    '',
    orderStatus: '',
    orderDistrict: '',
    searchText:  '',
};

// ─── GLOBAL PANEL TRACKER ─────────────────────────────────────────────────────
window._drpOpenPanels = [];

function _drpCloseAll(except) {
    window._drpOpenPanels.forEach(({ panel, btn }) => {
        if (panel !== except) {
            panel.classList.add('hidden');
            btn.querySelector('i')?.classList.remove('rotate-180');
        }
    });
}

// ─── DATE RANGE PICKER ────────────────────────────────────────────────────────
class DateRangePicker {
    static _presets = [
        'Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days',
        'This Month', 'Last Month', 'This Year', 'Last Year', 'Max', 'Custom Range'
    ];

    static init(containerId, onApply, defaultLabel = 'All Time', align = 'left') {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        container.style.position = 'relative';

        // ── Trigger Button ──
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'w-full bg-purple-700 hover:bg-purple-800 text-white text-xs rounded-lg px-4 py-2.5 flex justify-between items-center cursor-pointer shadow-sm transition-colors';
        btn.innerHTML = `<span class="drp-label font-semibold">${defaultLabel}</span><i class="fa-solid fa-chevron-down text-[10px] transition-transform duration-200"></i>`;

        const display = document.createElement('p');
        display.className = 'text-[9px] text-gray-500 mt-1 drp-display min-h-[12px]';

        // ── Panel ──
        const alignClass = align === 'right' ? 'right-0' : 'left-0';
        const panel = document.createElement('div');
        panel.className = `hidden absolute z-[9999] bg-white border border-gray-200 rounded-xl shadow-2xl top-full ${alignClass} mt-1`;
        panel.style.minWidth = '560px';
        panel.setAttribute('data-drp-panel', containerId);

        // Presets
        const presetsHtml = this._presets.map(p => `
            <button type="button" data-preset="${p}"
                class="drp-preset w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors whitespace-nowrap">
                ${p}
            </button>`).join('');

        panel.innerHTML = `
            <div class="flex overflow-hidden">
                <div class="w-36 border-r border-gray-100 py-2 flex-shrink-0">${presetsHtml}</div>
                <div class="flex-1 p-3 min-w-0" id="${containerId}-cal-col">
                    <p class="text-xs text-gray-400 italic text-center pt-4">Select a preset or choose Custom Range</p>
                </div>
            </div>
            <div class="flex justify-between items-center px-4 py-3 border-t border-gray-100 bg-gray-50/50">
                <span class="drp-range-text text-xs text-gray-500 font-medium"></span>
                <div class="flex gap-2">
                    <button type="button" class="drp-cancel px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                    <button type="button" class="drp-apply px-4 py-1.5 text-xs text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 font-semibold">Apply</button>
                </div>
            </div>`;

        container.appendChild(btn);
        container.appendChild(display);
        container.appendChild(panel);

        // Register in global tracker
        window._drpOpenPanels.push({ panel, btn });

        // State
        let selectedStart = null, selectedEnd = null;
        let fp = null, fpInited = false;

        // ── Lazy init Flatpickr (only when panel first opens) ──
        const initFlatpickr = () => {
            if (fpInited) return;
            fpInited = true;
            const calCol = document.getElementById(`${containerId}-cal-col`);
            if (!calCol || typeof flatpickr === 'undefined') return;

            calCol.innerHTML = ''; // clear placeholder text
            const calInput = document.createElement('input');
            calInput.type = 'text';
            calInput.style.cssText = 'position:absolute;width:0;height:0;opacity:0;pointer-events:none';
            calCol.appendChild(calInput);

            fp = flatpickr(calInput, {
                mode: 'range',
                inline: true,
                showMonths: 2,
                dateFormat: 'Y-m-d',
                onChange: (dates) => {
                    if (dates.length >= 2) {
                        selectedStart = dates[0];
                        selectedEnd   = dates[1];
                        panel.querySelector('.drp-range-text').textContent = DateRangePicker._fmt(selectedStart, selectedEnd);
                    } else if (dates.length === 1) {
                        selectedStart = dates[0];
                        selectedEnd   = null;
                    }
                }
            });

            if (fp.calendarContainer) {
                fp.calendarContainer.style.cssText = 'position:static;display:block;box-shadow:none;border:none;';
                calCol.appendChild(fp.calendarContainer);
            }
        };

        // ── Toggle Open/Close ──
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = panel.classList.contains('hidden');

            // Close all other pickers first
            _drpCloseAll(panel);

            if (isHidden) {
                panel.classList.remove('hidden');
                btn.querySelector('i').classList.add('rotate-180');
                // Lazy init on first open
                initFlatpickr();
            } else {
                panel.classList.add('hidden');
                btn.querySelector('i').classList.remove('rotate-180');
            }
        });

        // ── Preset Clicks ──
        panel.querySelectorAll('.drp-preset').forEach(item => {
            item.addEventListener('click', () => {
                panel.querySelectorAll('.drp-preset').forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
                item.classList.add('bg-indigo-600', 'text-white');

                const preset = item.dataset.preset;
                if (preset === 'Custom Range') {
                    initFlatpickr();
                    const calCol = document.getElementById(`${containerId}-cal-col`);
                    if (calCol) calCol.style.display = '';
                    return;
                }

                const dates = DateRangePicker._getDates(preset);
                if (dates) {
                    selectedStart = dates[0];
                    selectedEnd   = dates[1];
                    if (fp) fp.setDate([selectedStart, selectedEnd]);
                    panel.querySelector('.drp-range-text').textContent = DateRangePicker._fmt(selectedStart, selectedEnd);
                }

                // Auto-apply for non-custom presets
                this._apply(btn, display, panel, selectedStart, selectedEnd, preset, onApply);
            });
        });

        // ── Apply Button ──
        panel.querySelector('.drp-apply').addEventListener('click', () => {
            const activeLabel = panel.querySelector('.drp-preset.bg-indigo-600')?.textContent?.trim() || 'Custom Range';
            this._apply(btn, display, panel, selectedStart, selectedEnd, activeLabel, onApply);
        });

        // ── Cancel Button ──
        panel.querySelector('.drp-cancel').addEventListener('click', () => {
            panel.classList.add('hidden');
            btn.querySelector('i').classList.remove('rotate-180');
        });

        // ── Close on outside click ──
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                panel.classList.add('hidden');
                btn.querySelector('i').classList.remove('rotate-180');
            }
        });
    }

    static _apply(btn, display, panel, start, end, label, cb) {
        btn.querySelector('.drp-label').textContent = label;
        if (start && end) display.textContent = DateRangePicker._fmt(start, end);
        else display.textContent = '';
        panel.classList.add('hidden');
        btn.querySelector('i').classList.remove('rotate-180');
        if (cb) cb(start, end, label);
    }

    static _getDates(preset) {
        const now   = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const eod   = new Date(today); eod.setHours(23, 59, 59, 999);
        switch (preset) {
            case 'Today':       return [today, eod];
            case 'Yesterday': { const d = new Date(today); d.setDate(d.getDate()-1); const e = new Date(d); e.setHours(23,59,59,999); return [d, e]; }
            case 'Last 7 Days': { const s = new Date(today); s.setDate(s.getDate()-6); return [s, eod]; }
            case 'Last 30 Days':{ const s = new Date(today); s.setDate(s.getDate()-29); return [s, eod]; }
            case 'This Month':  return [new Date(now.getFullYear(), now.getMonth(), 1), eod];
            case 'Last Month':  { const s = new Date(now.getFullYear(), now.getMonth()-1, 1); const e = new Date(now.getFullYear(), now.getMonth(), 0); e.setHours(23,59,59,999); return [s, e]; }
            case 'This Year':   return [new Date(now.getFullYear(), 0, 1), eod];
            case 'Last Year':   { const y = now.getFullYear()-1; return [new Date(y,0,1), new Date(y,11,31,23,59,59)]; }
            case 'Max':         return [new Date('2020-01-01'), eod];
            default:            return null;
        }
    }

    static _fmt(s, e) {
        const f = d => d.toLocaleDateString('en-GB', {day:'2-digit',month:'2-digit',year:'numeric'}).replace(/\//g,'-');
        return s && e ? `${f(s)} — ${f(e)}` : '';
    }
}

window.DateRangePicker = DateRangePicker;

// ─── FILTER SECTION INITIALIZER ──────────────────────────────────────────────
function initOrderFilterSection(mode = 'all') {
    const f = window._orderFilters;
    // Reset global panel tracker for fresh page load
    window._drpOpenPanels = [];

    // 1. Date pickers
    DateRangePicker.init('filter-created-at',  (s, e, lbl) => { f.startDate = s; f.endDate = e; f.dateLabel = lbl; }, 'All Time', 'left');
    DateRangePicker.init('filter-courier-at',  () => {}, 'All Time', 'left');
    DateRangePicker.init('filter-status-at',   () => {}, 'All Time', 'right');
    DateRangePicker.init('filter-note-at',     () => {}, 'All Time', 'right');

    // 2. Source / Tag / Status listeners
    const srcEl = document.getElementById('filter-order-source');
    if (srcEl) srcEl.addEventListener('change', e => { f.orderSource = e.target.value; });

    const tagEl = document.getElementById('filter-order-tag');
    if (tagEl) tagEl.addEventListener('change', e => { f.orderTag = e.target.value; });

    const statusEl = document.getElementById('filter-status');
    if (statusEl) statusEl.addEventListener('change', e => { f.orderStatus = e.target.value; });

    const distEl = document.getElementById('filter-order-district');
    if (distEl) distEl.addEventListener('change', e => { f.orderDistrict = e.target.value; });

    const searchEl = document.getElementById('filter-search-text');
    if (searchEl) {
        searchEl.addEventListener('input', e => { 
            f.searchText = e.target.value.toLowerCase();
            // Use debounce if performance is an issue, but for now direct trigger
            if (mode === 'all') applyAllOrdersFilter();
            else applyStatusOrdersFilter();
        });
    }

    // 3. Apply Filter button
    const applyBtn = document.getElementById('btn-apply-filter');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            if (mode === 'all') applyAllOrdersFilter();
            else applyStatusOrdersFilter();
        });
    }

    // 4. Clear Filter button
    const clearBtn = document.getElementById('btn-clear-filter');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            window._orderFilters = { startDate:null, endDate:null, dateLabel:'All Time', orderSource:'', orderTag:'', orderStatus:'' };
            if (srcEl) srcEl.value = '';
            if (tagEl) tagEl.value = '';
            const statusEl2 = document.getElementById('filter-status');
            if (statusEl2) statusEl2.value = '';
            const distEl2 = document.getElementById('filter-order-district');
            if (distEl2) distEl2.value = '';
            const searchEl2 = document.getElementById('filter-search-text');
            if (searchEl2) searchEl2.value = '';
            if (mode === 'all') fetchAllOrders();
            else {
                const status = decodeURIComponent(window.location.hash.replace('#/status/',''));
                fetchOrdersByStatus(status);
            }
        });
    }
}

// ─── FILTERED FETCHERS ────────────────────────────────────────────────────────
async function applyAllOrdersFilter() {
    const f = window._orderFilters;
    const btn = document.getElementById('btn-apply-filter');
    if (btn) { btn.textContent = 'Filtering...'; btn.disabled = true; }

    try {
        let query = _supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (f.startDate && f.endDate) {
            query = query.gte('created_at', f.startDate.toISOString()).lte('created_at', f.endDate.toISOString());
        }
        if (f.orderStatus) query = query.eq('status', f.orderStatus);
        if (f.orderSource)  query = query.eq('source', f.orderSource);
        if (f.orderTag)     query = query.eq('order_tag', f.orderTag);
        if (f.orderDistrict) query = query.eq('district', f.orderDistrict);

        const { data, error } = await query;
        if (error) throw error;

        if (window._renderAllOrdersTable) window._renderAllOrdersTable(data || []);
    } catch (e) {
        console.error('Filter error:', e);
    } finally {
        if (btn) { btn.innerHTML = '<i class="fas fa-filter"></i> Apply Filter'; btn.disabled = false; }
    }
}

async function applyStatusOrdersFilter() {
    const f = window._orderFilters;
    const status = decodeURIComponent(window.location.hash.replace('#/status/', ''));
    const btn = document.getElementById('btn-apply-filter');
    if (btn) { btn.textContent = 'Filtering...'; btn.disabled = true; }

    try {
        let query = _supabase.from('orders').select('*').eq('status', status).order('created_at', { ascending: false });
        if (f.startDate && f.endDate) {
            query = query.gte('created_at', f.startDate.toISOString()).lte('created_at', f.endDate.toISOString());
        }
        if (f.orderSource)  query = query.eq('source', f.orderSource);
        if (f.orderTag)     query = query.eq('order_tag', f.orderTag);
        if (f.orderDistrict) query = query.eq('district', f.orderDistrict);

        const { data, error } = await query;
        if (error) throw error;

        let orders = data || [];
        if (f.searchText) {
            orders = orders.filter(o =>
                (o.name  || '').toLowerCase().includes(f.searchText) ||
                (o.phone || '').includes(f.searchText) ||
                (o.id    || '').toString().includes(f.searchText)
            );
        }

        // Use extracted render function in app.js
        if (window._renderStatusOrdersTable) {
            window._renderStatusOrdersTable(orders);
        }
    } catch (e) {
        console.error('Filter error:', e);
    } finally {
        if (btn) { btn.innerHTML = '<i class="fa-solid fa-filter"></i> Apply Filter'; btn.disabled = false; }
    }
}

// ─── RENDER ALL ORDERS TABLE ─────────────────────────────────────────────────
function _renderAllOrdersTable(data) {
    let table = document.getElementById('allOrderTable');
    if (!table) table = document.getElementById('statusOrderTable');
    if (!table) return;

    document.querySelectorAll('.all-orders-entry-info, .status-entry-info').forEach(el => {
        el.textContent = `Showing 1 to ${data.length} of ${data.length} entries`;
    });

    if (!data.length) {
        table.innerHTML = '<tr><td colspan="10" class="p-6 text-center text-gray-400 italic text-xs">No orders found matching filters</td></tr>';
        return;
    }

    // Save globally so copyOrderInfo can access it
    window.allOrders = data;

    table.innerHTML = data.map((order, index) => {
        const dateObj = new Date(order.created_at);
        const dateStr = dateObj.toLocaleDateString('en-GB') + ' · ' + dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        
        return `
        <tr>
          <!-- Status -->
          <td>
            <div style="display:flex;flex-direction:column;align-items:flex-start;gap:3px;">
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#d1fae5,#6ee7b7);display:flex;align-items:center;justify-content:center;box-shadow:0 0 10px rgba(16,185,129,0.28);margin-bottom:2px;">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#059669" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
              </div>
              <span class="status-badge"><span class="sdot"></span>${order.status || 'Pending'}</span>
              <div class="sl-tag">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"/></svg>
                sl: ${index + 1}
              </div>
            </div>
          </td>
          <!-- Select -->
          <td style="text-align:center;">
            <input type="checkbox" class="cb order-row-check" value="${order.id}"/>
            <button class="ibtn" onclick="copyOrderInfo(${order.id})" title="Copy Order Info" style="margin-top: 8px; width:24px; height:24px; border-radius:6px;">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
            </button>
          </td>
          <!-- Notes -->
          <td>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <button class="ibtn g" title="View Note" onclick="alert('${UI.escapeHTML(order.note || 'No notes available')}')">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m3.75-10.5H18A2.25 2.25 0 0120.25 8.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m3.75-10.5h6.375c.621 0 1.125.504 1.125 1.125v6.375"/></svg>
              </button>
              <button class="ibtn red" title="Delete Order" onclick="deleteOrder(${order.id})">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </td>
          <!-- Invoice -->
          <td>
            <span class="inv-id">#${order.id}</span>
            <div class="prod-item">1 x ${order.product_name || 'Product'} - ${order.amount}Tk &nbsp;<a href="#" class="vlink" onclick="event.preventDefault(); alert('Stock info for ' + '${order.product_name || 'this product'}')">View Stock</a></div>
          </td>
          <!-- Name & Number -->
          <td>
            <div class="name-txt">
              ${UI.escapeHTML(order.name || '-')}
              <button class="ibtn" style="width:21px;height:21px;border-radius:6px;" title="Copy Name" onclick="navigator.clipboard.writeText('${order.name || ''}')">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
              <button class="ibtn" style="width:21px;height:21px;border-radius:6px;" title="Copy Alternative Number" onclick="navigator.clipboard.writeText('${order.alt_phone || ''}')">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </button>
            </div>
            <div class="phone-chip">
              <span class="pnum">${UI.escapeHTML(order.phone || '-')}</span>
              <button class="pbtn wa" title="WhatsApp" onclick="window.open('https://wa.me/+88${order.phone}', '_blank')"><svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.855L.057 23.5l5.797-1.517A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.5-5.223-1.373l-.374-.222-3.882 1.017 1.034-3.772-.243-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg></button>
              <button class="pbtn cl" title="Call" onclick="window.open('tel:${order.phone}')"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg></button>
              <button class="pbtn cp" title="Copy" onclick="navigator.clipboard.writeText('${order.phone}')"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/></svg></button>
            </div>
            <div class="src-tag">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/></svg>
              Source: <b>${order.source || 'Direct'}</b>
            </div>
          </td>
          <!-- Date -->
          <td>
            <div class="dl"><span class="dlbl dc">C</span>${dateStr}</div>
            <div class="dl"><span class="dlbl du">U</span>${order.updated_at ? (new Date(order.updated_at).toLocaleDateString('en-GB') + ' · ' + new Date(order.updated_at).toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit'}).toLowerCase()) : dateStr}</div>
            <div class="by-t">By: <b>${order.created_by || 'Admin'}</b></div>
          </td>
          <!-- Address -->
          <td>
            <div class="addr">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#6366f1" stroke-width="2" style="flex-shrink:0;margin-top:2px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              ${UI.escapeHTML(order.address || '-')}
              <button class="cpaddr" onclick="navigator.clipboard.writeText('${order.address || ''}')"><svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/></svg></button>
            </div>
          </td>
          <!-- Courier -->
          <td style="min-width: 140px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 6px;">
                <div style="display:flex; gap: 10px;">
                    <div>
                        <div style="font-size:9px; font-weight:800; color:#94a3b8; text-transform:uppercase;">Total</div>
                        <div style="font-size:15px; font-weight:800; color:#1e293b;">${order.courier_total ?? 0}</div>
                    </div>
                    <div>
                        <div style="font-size:9px; font-weight:800; color:#059669; text-transform:uppercase;">Succ</div>
                        <div style="font-size:15px; font-weight:800; color:#059669;">${order.courier_completed ?? 0}</div>
                    </div>
                    <div>
                        <div style="font-size:9px; font-weight:800; color:#f43f5e; text-transform:uppercase;">Fail</div>
                        <div style="font-size:15px; font-weight:800; color:#f43f5e;">${order.courier_fa ?? 0}</div>
                    </div>
                </div>
                <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                    <button onclick="syncCourierStats(${order.id}, '${order.phone}')" style="background:none; border:none; cursor:pointer; color:#94a3b8; transition:color 0.2s; padding:2px;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='#94a3b8'" title="Fetch latest stats">
                        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                    <span style="padding: 2px 6px; background: ${(order.courier_pct ?? 0) >= 80 ? '#10b981' : ((order.courier_pct ?? 0) >= 50 ? '#f59e0b' : ((order.courier_pct ?? 0) > 0 ? '#f43f5e' : '#64748b'))}; color: white; font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        ${order.courier || 'New'}
                    </span>
                </div>
            </div>

            <div style="position:relative; width:100%; height:16px; border-radius:12px; background:#f1f5f9; overflow:hidden; border:1px solid rgba(226,232,240,0.5); box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                <div style="position:absolute; inset:0 auto 0 0; width:${order.courier_pct ?? 0}%; background:linear-gradient(to right, #10b981, #34d399); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                    ${(order.courier_pct ?? 0) > 0 ? `<span style="font-size:9px; font-weight:900; color:white; text-shadow: 0 1px 2px rgba(0,0,0,0.25);">${order.courier_pct}%</span>` : ''}
                </div>
            </div>
          </td>
          <!-- Summary -->
          <td>
            <div class="sum-line"><span class="sum-key">Total</span><span class="sum-total">${order.amount || 0}</span></div>
            <div class="sum-line"><span class="sum-key">Less</span><span class="sum-less">${order.discount || 0}</span></div>
            <div class="sum-line"><span class="sum-key">Paid</span><span class="sum-paid">${order.paid || 0}</span></div>
            <div style="margin-top:3px;padding:3px 8px;border-radius:7px;background:rgba(220,38,38,0.07);border:1px solid rgba(220,38,38,0.15);display:inline-block;">
              <span style="font-size:10px;color:#94a3b8;font-weight:500;">Due </span>
              <span class="sum-due" style="font-size:13px;">${(order.amount || 0) - (order.discount || 0) - (order.paid || 0)}</span>
            </div>
          </td>
          <!-- Employee -->
          <td>
            <span class="emp-badge">
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
              ${order.employee || 'Admin'}
            </span>
          </td>
        </tr>
        `;
    }).join('');

    // --- AUTO SYNC LOGIC ---
    // Automatically trigger sync for any order that has 'New' status or no courier info
    setTimeout(() => {
        data.forEach(order => {
            const needsSync = !order.courier || order.courier === 'New';
            if (needsSync && window.autoSyncCourierStats) {
                window.autoSyncCourierStats(order.id, order.phone);
            }
        });
    }, 1500);
}

// Quiet version of sync for auto-background use
window.autoSyncCourierStats = async function(orderId, phone) {
    if (!phone || window._syncingIds?.has(orderId)) return;
    if (!window._syncingIds) window._syncingIds = new Set();
    window._syncingIds.add(orderId);

    try {
        const FRAUD_API_URL = 'https://soc-9ocu.onrender.com';
        const funcRes = await fetch(`${FRAUD_API_URL}/api/check/${phone}`);
        if (funcRes.ok) {
            const funcData = await funcRes.json();
            if (funcData && !funcData.error) {
                const allTotal = funcData.total || 0;
                const allSuccess = funcData.success || 0;
                const allFailed = funcData.cancel || 0;
                const allRate = allTotal > 0 ? Math.round((allSuccess / allTotal) * 100) : 0;
                
                // Default to 'Unknown' if scanned but no history found
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

                await _supabase.from('orders').update(updateData).eq('id', orderId);
            }
        }
    } catch (e) { console.warn('Auto-sync failed for', orderId); }
    finally { window._syncingIds.delete(orderId); }
};

window.initOrderFilterSection  = initOrderFilterSection;
window.applyAllOrdersFilter    = applyAllOrdersFilter;
window.applyStatusOrdersFilter = applyStatusOrdersFilter;
window._renderAllOrdersTable   = _renderAllOrdersTable;
