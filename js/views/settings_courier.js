const settingsCourierHTML = `
<div class="space-y-6 pb-10">
    <!-- Main Config Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/30 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Courier Config</h2>
        </div>
        <div class="p-6">
            <!-- Global Settings Grid -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div>
                    <label class="block text-[13px] font-bold text-gray-700 mb-2">Enable Courier</label>
                    <select id="enable-courier-toggle" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white" onchange="toggleCourierDetails(this.value)">
                        <option value="Disable" selected>Disable</option>
                        <option value="Enable">Enable</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[13px] font-bold text-gray-700 mb-2">Send to (In Courier) Only from API</label>
                    <select id="send-to-api-only" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[13px] font-bold text-gray-700 mb-2">Allow API to Make "Completed"</label>
                    <select id="allow-api-completed" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[13px] font-bold text-gray-700 mb-2">Allow Duplicate Parcel ID</label>
                    <select id="allow-duplicate-id" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                    <label class="block text-[13px] font-bold text-gray-700 mb-2">
                        "Pending Return" if COD are 0 Tk <i class="fas fa-info-circle text-gray-400 ml-1"></i>
                    </label>
                    <select id="pending-return-zero-cod" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[13px] font-bold text-gray-700 mb-2">
                        Default COD Charge(%) <i class="fas fa-info-circle text-gray-400 ml-1"></i>
                    </label>
                    <input type="text" id="default-cod-charge" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                </div>
                <div>
                    <label class="block text-[13px] font-bold text-gray-700 mb-2">Return/Damage will be charge from Courier</label>
                    <select id="charge-from-courier" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>

            <div class="mb-6">
                <label class="block text-[13px] font-bold text-gray-700 mb-2">Default Courier Note</label>
                <textarea id="default-courier-note" rows="4" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"></textarea>
            </div>

            <!-- Detailed Config Container -->
            <div id="courier-detailed-config" class="space-y-6 hidden">
                
                <!-- CarryBee Credentials -->
                <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div class="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors" onclick="toggleCourierAccordion('carrybee-content', 'carrybee-arrow')">
                        <div class="flex items-center gap-2">
                            <span class="text-[13px] font-medium text-gray-700">CarryBee Credentials</span>
                            <i id="carrybee-arrow" class="fas fa-chevron-right text-xs opacity-50 transform transition-transform duration-200"></i>
                        </div>
                        <div class="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in" onclick="event.stopPropagation()">
                            <input type="checkbox" id="toggle-carrybee" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer checked:translate-x-full checked:border-blue-600"/>
                            <label for="toggle-carrybee" class="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div id="carrybee-content" class="p-6 space-y-4 hidden">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">Mobile Number</label>
                                <input type="text" id="carrybee-mobile" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                            </div>
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">Password</label>
                                <input type="password" id="carrybee-password" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                            </div>
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">Client ID</label>
                                <input type="text" id="carrybee-client-id" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">Client Secret</label>
                                <input type="text" id="carrybee-client-secret" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                            </div>
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">Client Context</label>
                                <input type="text" id="carrybee-client-context" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                            </div>
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">Default Shipping Weight(In KG)</label>
                                <input type="text" id="carrybee-weight" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Steadfast Credentials -->
                <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div class="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors" onclick="toggleCourierAccordion('steadfast-content', 'steadfast-arrow')">
                        <div class="flex items-center gap-2">
                            <span class="text-[13px] font-medium text-gray-700">Steadfast Credentials</span>
                            <i id="steadfast-arrow" class="fas fa-chevron-right text-xs opacity-50 transform transition-transform duration-200"></i>
                        </div>
                        <div class="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in" onclick="event.stopPropagation()">
                            <input type="checkbox" id="toggle-steadfast" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer checked:translate-x-full checked:border-blue-600"/>
                            <label for="toggle-steadfast" class="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div id="steadfast-content" class="p-6 space-y-4 hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">API Key*</label>
                                <input type="text" id="steadfast-api-key" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 shadow-sm">
                            </div>
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">Secret Key*</label>
                                <input type="text" id="steadfast-secret-key" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 shadow-sm">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pathao Credentials -->
                <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div class="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors" onclick="toggleCourierAccordion('pathao-content', 'pathao-arrow')">
                        <div class="flex items-center gap-2">
                            <span class="text-[13px] font-medium text-gray-700">Pathao Credentials</span>
                            <i id="pathao-arrow" class="fas fa-chevron-right text-xs opacity-50 transform transition-transform duration-200"></i>
                        </div>
                        <div class="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in" onclick="event.stopPropagation()">
                            <input type="checkbox" id="toggle-pathao" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer checked:translate-x-full checked:border-blue-600"/>
                            <label for="toggle-pathao" class="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div id="pathao-content" class="p-6 space-y-4 hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">Client ID*</label>
                                <input type="text" id="pathao-client-id" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                            </div>
                            <div>
                                <label class="block text-[13px] font-bold text-gray-700 mb-2">Client Secret*</label>
                                <input type="text" id="pathao-client-secret" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- REDX Credentials -->
                <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div class="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors" onclick="toggleCourierAccordion('redx-content', 'redx-arrow')">
                        <div class="flex items-center gap-2">
                            <span class="text-[13px] font-medium text-gray-700">REDX Credentials</span>
                            <i id="redx-arrow" class="fas fa-chevron-right text-xs opacity-50 transform transition-transform duration-200"></i>
                        </div>
                        <div class="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in" onclick="event.stopPropagation()">
                            <input type="checkbox" id="toggle-redx" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer checked:translate-x-full checked:border-blue-600"/>
                            <label for="toggle-redx" class="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div id="redx-content" class="p-6 space-y-4 hidden">
                        <div>
                            <label class="block text-[13px] font-bold text-gray-700 mb-2">REDX API Token</label>
                            <input type="text" id="redx-api-token" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 shadow-sm">
                        </div>
                    </div>
                </div>

                <!-- Simple Toggle Couriers -->
                <div class="space-y-2">
                    <div class="bg-white border border-gray-200 rounded px-4 py-2 flex justify-between items-center shadow-sm">
                        <span class="text-[13px] text-gray-700">Sundarban Courier</span>
                        <div class="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" id="toggle-sundarban" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer checked:translate-x-full checked:border-blue-600"/>
                            <label for="toggle-sundarban" class="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <!-- Other simple toggles... -->
                </div>

            </div>
        </div>
    </div>

    <!-- Footer Action -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <button id="save-courier-settings" class="bg-[#7c14b4] hover:bg-[#6a119a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-sm transition-colors mb-2">Update</button>
        <p class="text-[11px] text-gray-900 font-bold">NB: * marked are required field.</p>
    </div>
</div>

<style>
    .toggle-checkbox {
        left: 0;
        transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }
    .toggle-checkbox:checked {
        transform: translateX(100%);
        border-color: #2563eb; /* Blue border when checked */
    }
    .toggle-checkbox:checked + .toggle-label {
        background-color: #2563eb; /* Blue background when checked */
    }
    .toggle-label {
        transition: background-color 0.2s ease-in-out;
    }
</style>
`;

function toggleCourierDetails(value) {
    const detailedConfig = document.getElementById('courier-detailed-config');
    if (value === 'Enable') {
        detailedConfig.classList.remove('hidden');
    } else {
        detailedConfig.classList.add('hidden');
    }
}

function toggleCourierAccordion(contentId, arrowId) {
    const content = document.getElementById(contentId);
    const arrow = document.getElementById(arrowId);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        arrow.style.transform = 'rotate(90deg)';
    } else {
        content.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
    }
}
