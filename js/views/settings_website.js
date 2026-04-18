const settingsWebsiteHTML = `
<div class="space-y-6 pb-10">
    <!-- Main Settings Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Settings</h2>
        </div>
        <div class="p-6 space-y-6">
            <!-- Setting Items -->
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-2">Allow Customer to Make Order if Product Has no Stock</label>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="stock_order" class="text-teal-600 focus:ring-teal-500" checked> Yes
                        </label>
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="stock_order" class="text-teal-600 focus:ring-teal-500"> No
                        </label>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">No stock Alert</label>
                    <input type="text" value="Order canceled for insufficient stock!" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-teal-500">
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Check Duplicate Order In(Hours)</label>
                    <input type="text" value="24" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-teal-500">
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">OTP Verify if Courier Score is Less Than(%)</label>
                    <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-teal-500">
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-2">Check Duplicate by Name & Address?</label>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="dup_name" class="text-teal-600 focus:ring-teal-500"> Yes
                        </label>
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="dup_name" class="text-teal-600 focus:ring-teal-500" checked> No
                        </label>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-2">Check Duplicate by IP?</label>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="dup_ip" class="text-teal-600 focus:ring-teal-500"> Yes
                        </label>
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="dup_ip" class="text-teal-600 focus:ring-teal-500" checked> No
                        </label>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-2">BD Mobile Number Validation?</label>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="mobile_val" class="text-teal-600 focus:ring-teal-500" checked> Yes
                        </label>
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="mobile_val" class="text-teal-600 focus:ring-teal-500"> No
                        </label>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-2">Product Identify Using</label>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="prod_id" class="text-teal-600 focus:ring-teal-500" checked> Title
                        </label>
                        <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="radio" name="prod_id" class="text-teal-600 focus:ring-teal-500"> SKU
                        </label>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">API Access Token for BizMation Plugin:</label>
                    <div class="flex">
                        <input type="text" value="$2y$10$e8NoJ/PGaBiVCbwwJb6if.KVCtk7HKkhGw3nMafpGaTdSPETpCbgi" class="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm bg-gray-50 text-gray-500 focus:outline-none" readonly>
                        <button class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-r text-sm font-medium flex items-center gap-2 transition-colors">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
            </div>

            <div class="pt-4 border-t border-gray-100">
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
                    <i class="fas fa-save"></i> Update
                </button>
            </div>
        </div>
    </div>

    <!-- Website List Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 class="text-gray-800 font-medium text-sm">Websites List for Sync Product & Orders - User ID: 17945</h2>
            <button class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-colors">
                <i class="fas fa-plus"></i> Add New
            </button>
        </div>
        <div class="p-4">
            <div class="overflow-x-auto border border-gray-100 rounded">
                <table class="w-full text-left text-xs">
                    <thead class="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                        <tr>
                            <th class="px-3 py-3 border-r border-gray-200">URL</th>
                            <th class="px-3 py-3 border-r border-gray-200">Sync Product</th>
                            <th class="px-3 py-3 border-r border-gray-200">Sync Orders</th>
                            <th class="px-3 py-3 border-r border-gray-200">Sync Status</th>
                            <th class="px-3 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5" class="px-4 py-8 text-center text-gray-800 font-bold">No Website Added!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`;
