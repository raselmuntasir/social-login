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

    static init(containerId, onApply, defaultLabel = 'All Time') {
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
        const panel = document.createElement('div');
        panel.className = 'hidden absolute z-[9999] bg-white border border-gray-200 rounded-xl shadow-2xl top-full left-0 mt-1';
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
    DateRangePicker.init('filter-created-at',  (s, e, lbl) => { f.startDate = s; f.endDate = e; f.dateLabel = lbl; }, 'All Time');
    DateRangePicker.init('filter-courier-at',  () => {}, 'All Time');
    DateRangePicker.init('filter-status-at',   () => {}, 'All Time');
    DateRangePicker.init('filter-note-at',     () => {}, 'All Time');

    // 2. Source / Tag / Status listeners
    const srcEl = document.getElementById('filter-order-source');
    if (srcEl) srcEl.addEventListener('change', e => { f.orderSource = e.target.value; });

    const tagEl = document.getElementById('filter-order-tag');
    if (tagEl) tagEl.addEventListener('change', e => { f.orderTag = e.target.value; });

    const statusEl = document.getElementById('filter-status');
    if (statusEl) statusEl.addEventListener('change', e => { f.orderStatus = e.target.value; });

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
        if (f.orderSource) query = query.eq('source', f.orderSource);
        if (f.orderTag)    query = query.eq('order_tag', f.orderTag);

        const { data, error } = await query;
        if (error) throw error;

        // Use existing render in app.js
        const table = document.getElementById('statusOrderTable');
        if (table) {
            if (data.length === 0) {
                table.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400 text-xs italic">No orders found matching filters</td></tr>';
            } else {
                // Re-call the existing function which renders the rows
                fetchOrdersByStatus(status);
            }
        }
    } catch (e) {
        console.error('Filter error:', e);
    } finally {
        if (btn) { btn.innerHTML = '<i class="fa-solid fa-filter"></i> Apply Filter'; btn.disabled = false; }
    }
}

// ─── RENDER ALL ORDERS TABLE ─────────────────────────────────────────────────
function _renderAllOrdersTable(data) {
    const table = document.getElementById('allOrderTable');
    if (!table) return;

    document.querySelectorAll('.all-orders-entry-info').forEach(el => {
        el.textContent = `Showing ${data.length} entries`;
    });

    if (!data.length) {
        table.innerHTML = '<tr><td colspan="10" class="p-6 text-center text-gray-400 italic text-xs">No orders found matching filters</td></tr>';
        return;
    }

    table.innerHTML = data.map(order => `
        <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors text-[11px]">
            <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-700 font-medium">${order.status}</span></td>
            <td class="px-2 py-3 text-center"><input type="checkbox" class="order-row-check"></td>
            <td class="px-4 py-3"><i class="fas fa-sticky-note text-gray-400"></i></td>
            <td class="px-4 py-3 font-medium text-blue-600">#${order.id.toString().slice(-6)}</td>
            <td class="px-4 py-3 font-medium">${order.name || '-'}<br><span class="text-gray-500 text-[10px]">${order.phone || '-'}</span></td>
            <td class="px-4 py-3">${new Date(order.created_at).toLocaleDateString()}</td>
            <td class="px-4 py-3 truncate max-w-[150px]">${order.address || '-'}</td>
            <td class="px-4 py-3">${order.courier || 'None'}</td>
            <td class="px-4 py-3 font-bold text-gray-900">${order.amount} TK</td>
            <td class="px-4 py-3 text-gray-500">Admin</td>
        </tr>
    `).join('');
}

window.initOrderFilterSection  = initOrderFilterSection;
window.applyAllOrdersFilter    = applyAllOrdersFilter;
window.applyStatusOrdersFilter = applyStatusOrdersFilter;
window._renderAllOrdersTable   = _renderAllOrdersTable;
