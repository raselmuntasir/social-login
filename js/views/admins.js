/**
 * Admin Management View
 */

const adminsHTML = `
<div class="space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <!-- Role Filter Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <label class="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Filter by Role</label>
        <div class="relative max-w-xs">
            <select id="admin-role-filter" onchange="fetchAdmins()" class="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer transition-all">
                <option value="all">All Role</option>
            </select>
            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <i class="fas fa-chevron-down text-xs"></i>
            </div>
        </div>
    </div>

    <!-- Admin List Card -->
    <div class="bg-white rounded-[2rem] shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
        <div class="px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-white">
            <h2 class="text-xl font-black text-gray-800 tracking-tight">Admin list</h2>
            <button onclick="openCreateAdmin()" class="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-200 active:scale-95 flex items-center gap-2">
                <i class="fas fa-plus"></i> Create new
            </button>
        </div>
        
        <div class="p-8">
            <!-- Table Controls -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <div class="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Show</span>
                    <select class="mx-3 bg-gray-50 border border-gray-100 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer">
                        <option>10</option><option>25</option><option>50</option>
                    </select>
                    <span>entries</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Search:</span>
                    <div class="relative">
                        <input type="text" id="admin-search" placeholder="Search admins..." class="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none w-64 transition-all pl-10">
                        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
                    </div>
                </div>
            </div>

            <!-- Admin Table -->
            <div class="overflow-x-auto border border-gray-100 rounded-3xl shadow-inner bg-gray-50/10">
                <table class="w-full text-left text-[13px] whitespace-nowrap">
                    <thead class="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-black uppercase tracking-widest text-[10px]">
                        <tr>
                            <th class="px-6 py-5 w-16 text-center border-r border-gray-100/50">SL. <i class="fas fa-sort ml-1 opacity-20"></i></th>
                            <th class="px-6 py-5 border-r border-gray-100/50">Info</th>
                            <th class="px-6 py-5 text-center border-r border-gray-100/50">Role</th>
                            <th class="px-6 py-5 text-center border-r border-gray-100/50">Order Distribution</th>
                            <th class="px-6 py-5 text-center border-r border-gray-100/50">
                                Followup Distribution
                                <div class="text-[8px] font-bold text-gray-300 mt-0.5">For Automatic Followup</div>
                            </th>
                            <th class="px-6 py-5 text-center border-r border-gray-100/50">Last Seen</th>
                            <th class="px-6 py-5 text-center border-r border-gray-100/50">Status</th>
                            <th class="px-6 py-5 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody id="admins-table-body" class="divide-y divide-gray-50 bg-white">
                        <tr id="admins-loader">
                            <td colspan="8" class="px-6 py-16 text-center text-gray-400">
                                <div class="flex flex-col items-center gap-3">
                                    <div class="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                    <span class="text-[10px] font-black uppercase tracking-widest">Fetching Admins...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer Pagination -->
            <div class="flex justify-between items-center mt-8">
                <div class="text-[11px] text-gray-400 font-black uppercase tracking-widest admin-entry-info">Showing 0 entries</div>
                <div class="flex items-center gap-2">
                    <button class="px-5 py-2 border border-gray-100 bg-white text-gray-400 text-[11px] font-black uppercase rounded-xl hover:bg-gray-50 transition-all disabled:opacity-30">Previous</button>
                    <button class="w-9 h-9 flex items-center justify-center bg-purple-700 text-white text-[11px] font-black rounded-xl shadow-lg shadow-purple-200">1</button>
                    <button class="px-5 py-2 border border-gray-100 bg-white text-gray-400 text-[11px] font-black uppercase rounded-xl hover:bg-gray-50 transition-all disabled:opacity-30">Next</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

/**
 * Fetch Admins from Supabase
 */
async function fetchAdmins() {
    // Populate roles filter if empty
    await fetchRolesForFilter();

    const roleFilter = document.getElementById('admin-role-filter')?.value || 'all';
    const tbody = document.getElementById('admins-table-body');
    
    try {
        let query = _supabase.from('admins').select('*, roles(name)').order('created_at', { ascending: false });
        
        if (roleFilter !== 'all') {
            query = query.filter('roles.name', 'eq', roleFilter);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        
        // Flatten the role name
        const processedData = (data || []).map(admin => ({
            ...admin,
            role_name: admin.roles ? admin.roles.name : 'n/a'
        }));
        
        renderAdminsTable(processedData);
    } catch (err) {
        console.error('Error fetching admins:', err);
        renderAdminsTable([]);
    }
}

/**
 * Render Admins Table
 */
function renderAdminsTable(admins) {
    const tbody = document.getElementById('admins-table-body');
    if (!tbody) return;

    if (admins.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="px-6 py-16 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No admins found</td></tr>';
        return;
    }

    tbody.innerHTML = admins.map((admin, idx) => {
        // If it's one of the last 2 items, open dropdown upwards to avoid clipping
        const isLastTwo = idx >= admins.length - 2 && admins.length > 2;
        const dropdownPos = isLastTwo ? 'bottom-full mb-2' : 'top-full mt-2';
        const animClass = isLastTwo ? 'slide-in-from-bottom-2' : 'slide-in-from-top-2';

        return `
        <tr class="hover:bg-purple-50/30 transition-all group">
            <td class="px-6 py-5 text-center font-black text-gray-400 border-r border-gray-50/50">${idx + 1}</td>
            <td class="px-6 py-5 border-r border-gray-50/50">
                <div class="flex flex-col gap-0.5">
                    <span class="text-sm font-black text-gray-800">${admin.name}</span>
                    <span class="text-[11px] font-bold text-gray-500">${admin.phone || ''}</span>
                    <span class="text-[11px] font-bold text-purple-500 underline decoration-purple-200">${admin.email || ''}</span>
                </div>
            </td>
            <td class="px-6 py-5 text-center border-r border-gray-50/50">
                <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest">${admin.role_name || 'n/a'}</span>
            </td>
            <td class="px-6 py-5 text-center border-r border-gray-50/50 text-gray-400 font-bold">${admin.order_distribution || 'n/a'}</td>
            <td class="px-6 py-5 text-center border-r border-gray-50/50 text-gray-400 font-bold">${admin.followup_distribution || 'n/a'}</td>
            <td class="px-6 py-5 text-center border-r border-gray-50/50 text-gray-500 font-bold italic">${admin.last_seen || 'n/a'}</td>
            <td class="px-6 py-5 text-center border-r border-gray-50/50">
                <span class="px-3 py-1 rounded-full ${admin.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'} text-[10px] font-black uppercase tracking-widest">
                    ${admin.status || 'n/a'}
                </span>
            </td>
            <td class="px-6 py-5 text-center relative overflow-visible">
                <div class="inline-block relative">
                    <button onclick="toggleAdminDropdown(event, ${admin.id})" class="bg-purple-700 hover:bg-purple-800 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95">
                        Action <i class="fas fa-caret-down ml-1"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <div id="admin-dropdown-${admin.id}" class="hidden absolute right-0 ${dropdownPos} w-36 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] overflow-hidden py-1.5 animate-in fade-in ${animClass} duration-200">
                        <button class="w-full text-left px-4 py-2.5 text-[11px] font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all flex items-center gap-3">
                            <i class="fas fa-edit text-cyan-500"></i> Edit
                        </button>
                        <div class="h-px bg-gray-100 mx-2 my-1"></div>
                        <button onclick="deleteAdmin(${admin.id}, '${admin.name}')" class="w-full text-left px-4 py-2.5 text-[11px] font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all flex items-center gap-3">
                            <i class="fas fa-trash text-orange-500"></i> Delete
                        </button>
                    </div>
                </div>
            </td>
        </tr>
        `;
    }).join('');
    
    const info = document.querySelector('.admin-entry-info');
    if (info) info.innerText = `Showing 1 to ${admins.length} of ${admins.length} entries`;
}

/**
 * Fetch and Populate Roles for Filter
 */
async function fetchRolesForFilter() {
    const filter = document.getElementById('admin-role-filter');
    if (!filter || filter.options.length > 1) return;

    try {
        const { data, error } = await _supabase.from('roles').select('name').order('name', { ascending: true });
        if (error) throw error;
        
        data.forEach(role => {
            const opt = document.createElement('option');
            opt.value = role.name;
            opt.textContent = role.name;
            filter.appendChild(opt);
        });
    } catch (err) {
        console.error('Error fetching roles for filter:', err);
    }
}

/**
 * Toggle Dropdown
 */
window.toggleAdminDropdown = function(event, adminId) {
    event.stopPropagation();
    document.querySelectorAll('[id^="admin-dropdown-"]').forEach(el => {
        if (el.id !== `admin-dropdown-${adminId}`) el.classList.add('hidden');
    });
    const dropdown = document.getElementById(`admin-dropdown-${adminId}`);
    if (dropdown) dropdown.classList.toggle('hidden');
};

/**
 * Mock actions for now
 */
window.openCreateAdmin = () => alert('Create Admin form coming soon!');
window.deleteAdmin = (id, name) => confirm(`Delete admin ${name}?`) && alert('Deleted!');

// Close dropdowns on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
        document.querySelectorAll('[id^="admin-dropdown-"]').forEach(el => el.classList.add('hidden'));
    }
});
