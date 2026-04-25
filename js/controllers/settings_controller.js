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
