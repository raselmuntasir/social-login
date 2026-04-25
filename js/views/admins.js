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
                        <tr class="animate-pulse"><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td></tr>
                        <tr class="animate-pulse"><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td></tr>
                        <tr class="animate-pulse"><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td></tr>
                        <tr class="animate-pulse"><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td></tr>
                        <tr class="animate-pulse"><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td><td class="px-6 py-5"><div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div></td></tr>
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
    
    try {
        // Fetch all admins with their roles
        const { data, error } = await _supabase
            .from('admins')
            .select('*, roles(*)')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        // Robust data processing
        let processedData = (data || []).map(admin => {
            let roleName = 'n/a';
            if (admin.roles) {
                roleName = Array.isArray(admin.roles) 
                    ? (admin.roles[0]?.name || 'n/a') 
                    : (admin.roles.name || 'n/a');
            }
            return {
                ...admin,
                role_name: roleName
            };
        });
        
        // Client-side filtering
        if (roleFilter !== 'all') {
            processedData = processedData.filter(admin => admin.role_name === roleFilter);
        }
        
        renderAdminsTable(processedData);
    } catch (err) {
        console.error('Error fetching admins:', err);
        renderAdminsTable([]);
    }
}
window.fetchAdmins = fetchAdmins;

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
        const isLastTwo = idx >= admins.length - 2 && admins.length > 2;
        const dropdownPos = isLastTwo ? 'bottom-full mb-2' : 'top-full mt-2';
        const animClass = isLastTwo ? 'slide-in-from-bottom-2' : 'slide-in-from-top-2';

        return `
        <tr class="hover:bg-purple-50/30 transition-all group">
            <td class="px-6 py-5 text-center font-black text-gray-400 border-r border-gray-50/50">${idx + 1}</td>
            <td class="px-6 py-5 border-r border-gray-50/50">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        <img src="${admin.image_url || 'https://ui-avatars.com/api/?name='+admin.name+'&background=random'}" class="w-full h-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name='+admin.name+'&background=random'">
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <span class="text-sm font-black text-gray-800">${admin.name}</span>
                        <span class="text-[11px] font-bold text-gray-500">${admin.phone || ''}</span>
                        <span class="text-[11px] font-bold text-purple-500 underline decoration-purple-200">${admin.email || ''}</span>
                    </div>
                </div>
            </td>
            <td class="px-6 py-5 text-center border-r border-gray-50/50">
                <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest">${admin.role_name || 'n/a'}</span>
            </td>
            <td class="px-6 py-5 text-center border-r border-gray-50/50 text-gray-400 font-bold">${admin.order_distribution || '0'}</td>
            <td class="px-6 py-5 text-center border-r border-gray-50/50 text-gray-400 font-bold">${admin.followup_distribution || '0'}</td>
            <td class="px-6 py-5 text-center border-r border-gray-50/50 text-gray-500 font-bold italic">${admin.last_seen || 'Never'}</td>
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
                    <div id="admin-dropdown-${admin.id}" class="hidden absolute right-0 ${dropdownPos} w-40 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] overflow-hidden py-1.5 animate-in fade-in ${animClass} duration-200">
                        <ul class="py-1 text-sm font-bold text-gray-700">
                            <li>
                                <button onclick="openEditAdmin(${admin.id})" class="w-full text-left px-4 py-2.5 hover:bg-purple-50 hover:text-purple-700 transition-all flex items-center">
                                    <i class="fas fa-edit w-6 opacity-50"></i> Edit Details
                                </button>
                            </li>
                            ${admin.role_name === 'Super Admin' ? '' : `
                            <li>
                                <button onclick="deleteAdmin(${admin.id}, '${admin.name}')" class="w-full text-left px-4 py-2.5 hover:bg-red-50 hover:text-red-600 transition-all flex items-center">
                                    <i class="fas fa-trash-alt w-6 opacity-50"></i> Delete Admin
                                </button>
                            </li>
                            `}
                        </ul>
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
 * Open Create Admin Modal
 */
window.openCreateAdmin = async () => {
    try {
        const { data: roles, error } = await _supabase.from('roles').select('*').order('name', { ascending: true });
        if (error) throw error;

        const roleOptions = roles.map(r => `<option value="${r.id}">${r.name}</option>`).join('');

        const formHtml = `
            <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Name*</label>
                        <input type="text" id="new-admin-name" placeholder="Full Name" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email*</label>
                        <input type="email" id="new-admin-email" placeholder="admin@example.com" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number*</label>
                        <input type="text" id="new-admin-phone" placeholder="017xxxxxxxx" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Role*</label>
                        <select id="new-admin-role" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                            <option value="">Select Role</option>
                            ${roleOptions}
                        </select>
                    </div>
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address*</label>
                    <input type="text" id="new-admin-address" placeholder="Full Address" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password*</label>
                        <input type="password" id="new-admin-password" placeholder="••••••••" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password*</label>
                        <input type="password" id="new-admin-confirm" placeholder="••••••••" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    </div>
                </div>
                
                <p class="text-[9px] font-bold text-gray-400 uppercase italic">NB: * marked are required field.</p>
            </div>
        `;

        UI.showModal('Create New Admin', formHtml, async () => {
            const name = document.getElementById('new-admin-name').value;
            const email = document.getElementById('new-admin-email').value;
            const phone = document.getElementById('new-admin-phone').value;
            const address = document.getElementById('new-admin-address').value;
            const role_id = document.getElementById('new-admin-role').value;
            const password = document.getElementById('new-admin-password').value;
            const confirm = document.getElementById('new-admin-confirm').value;

            if (!name || !email || !phone || !address || !role_id || !password || !confirm) {
                UI.alert('Required', 'দয়া করে সব বাধ্যতামূলক (*) ঘরগুলো পূরণ করুন।', 'error');
                return false;
            }

            if (password !== confirm) {
                UI.alert('Error', 'পাসওয়ার্ড দুটি মেলেনি!', 'error');
                return false;
            }

            const hashedPassword = await window.UI.hashPassword(password);
            const { error: insertError } = await _supabase
                .from('admins')
                .insert([{ 
                    name, email, phone, address, role_id, 
                    password: hashedPassword,
                    status: 'active' 
                }]);

            if (insertError) {
                UI.alert('Error', insertError.message, 'error');
                return false;
            }

            UI.alert('Success', 'New admin created successfully.', 'success');
            AuditLogger.log('Create Admin', `Added new admin: ${name} (${email})`);
            fetchAdmins();
            return true;
        });

    } catch (err) {
        console.error('Error opening create modal:', err);
    }
};

/**
 * Open Edit Admin Modal
 */
window.openEditAdmin = async (adminId) => {
    try {
        // Fetch admin data and roles in parallel
        const [{ data: admin, error: adminError }, { data: roles, error: rolesError }] = await Promise.all([
            _supabase.from('admins').select('*').eq('id', adminId).single(),
            _supabase.from('roles').select('*').order('name', { ascending: true })
        ]);

        if (adminError) throw adminError;
        if (rolesError) throw rolesError;

        const roleOptions = roles.map(r => `
            <option value="${r.id}" ${admin.role_id === r.id ? 'selected' : ''}>${r.name}</option>
        `).join('');

        const formHtml = `
            <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Name*</label>
                        <input type="text" id="edit-admin-name" value="${admin.name || ''}" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email*</label>
                        <input type="email" id="edit-admin-email" value="${admin.email || ''}" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number*</label>
                        <input type="text" id="edit-admin-phone" value="${admin.phone || ''}" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Role*</label>
                        <select id="edit-admin-role" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                            ${roleOptions}
                        </select>
                    </div>
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address*</label>
                    <input type="text" id="edit-admin-address" value="${admin.address || ''}" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                        <select id="edit-admin-status" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                            <option value="active" ${admin.status === 'active' ? 'selected' : ''}>Active</option>
                            <option value="inactive" ${admin.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                        </select>
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password (Leave blank to keep current)</label>
                        <input type="password" id="edit-admin-password" placeholder="••••••••" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    </div>
                </div>
            </div>
        `;

        UI.showModal(`Edit Admin: ${admin.name}`, formHtml, async () => {
            const name = document.getElementById('edit-admin-name').value;
            const email = document.getElementById('edit-admin-email').value;
            const phone = document.getElementById('edit-admin-phone').value;
            const address = document.getElementById('edit-admin-address').value;
            const role_id = document.getElementById('edit-admin-role').value;
            const status = document.getElementById('edit-admin-status').value;
            const password = document.getElementById('edit-admin-password').value;

            if (!name || !email || !phone || !address || !role_id) {
                UI.alert('Required', 'সব বাধ্যতামূলক ঘরগুলো পূরণ করুন।', 'error');
                return false;
            }

            const updateData = { name, email, phone, address, role_id, status };
            if (password) {
                updateData.password = await window.UI.hashPassword(password);
            }

            const { error: updateError } = await _supabase
                .from('admins')
                .update(updateData)
                .eq('id', adminId);

            if (updateError) {
                UI.alert('Error', updateError.message, 'error');
                return false;
            }

            UI.alert('Success', 'Admin updated successfully.', 'success');
            AuditLogger.log('Update Admin', `Updated admin: ${name} (ID: ${adminId})`);
            fetchAdmins();
            return true;
        });

    } catch (err) {
        console.error('Error opening edit modal:', err);
        UI.alert('Error', 'তথ্য লোড করতে সমস্যা হয়েছে।', 'error');
    }
};

window.deleteAdmin = async (id, name) => {
    try {
        const { data: admin, error: fetchErr } = await _supabase
            .from('admins')
            .select('*, roles(name)')
            .eq('id', id)
            .single();
            
        if (admin && admin.roles?.name === 'Super Admin') {
            UI.alert('Denied', 'Super Admin অ্যাকাউন্ট রিমুভ করা সম্ভব নয়।', 'error');
            return;
        }

        const confirmed = await UI.confirm('Delete Admin', `Are you sure you want to delete ${name}?`);
        if (confirmed) {
            const { error } = await _supabase.from('admins').delete().eq('id', id);
            if (error) throw error;
            UI.alert('Deleted', `${name} has been removed successfully.`, 'success');
            AuditLogger.log('Delete Admin', `Admin ${name} (ID: ${id}) was deleted`);
            fetchAdmins();
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        UI.alert('Error', 'Failed to delete admin.', 'error');
    }
};

// Close dropdowns on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
        document.querySelectorAll('[id^="admin-dropdown-"]').forEach(el => el.classList.add('hidden'));
    }
});

