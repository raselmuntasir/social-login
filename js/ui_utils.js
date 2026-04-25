/**
 * UI Utilities - Custom Modals, Skeletons, and Notifications
 */

const UI = {
    /**
     * Show a premium confirmation modal
     */
    async confirm(title, message, confirmText = 'Confirm', type = 'danger') {
        return new Promise((resolve) => {
            const modalId = `modal-${Date.now()}`;
            const btnColor = type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-700 hover:bg-purple-800';
            const icon = type === 'danger' ? 'fa-triangle-exclamation text-red-500' : 'fa-circle-info text-purple-500';

            const modalHTML = `
                <div id="${modalId}" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
                        <div class="p-8 text-center">
                            <div class="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 shadow-inner">
                                <i class="fas ${icon} text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-black text-gray-800 mb-2">${title}</h3>
                            <p class="text-sm font-medium text-gray-500 leading-relaxed">${message}</p>
                        </div>
                        <div class="flex border-t border-gray-100">
                            <button id="${modalId}-cancel" class="flex-1 px-6 py-4 text-sm font-black text-gray-400 hover:bg-gray-50 transition-all uppercase tracking-widest">Cancel</button>
                            <button id="${modalId}-confirm" class="flex-1 px-6 py-4 text-sm font-black text-white ${btnColor} transition-all uppercase tracking-widest shadow-lg">${confirmText}</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);

            const modal = document.getElementById(modalId);
            const cancelBtn = document.getElementById(`${modalId}-cancel`);
            const confirmBtn = document.getElementById(`${modalId}-confirm`);

            const cleanup = (result) => {
                modal.classList.add('fade-out');
                modal.querySelector('div').classList.add('zoom-out-95');
                setTimeout(() => {
                    modal.remove();
                    resolve(result);
                }, 300);
            };

            cancelBtn.onclick = () => cleanup(false);
            confirmBtn.onclick = () => cleanup(true);
        });
    },

    /**
     * Show a premium alert/toast
     */
    alert(title, message, type = 'success') {
        const modalId = `alert-${Date.now()}`;
        const icon = type === 'success' ? 'fa-circle-check text-green-500' : 'fa-circle-xmark text-red-500';
        
        const html = `
            <div id="${modalId}" class="fixed top-6 left-1/2 -translate-x-1/2 z-[10001] animate-in slide-in-from-top-full duration-500">
                <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 pr-12 flex items-center gap-4 min-w-[320px]">
                    <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                        <i class="fas ${icon} text-lg"></i>
                    </div>
                    <div>
                        <h4 class="text-sm font-black text-gray-800">${title}</h4>
                        <p class="text-[11px] font-bold text-gray-400 uppercase tracking-tight">${message}</p>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
        setTimeout(() => {
            const el = document.getElementById(modalId);
            if (el) {
                el.classList.replace('slide-in-from-top-full', 'fade-out');
                setTimeout(() => el.remove(), 500);
            }
        }, 4000);
    },

    /**
     * Skeleton loader for tables
     */
    getTableSkeleton(rows = 5, cols = 6) {
        let rowsHTML = '';
        for (let i = 0; i < rows; i++) {
            rowsHTML += `
                <tr class="animate-pulse">
                    ${Array(cols).fill(0).map(() => `
                        <td class="px-6 py-5">
                            <div class="h-4 bg-gray-100 rounded-full w-full opacity-50"></div>
                        </td>
                    `).join('')}
                </tr>
            `;
        }
        return rowsHTML;
    },
    /**
     * Show a generic modal with custom content
     */
    showModal(title, htmlContent, onSave = null) {
        return new Promise((resolve) => {
            const modalId = 'ui-custom-modal';
            let modal = document.getElementById(modalId);
            if (!modal) {
                modal = document.createElement('div');
                modal.id = modalId;
                modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center p-4 transition-opacity duration-300 opacity-0';
                document.body.appendChild(modal);
            }

            modal.innerHTML = `
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
                <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden transform transition-all scale-95 duration-300">
                    <!-- Header -->
                    <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 class="text-xl font-black text-gray-800 uppercase tracking-tight">${title}</h3>
                        <button onclick="UI._closeModal()" class="w-10 h-10 rounded-xl hover:bg-gray-200/50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- Body -->
                    <div class="px-8 py-8 max-h-[70vh] overflow-y-auto">
                        ${htmlContent}
                    </div>

                    <!-- Footer -->
                    <div class="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                        <button onclick="UI._closeModal()" class="px-6 py-3 rounded-xl font-black text-xs text-gray-500 hover:bg-gray-200/50 transition-all uppercase tracking-widest">Cancel</button>
                        ${onSave ? `
                            <button id="modal-save-btn" class="px-8 py-3 rounded-xl font-black text-xs bg-purple-700 text-white hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 uppercase tracking-widest">
                                Save Changes
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;

            // Trigger animation
            requestAnimationFrame(() => {
                modal.classList.remove('opacity-0');
                modal.querySelector('div:nth-child(2)').classList.remove('scale-95');
            });

            UI._closeModal = () => {
                modal.classList.add('opacity-0');
                const content = modal.querySelector('div:nth-child(2)');
                if (content) content.classList.add('scale-95');
                
                setTimeout(() => {
                    modal.remove(); // Remove completely from DOM
                    resolve(null);
                }, 300);
            };

            if (onSave) {
                const saveBtn = document.getElementById('modal-save-btn');
                if (saveBtn) {
                    saveBtn.onclick = async () => {
                        const originalText = saveBtn.innerText;
                        saveBtn.disabled = true;
                        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> SAVING...';
                        
                        const result = await onSave();
                        if (result !== false) {
                            UI._closeModal();
                            resolve(result);
                        } else {
                            saveBtn.disabled = false;
                            saveBtn.innerText = originalText;
                        }
                    };
                }
            }
        });
    },

    /**
     * Secure Hashing (SHA-256)
     * Used for password protection
     */
    async hashPassword(password) {
        if (!password) return '';
        const msgUint8 = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Secure HTML Escaping
     * Prevents XSS attacks when rendering dynamic data
     */
    escapeHTML(str) {
        if (str === null || str === undefined) return '';
        if (typeof str !== 'string') str = String(str);
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
};

window.UI = UI;
