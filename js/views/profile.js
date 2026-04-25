const profileHTML = `
<div class="pb-10 -mt-6 -mx-4 md:-mx-6">
    <!-- Profile Header Banner -->
    <div class="h-48 bg-gradient-to-r from-purple-700 to-indigo-800 relative">
        <div class="absolute inset-0 bg-black/10"></div>
    </div>

    <!-- Main Content Container -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <!-- Profile Picture Header Card -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8 flex flex-col items-center text-center">
            <div class="relative group">
                <div class="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center relative">
                    <!-- Default SVG Avatar (Premium Purple Design) -->
                    <div id="profile-pic-default" class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
                        <svg class="w-20 h-20 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>

                    <!-- Uploaded Photo (Hidden by default, shown via JS on success) -->
                    <img id="profile-pic-preview" src="" alt="" class="w-full h-full object-cover absolute inset-0 hidden border-none">
                    <!-- Hover Overlay -->
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onclick="document.getElementById('profile-pic-input').click()" class="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all transform hover:scale-110">
                            <i class="fas fa-camera text-xl"></i>
                        </button>
                    </div>
                </div>
                <!-- Status Badge -->
                <div class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
            </div>
            
            <h2 id="profile-display-name" class="mt-4 text-2xl font-bold text-gray-800">Admin</h2>
            <p class="text-gray-500 text-sm font-medium">Super Admin • Top One Bazar</p>
            
            <input type="file" id="profile-pic-input" class="hidden" accept="image/*">
            
            <div class="mt-6 flex gap-3">
                <button onclick="document.getElementById('profile-pic-input').click()" class="bg-purple-50 text-purple-700 hover:bg-purple-100 px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                    <i class="fas fa-upload"></i> Change Photo
                </button>
                <button onclick="window.removeProfilePic()" class="bg-gray-50 text-gray-500 hover:bg-gray-100 px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                    <i class="fas fa-trash-alt"></i> Remove
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left: Account Details -->
            <div class="lg:col-span-2 space-y-8 text-left">
                <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div class="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                        <h3 class="text-base font-bold text-gray-800 flex items-center gap-2">
                            <i class="fas fa-id-card text-purple-500"></i> Account Information
                        </h3>
                        <span class="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold uppercase">Personal</span>
                    </div>
                    <div class="p-8 space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                <div class="relative">
                                    <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
                                    <input type="text" id="profile-name" value="" placeholder="Enter your name" class="w-full bg-gray-50/50 border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition-all text-gray-700">
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                <div class="relative">
                                    <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
                                    <input type="email" id="profile-email" value="" placeholder="email@example.com" class="w-full bg-gray-50/50 border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition-all text-gray-700">
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mobile Number</label>
                                <div class="relative">
                                    <i class="fas fa-phone-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
                                    <input type="text" id="profile-mobile" value="" placeholder="01XXXXXXXXX" class="w-full bg-gray-50/50 border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition-all text-gray-700">
                                </div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mailing Address</label>
                            <div class="relative">
                                <i class="fas fa-map-marker-alt absolute left-4 top-4 text-gray-300 text-sm"></i>
                                <textarea id="profile-address" rows="3" placeholder="Enter your full address" class="w-full bg-gray-50/50 border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition-all text-gray-700"></textarea>
                            </div>
                        </div>
                        
                        <div class="pt-4">
                            <button id="update-profile-btn" class="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2">
                                <i class="fas fa-check-circle"></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right: Security -->
            <div class="space-y-8 text-left">
                <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div class="px-8 py-6 border-b border-gray-50">
                        <h3 class="text-base font-bold text-gray-800 flex items-center gap-2">
                            <i class="fas fa-shield-alt text-purple-500"></i> Password & Security
                        </h3>
                    </div>
                    <div class="p-8 space-y-6">
                        <div class="space-y-2">
                            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Current Password</label>
                            <input type="password" id="profile-old-password" class="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">New Password</label>
                            <input type="password" id="profile-new-password" class="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Confirm New Password</label>
                            <input type="password" id="profile-confirm-password" class="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all">
                        </div>
                        
                        <button id="update-password-btn" class="w-full border-2 border-purple-100 text-purple-700 hover:bg-purple-700 hover:text-white hover:border-purple-700 px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 mt-4">
                            <i class="fas fa-key"></i> Update Password
                        </button>
                    </div>
                </div>

                <!-- Footer in Profile -->
                <div class="text-center pt-10">
                    <p class="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Top One Bazar © 2026</p>
                    <p class="text-[9px] text-gray-300 font-medium">All Right Reserved</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

/**
 * Initialize Profile View
 */
window.initProfile = () => {
    const admin = AuthManager.getProfile();
    if (!admin) return;

    // Fill UI
    const displayNameEl = document.getElementById('profile-display-name');
    if (displayNameEl) displayNameEl.innerText = admin.name || 'Admin';
    
    const roleEl = document.querySelector('.text-gray-500.text-sm.font-medium');
    if (roleEl) roleEl.innerText = `${admin.role_name || 'n/a'} • Top One Bazar`;
    
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const mobileInput = document.getElementById('profile-mobile');
    const addressInput = document.getElementById('profile-address');

    if (nameInput) nameInput.value = admin.name || '';
    if (emailInput) emailInput.value = admin.email || '';
    if (mobileInput) mobileInput.value = admin.phone || '';
    if (addressInput) addressInput.value = admin.address || '';

    // Handle Profile Update
    const updateBtn = document.getElementById('update-profile-btn');
    if (updateBtn) {
        updateBtn.onclick = async () => {
            const name = nameInput.value;
            const email = emailInput.value;
            const phone = mobileInput.value;
            const address = addressInput.value;

            updateBtn.disabled = true;
            updateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

            try {
                const { error } = await _supabase
                    .from('admins')
                    .update({ name, email, phone, address })
                    .eq('id', admin.id);

                if (error) throw error;

                // Update local state
                const updatedAdmin = { ...admin, name, email, phone, address };
                AuthManager._currentAdmin = updatedAdmin;
                sessionStorage.setItem('admin_profile', JSON.stringify(updatedAdmin));

                UI.alert('Success', 'Profile updated successfully!', 'success');
                AuditLogger.log('Profile Update', `Admin ${name} updated their profile`);
                
                // Refresh Header display if visible
                const headerNameEl = document.querySelector('.text-sm.font-black.text-gray-800');
                if (headerNameEl) headerNameEl.innerText = name;
                
            } catch (err) {
                UI.alert('Error', err.message, 'error');
            } finally {
                updateBtn.disabled = false;
                updateBtn.innerHTML = '<i class="fas fa-check-circle"></i> Save Changes';
            }
        };
    }

    // Password Update Mock
    const passwordBtn = document.getElementById('update-password-btn');
    if (passwordBtn) {
        passwordBtn.onclick = () => {
            UI.alert('Security', 'Password change is restricted to Supabase Auth settings.', 'danger');
        };
    }
};

window.removeProfilePic = () => {
    UI.alert('Notice', 'Profile picture removal logic coming soon.', 'success');
};
