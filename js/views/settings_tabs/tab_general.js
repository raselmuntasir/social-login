const tabGeneralHTML = `
<!-- GENERAL INFO CONTENT -->
            <div id="content-general" class="general-tab-content block">
                <div class="flex flex-col lg:flex-row gap-10">
                    <!-- Form Fields -->
                    <div class="flex-1 space-y-5">
                        <div class="flex flex-col md:flex-row md:items-center gap-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700">Business Name*:</label>
                            <input type="text" id="setting-business-name" value="Top One Bazar" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center gap-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700">Business Mobile*:</label>
                            <input type="text" id="setting-business-mobile" value="01710501210" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center gap-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700">Business Email:</label>
                            <input type="email" id="setting-business-email" value="raselmoontasir@gmail.com" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center gap-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700">Web URL:</label>
                            <input type="text" id="setting-web-url" placeholder="Web URL" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div class="flex flex-col md:flex-row gap-2 pt-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700 pt-2">Address*</label>
                            <textarea id="setting-address" rows="2" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">550/c, Khilgaon, Dhaka, bangladesh.</textarea>
                        </div>
                    </div>

                    <!-- Redesigned Logo Section -->
                    <div class="w-full lg:w-72 flex flex-col items-center">
                        <div class="relative group">
                            <div class="w-48 h-48 bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-purple-300 bg-gray-50/30">
                                <img id="setting-logo-preview" src="https://via.placeholder.com/200?text=Logo" alt="Logo Preview" class="w-full h-full object-contain p-4 hidden">
                                <div id="logo-placeholder" class="flex flex-col items-center text-gray-400">
                                    <i class="fas fa-cloud-upload-alt text-3xl mb-2"></i>
                                    <span class="text-[10px] font-medium uppercase tracking-wider">No Logo Set</span>
                                </div>
                            </div>
                            
                            <!-- Action Buttons on Hover -->
                            <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                <button onclick="document.getElementById('setting-logo-input').click()" class="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform mx-1" title="Upload New Logo">
                                    <i class="fas fa-camera"></i>
                                </button>
                                <button onclick="window.removeGeneralLogo()" class="bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform mx-1" title="Remove Logo">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        <p class="text-xs font-bold text-gray-500 mt-4 mb-3 uppercase tracking-widest">Business Logo</p>
                        
                        <input type="file" id="setting-logo-input" class="hidden" accept="image/*">
                        
                        <button onclick="document.getElementById('setting-logo-input').click()" class="w-full bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2">
                            <i class="fas fa-upload"></i>
                            <span>Change Logo</span>
                        </button>
                        <p class="text-[9px] text-gray-400 mt-2 text-center">Recommended size: 500x500px <br> PNG or JPG, max 2MB</p>
                    </div>
                </div>
            </div>
`;
