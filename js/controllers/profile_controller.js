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

