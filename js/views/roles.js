/**
 * Permission Groups Configuration
 */
const PERMISSION_GROUPS = {
    "Product": [
        { id: 1, name: "Product" },
        { id: 2, name: "Print Barcode" },
        { id: 3, name: "Delete Product" },
        { id: 4, name: "Product Brand" },
        { id: 5, name: "Product Category" }
    ],
    "Order": [
        { id: 1, name: "Create Order" },
        { id: 2, name: "Edit Order" },
        { id: 3, name: "All Order" },
        { id: 4, name: "Pending Order" },
        { id: 7, name: "Processing Order" },
        { id: 10, name: "Delivered Order" },
        { id: 12, name: "Completed Order" },
        { id: 13, name: "In Courier Order" },
        { id: 16, name: "Canceled Order" },
        { id: 18, name: "Returned Order" },
        { id: 19, name: "Confirmed Order" },
        { id: 21, name: "Hold Order" },
        { id: 23, name: "Hold Followups Order" },
        { id: 24, name: "Pending Return Order" },
        { id: 25, name: "Everyone's Returned/Pending Return" },
        { id: 26, name: "Everyone's Confirmed" },
        { id: 27, name: "Everyone's Canceled" },
        { id: 28, name: "Everyone's Orders" },
        { id: 29, name: "Damage Order" },
        { id: 30, name: "Hand Delivery Order" },
        { id: 31, name: "Hand Delivery Completed Order" },
        { id: 32, name: "Others Order" },
        { id: 35, name: "Failed Orders" },
        { id: 36, name: "Failed Orders Bulk Pending" },
        { id: 37, name: "Failed Orders Delete" },
        { id: 38, name: "Bulk Print" },
        { id: 39, name: "Bulk Courier Submission" },
        { id: 40, name: "Update Parcel" },
        { id: 41, name: "Return Collection" },
        { id: 42, name: "Courier Payment Validation" },
        { id: 44, name: "Complected/Delivered Add/Return Option" },
        { id: 45, name: "Make Complected/Delivered from Create Page" },
        { id: 46, name: "Discount Option" },
        { id: 47, name: "Order Product Discount" },
        { id: 48, name: "Custom Product Price" },
        { id: 51, name: "Pre Order" },
        { id: 52, name: "Everyone's Pre Order" },
        { id: 53, name: "Delete Pre Order" },
        { id: 54, name: "Cancel Pre Order" },
        { id: 55, name: "Order Transfer" },
        { id: 56, name: "Delete Note" },
        { id: 57, name: "Delete Order" },
        { id: 58, name: "Delete Order Product" },
        { id: 59, name: "Print Order" },
        { id: 60, name: "Order Payments" },
        { id: 61, name: "Order Payment Delete" },
        { id: 64, name: "COD Changed Order" },
        { id: 65, name: "Copy Information" },
        { id: 66, name: "Allow Custom Date" },
        { id: 67, name: "Order Summary" },
        { id: 73, name: "Order Distribute on Create Order" },
        { id: 75, name: "Courier Unlink" },
        { id: 77, name: "Bangla Status" },
        { id: 78, name: "Call dhore na Status" }
    ],
    "Customer": [
        { id: 1, name: "Customer" },
        { id: 2, name: "Everyone's Customer" },
        { id: 3, name: "Delete Customer" },
        { id: 5, name: "Followups" },
        { id: 8, name: "Return Followup Queue" },
        { id: 9, name: "Everyone's Customer Followups" },
        { id: 10, name: "Delete Customer Note" },
        { id: 11, name: "All Status" },
        { id: 12, name: "No Status" },
        { id: 12, name: "Status A" },
        { id: 13, name: "Status B" }
    ],
    "Notifications": [
        { id: 1, name: "Notifications" },
        { id: 2, name: "Steadfast Notifications" }
    ],
    "Attribute": [
        { id: 1, name: "Attribute" }
    ],
    "Coupons": [
        { id: 1, name: "Coupons" }
    ],
    "Purchase": [
        { id: 1, name: "Create/View" },
        { id: 2, name: "Edit" },
        { id: 3, name: "Delete" },
        { id: 4, name: "Purchase Return" }
    ],
    "Manufacture": [
        { id: 1, name: "Manufacture" }
    ],
    "Mixer": [
        { id: 1, name: "Delete Mixer" },
        { id: 2, name: "Mixer" }
    ],
    "Stock Adjustment": [
        { id: 1, name: "Stock Adjustment" }
    ],
    "Settings": [
        { id: 1, name: "General Settings" },
        { id: 2, name: "Website/Landing Page" },
        { id: 6, name: "Courier" },
        { id: 7, name: "SMS" },
        { id: 8, name: "Bulk SMS" },
        { id: 9, name: "Email" },
        { id: 10, name: "Import" }
    ],
    "Report": [
        { id: 1, name: "Report Summary" },
        { id: 2, name: "Repeat Customers" },
        { id: 3, name: "Products" },
        { id: 5, name: "Product Daily Sales" },
        { id: 6, name: "Top Return Products" },
        { id: 7, name: "Top Sold Products" },
        { id: 8, name: "Top Purchased Products" },
        { id: 9, name: "Lowest Stock Products" },
        { id: 11, name: "Login Histories" },
        { id: 12, name: "Employee Activity" },
        { id: 13, name: "Orders by Employee" },
        { id: 15, name: "Up-Sales" }
    ],
    "Other Expense": [
        { id: 1, name: "Other Expense" }
    ],
    "Other Incomes": [
        { id: 1, name: "Other Incomes" }
    ],
    "Role Permission": [
        { id: 1, name: "Role Permission" }
    ],
    "Recycle Bin": [
        { id: 1, name: "Recycle Bin" }
    ],
    "Supplier": [
        { id: 1, name: "Add Supplier" }
    ],
    "Admin": [
        { id: 1, name: "Create/Edit/Delete" },
        { id: 2, name: "Analytics" },
        { id: 3, name: "Admin Disable Swithch" },
        { id: 4, name: "Order Distribution Switch" }
    ],
    "Billing": [
        { id: 1, name: "Billing" }
    ],
    "Others": [
        { id: 1, name: "Dashboard Graph" },
        { id: 2, name: "Dashboard Profit" },
        { id: 3, name: "Dashboard Amount" },
        { id: 5, name: "IP/Mobile Blocked" },
        { id: 6, name: "Data Export" },
        { id: 10, name: "Everyone's Support Ticket" }
    ]
};

/**
 * Helper to get group icons
 */
function getGroupIcon(group) {
    const icons = {
        "Product": "fas fa-box", "Order": "fas fa-shopping-cart", "Customer": "fas fa-users",
        "Notifications": "fas fa-bell", "Attribute": "fas fa-tags", "Coupons": "fas fa-ticket-alt",
        "Purchase": "fas fa-shopping-bag", "Manufacture": "fas fa-industry", "Mixer": "fas fa-blender",
        "Stock Adjustment": "fas fa-adjust", "Settings": "fas fa-cog", "Report": "fas fa-chart-line",
        "Other Expense": "fas fa-money-bill-wave", "Other Incomes": "fas fa-hand-holding-usd",
        "Role Permission": "fas fa-user-lock", "Recycle Bin": "fas fa-trash-restore",
        "Supplier": "fas fa-truck", "Admin": "fas fa-user-shield", "Billing": "fas fa-credit-card", "Others": "fas fa-ellipsis-h"
    };
    return icons[group] || "fas fa-folder";
}

/**
 * Role List Template
 */
const rolesHTML = `
<div class="space-y-4 pb-10">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 class="text-gray-800 font-bold text-sm">Role List</h2>
            <button onclick="openAddRole()" class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 active:scale-95">
                <i class="fas fa-plus-circle"></i> Add Role
            </button>
        </div>
        <div class="p-4">
            <div class="flex justify-between items-center mb-6">
                <div class="flex items-center text-xs text-gray-600 font-medium">
                    <span>Show</span>
                    <select class="mx-2 border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-purple-500 bg-gray-50/50 transition-all cursor-pointer">
                        <option>10</option><option>25</option><option>50</option>
                    </select>
                    <span>entries</span>
                </div>
                <div class="flex items-center text-xs text-gray-600 font-medium">
                    <span class="mr-2 text-gray-800">Search:</span>
                    <input type="text" placeholder="Search roles..." class="border border-gray-200 rounded-lg px-3 py-1.5 outline-none w-56 focus:border-purple-500 bg-gray-50/50 transition-all">
                </div>
            </div>
            <div class="overflow-x-auto border border-gray-100 rounded-xl overflow-hidden shadow-inner bg-gray-50/10">
                <table class="w-full text-left text-[13px] whitespace-nowrap">
                    <thead class="bg-white border-b border-gray-100 text-gray-800 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                            <th class="px-4 py-4 w-20 border-r border-gray-100">SL</th>
                            <th class="px-4 py-4 border-r border-gray-100">Role Name</th>
                            <th class="px-4 py-4 w-40 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody id="roles-table-body" class="divide-y divide-gray-50 bg-white">
                        <tr id="roles-loader"><td colspan="3" class="px-4 py-10 text-center text-gray-400">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`;

/**
 * Compact Masonry Edit/Add Role Template
 */
const editRoleHTML = (role, isNew = false) => `
<div class="space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div class="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-50">
        <div class="flex items-center gap-4">
            <button onclick="goBackToRoles()" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                <i class="fas fa-arrow-left"></i>
            </button>
            <div>
                <h2 class="text-base font-black text-gray-800 tracking-tight">${isNew ? 'Create New Role' : 'Edit Role'}</h2>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">${isNew ? 'New Entry' : 'Currently Editing:'}</span>
                    <span class="text-[10px] font-black text-purple-600 uppercase tracking-widest">${isNew ? 'Define permissions below' : role.name}</span>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="relative">
                <input type="text" id="edit-role-name" value="${role.name || ''}" placeholder="Enter Role Name..."
                    class="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none w-64 transition-all">
            </div>
            <button onclick="saveRolePermissions(${role.id || 'null'}, ${isNew})" class="bg-purple-700 hover:bg-purple-800 text-white px-8 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-200 active:scale-95 flex items-center gap-2">
                <i class="fas fa-save"></i> ${isNew ? 'Create Role' : 'Save Changes'}
            </button>
        </div>
    </div>

    <div class="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
        ${Object.entries(PERMISSION_GROUPS).map(([group, items]) => `
            <div class="break-inside-avoid bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-purple-200 transition-colors group/card">
                <div class="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/20 group-hover/card:bg-purple-50/30 transition-colors">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-purple-600 shadow-sm"><i class="${getGroupIcon(group)} text-[10px]"></i></div>
                        <h4 class="font-black text-[11px] text-gray-700 uppercase tracking-widest">${group}</h4>
                    </div>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <span class="text-[9px] font-bold text-gray-400 uppercase">All</span>
                        <input type="checkbox" onchange="toggleGroupPermissions(this, '${group.replace(/\s+/g, '-')}')" class="rounded text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 border-gray-200">
                    </label>
                </div>
                <div class="p-2" id="group-${group.replace(/\s+/g, '-')}">
                    <div class="grid grid-cols-1 gap-0.5">
                        ${items.map(item => `
                            <label class="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50 transition-all cursor-pointer group/row relative overflow-hidden">
                                <div class="flex items-center gap-3 z-10">
                                    <span class="text-[9px] font-black text-gray-300 w-4 group-hover/row:text-purple-300">${item.id}</span>
                                    <span class="text-[13px] font-bold text-gray-600 group-hover/row:text-purple-700 transition-colors">${item.name}</span>
                                </div>
                                <div class="z-10"><input type="checkbox" name="permission" value="${item.name}" data-group="${group}" class="rounded-md text-purple-600 focus:ring-purple-500 w-4 h-4 border-gray-200 cursor-pointer"></div>
                                <div class="absolute inset-0 bg-purple-500/0 group-hover/row:bg-purple-500/5 transition-colors"></div>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
</div>
`;

/**
 * Initialize Roles Page - Fetching from Supabase
 */
async function fetchRoles() {
    const tbody = document.getElementById('roles-table-body');
    if (tbody) tbody.innerHTML = '<tr id="roles-loader"><td colspan="3" class="px-4 py-10 text-center text-gray-400">Loading from database...</td></tr>';
    
    try {
        const { data, error } = await _supabase.from('roles').select('*').order('name', { ascending: true });
        if (error) throw error;
        renderRolesTable(data || []);
    } catch (err) {
        console.error('Supabase fetch failed:', err);
        renderRolesTable([]);
    }
}

/**
 * Render Roles Table
 */
function renderRolesTable(roles) {
    const tbody = document.getElementById('roles-table-body');
    if (!tbody) return;

    if (roles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="px-4 py-10 text-center text-gray-400">No roles found in database.</td></tr>';
        return;
    }

    tbody.innerHTML = roles.map((role, idx) => {
        // If it's one of the last 2 items, open dropdown upwards to avoid clipping
        const isLastTwo = idx >= roles.length - 2 && roles.length > 2;
        const dropdownPosClass = isLastTwo ? 'bottom-full mb-2' : 'top-full mt-2';
        const animClass = isLastTwo ? 'slide-in-from-bottom-2' : 'slide-in-from-top-2';

        return `
        <tr class="hover:bg-purple-50/30 transition-colors group">
            <td class="px-4 py-3.5 border-r border-gray-50 text-gray-500 font-bold text-[12px]">${idx + 1}</td>
            <td class="px-4 py-3.5 border-r border-gray-50 font-semibold text-gray-700">${role.name}</td>
            <td class="px-4 py-3.5 text-center relative overflow-visible">
                <div class="inline-block relative">
                    <button onclick="toggleRoleDropdown(event, ${role.id})" class="bg-purple-700 hover:bg-purple-800 text-white px-4 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 Action">Action <i class="fas fa-caret-down text-[10px]"></i></button>
                    <div id="role-dropdown-${role.id}" class="hidden absolute right-0 ${dropdownPosClass} w-36 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] overflow-hidden py-1.5 animate-in fade-in ${animClass} duration-200">
                        <button onclick="openEditRole(${role.id}, '${role.name}')" class="w-full text-left px-4 py-2.5 text-[11px] font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all flex items-center gap-3"><i data-lucide="edit-3" class="w-4 h-4 text-cyan-500"></i> Edit</button>
                        <div class="h-px bg-gray-100 mx-2 my-1"></div>
                        <button onclick="deleteRole(${role.id}, '${role.name}')" class="w-full text-left px-4 py-2.5 text-[11px] font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all flex items-center gap-3"><i data-lucide="trash-2" class="w-4 h-4 text-orange-500"></i> Delete</button>
                    </div>
                </div>
            </td>
        </tr>
    `; }).join('');
    if (window.lucide) window.lucide.createIcons();
    const info = document.querySelector('.role-entry-info');
    if (info) info.innerText = `Showing 1 to ${roles.length} of ${roles.length} entries`;
}

/**
 * Open Create New Role Page
 */
window.openAddRole = function() {
    if (typeof navigateTo === 'function') {
        navigateTo(editRoleHTML({ id: null, name: '' }, true), () => {
            if (window.lucide) window.lucide.createIcons();
        });
    }
};

/**
 * Open Edit Role Page - Dynamic Fetching
 */
window.openEditRole = async function(id, name) {
    try {
        const { data, error } = await _supabase.from('roles').select('*').eq('id', id).single();
        if (error) throw error;

        if (typeof navigateTo === 'function') {
            navigateTo(editRoleHTML(data, false), () => {
                if (window.lucide) window.lucide.createIcons();
                // Pre-select permissions
                if (data.permissions && Array.isArray(data.permissions)) {
                    data.permissions.forEach(p => {
                        const cb = document.querySelector(`input[name="permission"][value="${p}"]`);
                        if (cb) cb.checked = true;
                    });
                }
            });
        }
    } catch (err) {
        console.error('Error fetching role details:', err);
        alert('Could not fetch role details: ' + err.message);
    }
};

/**
 * Delete Role - Dynamic Deletion
 */
window.deleteRole = async function(id, name) {
    if (!confirm(`Are you sure you want to delete the role "${name}"?`)) return;
    
    try {
        const { error } = await _supabase.from('roles').delete().eq('id', id);
        if (error) throw error;
        
        alert(`Role "${name}" deleted successfully.`);
        fetchRoles(); // Refresh list
    } catch (err) {
        console.error('Error deleting role:', err);
        alert('Error deleting role: ' + err.message);
    }
};

/**
 * Toggle group permissions
 */
window.toggleGroupPermissions = function(checkbox, groupId) {
    const container = document.getElementById(`group-${groupId}`);
    if (container) {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = checkbox.checked);
    }
};

/**
 * Save Role Permissions (Create or Update) - Dynamic Saving to Supabase
 */
window.saveRolePermissions = async function(roleId, isNew = false) {
    const name = document.getElementById('edit-role-name').value;
    if (!name.trim()) {
        alert('Please enter a Role Name');
        return;
    }
    const selected = Array.from(document.querySelectorAll('input[name="permission"]:checked')).map(cb => cb.value);
    
    try {
        let error;
        if (isNew) {
            const { error: err } = await _supabase.from('roles').insert([{ name, permissions: selected }]);
            error = err;
        } else {
            const { error: err } = await _supabase.from('roles').update({ name, permissions: selected }).eq('id', roleId);
            error = err;
        }
        
        if (error) throw error;
        
    alert(`Success! Role "${name}" has been ${isNew ? 'created' : 'updated'}.`);
    goBackToRoles();
} catch (err) {
        console.error('Error saving role:', err);
        alert('Error saving role: ' + err.message);
    }
};

/**
 * Toggle Dropdown Visibility
 */
window.toggleRoleDropdown = function(event, roleId) {
    event.stopPropagation();
    document.querySelectorAll('[id^="role-dropdown-"]').forEach(el => {
        if (el.id !== `role-dropdown-${roleId}`) el.classList.add('hidden');
    });
    const dropdown = document.getElementById(`role-dropdown-${roleId}`);
    if (dropdown) dropdown.classList.toggle('hidden');
};

/**
 * Go back to Roles List manually
 */
window.goBackToRoles = function() {
    if (typeof navigateTo === 'function') {
        navigateTo(rolesHTML, fetchRoles);
    }
};

// Global click listener to close dropdowns
document.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
        document.querySelectorAll('[id^="role-dropdown-"]').forEach(el => el.classList.add('hidden'));
    }
});
