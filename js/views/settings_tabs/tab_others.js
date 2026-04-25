const tabOthersHTML = `
<!-- OTHERS CONTENT -->
            <div id="content-others" class="general-tab-content hidden">
                <div class="space-y-6">
                    <!-- Open WhatsApp In -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Open WhatsApp In</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="whatsapp-in" class="w-4 h-4 text-blue-600" checked> App</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="whatsapp-in" class="w-4 h-4 text-blue-600"> Browser</label>
                        </div>
                    </div>

                    <!-- DataTable Default Entries -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">DataTable Default Entries:</label>
                        <select class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5 text-gray-700">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                    </div>

                    <!-- Dashboard Default Date -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Dashboard Default Date:</label>
                        <select class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5 text-gray-700">
                            <option>Today</option>
                            <option>Yesterday</option>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option selected>This Month</option>
                            <option>Last Month</option>
                        </select>
                    </div>

                    <!-- Product Categories -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Product Categories:</label>
                        <div id="settings-product-categories-container" class="flex flex-wrap gap-2 border border-gray-300 rounded px-3 py-2 min-h-[42px] focus-within:border-purple-500 transition-colors w-full md:w-4/5">
                            <input type="text" placeholder="Add Category..." class="flex-1 min-w-[120px] outline-none text-sm font-bold text-gray-700 bg-transparent">
                        </div>
                        <p class="text-[10px] text-gray-400 font-bold italic">Type and press Enter or comma (,) to add multiple categories.</p>
                    </div>

                    <!-- Product Brands -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Product Brands:</label>
                        <div id="settings-product-brands-container" class="flex flex-wrap gap-2 border border-gray-300 rounded px-3 py-2 min-h-[42px] focus-within:border-purple-500 transition-colors w-full md:w-4/5">
                            <input type="text" placeholder="Add Brand..." class="flex-1 min-w-[120px] outline-none text-sm font-bold text-gray-700 bg-transparent">
                        </div>
                        <p class="text-[10px] text-gray-400 font-bold italic">Type and press Enter or comma (,) to add multiple brands.</p>
                    </div>
                </div>
            </div>
`;
