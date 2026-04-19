const preOrdersHTML = `
<div class="space-y-4 pb-10">
    <!-- Filtering Section (collapsed by default) -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <button class="w-full px-4 py-3 flex justify-between items-center bg-gray-50/50 hover:bg-gray-100/50 transition-colors rounded-lg text-left" onclick="this.nextElementSibling.classList.toggle('hidden');">
            <h2 class="text-gray-800 font-medium text-sm">Filtering</h2>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        </button>
        <div class="hidden p-4 border-t border-gray-100 space-y-5">
            <!-- Row 1 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Created Date Range</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Confirmed Date Range</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Followup Date</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
            </div>

            <!-- Row 2 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Last Followup/Note</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Order Range</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Order Date Type*</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>No Order</option>
                    </select>
                </div>
            </div>

            <!-- Row 3 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Status*</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Pending</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Star Type</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Any</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Employee</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Search Employee</option>
                    </select>
                </div>
            </div>

            <!-- Row 4 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Number of Notes/Conversions</label>
                    <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Number of Orders</label>
                    <div class="flex">
                        <input type="text" class="w-2/3 border border-gray-300 rounded-l px-3 py-2 text-xs focus:outline-none">
                        <select class="w-1/3 border border-gray-300 border-l-0 rounded-r px-2 py-2 text-[10px] bg-white text-gray-600 outline-none">
                            <option>Greater Then Equal</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Order Amount</label>
                    <div class="flex">
                        <input type="text" class="w-2/3 border border-gray-300 rounded-l px-3 py-2 text-xs focus:outline-none">
                        <select class="w-1/3 border border-gray-300 border-l-0 rounded-r px-2 py-2 text-[10px] bg-white text-gray-600 outline-none">
                            <option>Greater Then Equal</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Row 5 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Order Source</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-1.5">
                        <label class="text-xs font-bold text-gray-800">Order Tag</label>
                        <label class="flex items-center gap-1 text-[10px] text-gray-600 cursor-pointer">
                            <input type="checkbox" class="rounded-sm border-gray-300"> Exclude
                        </label>
                    </div>
                    <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none">
                    <label class="flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-600 cursor-pointer">
                        <input type="checkbox" class="rounded-sm border-gray-300"> Match All
                    </label>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-1.5">
                        <label class="text-xs font-bold text-gray-800">Select Product</label>
                        <label class="flex items-center gap-1 text-[10px] text-gray-600 cursor-pointer">
                            <input type="checkbox" class="rounded-sm border-gray-300"> Exclude
                        </label>
                    </div>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Search Product</option>
                    </select>
                </div>
            </div>

            <!-- Filter Buttons -->
            <div class="flex items-center gap-3 pt-3 border-t border-gray-100">
                <button class="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5">
                    <i class="fas fa-times"></i> Clear Filter
                </button>
                <button class="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5">
                    <i class="fas fa-list-ul"></i> Order Items
                </button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5">
                    <i class="fas fa-file-export"></i> Export
                </button>
            </div>
        </div>
    </div>

    <!-- Pre Order List Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-white rounded-t-lg flex justify-between items-center">
            <h2 class="text-gray-800 font-medium text-sm">Pre Order List</h2>
            <button class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center transition-colors">
                <i class="fas fa-plus mr-2"></i> Create New
            </button>
        </div>
        <div class="p-4">
            <!-- Table Controls -->
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center text-xs text-gray-600">
                    <span>Show</span>
                    <select class="mx-2 border border-gray-300 rounded px-2 py-1 outline-none">
                        <option>10</option><option>25</option><option>50</option>
                    </select>
                    <span>entries</span>
                </div>
                <div class="flex items-center text-xs text-gray-600">
                    <span class="mr-2">Search:</span>
                    <input type="text" class="border border-gray-300 rounded px-2 py-1 outline-none w-48">
                </div>
            </div>

            <div class="text-[11px] text-gray-500 mb-2">Showing 0 to 0 of 0 entries</div>

            <!-- Pre Order Table -->
            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[11px] whitespace-nowrap">
                    <thead class="bg-white border-b border-gray-200 text-gray-800 font-bold uppercase tracking-wider">
                        <tr>
                            <th class="px-4 py-3 border-r border-gray-200">Create Date</th>
                            <th class="px-4 py-3 border-r border-gray-200 text-center">
                                <input type="checkbox" class="rounded border-gray-300">
                                <div class="text-[9px] mt-0.5">Select</div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center justify-between">Next Followup <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center justify-between">Notes/Followup <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center justify-between">ID <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">Info</th>
                            <th class="px-4 py-3 border-r border-gray-200">Star Lead</th>
                            <th class="px-4 py-3 border-r border-gray-200">Total Orders</th>
                            <th class="px-4 py-3 border-r border-gray-200">Summary</th>
                            <th class="px-4 py-3 border-r border-gray-200">Added By</th>
                            <th class="px-4 py-3 border-r border-gray-200">Status</th>
                            <th class="px-4 py-3 border-r border-gray-200">Address</th>
                            <th class="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody id="preOrderTable">
                        <tr>
                            <td colspan="13" class="px-4 py-8 text-center text-gray-500 bg-gray-50/50 text-xs font-medium">No data available in table</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-between items-center mt-4">
                <div class="text-[10px] text-gray-500">Showing 0 to 0 of 0 entries</div>
                <div class="flex">
                    <button class="px-4 py-1.5 border border-gray-300 bg-white text-gray-600 text-[11px] rounded-l hover:bg-gray-50 transition-colors">Previous</button>
                    <button class="px-4 py-1.5 border border-gray-300 border-l-0 bg-white text-gray-600 text-[11px] rounded-r hover:bg-gray-50 transition-colors">Next</button>
                </div>
            </div>

            <div class="flex items-center text-xs text-gray-600 mt-2">
                <span>Show</span>
                <select class="mx-2 border border-gray-300 rounded px-2 py-1 outline-none">
                    <option>10</option>
                </select>
                <span>entries</span>
            </div>
        </div>

        <!-- Action Section at bottom of card -->
        <div class="p-6 border-t border-gray-100 bg-gray-50/30">
            <div class="flex flex-wrap items-start gap-8 justify-between">
                <!-- Left: Bulk Actions -->
                <div class="space-y-3">
                    <div class="flex gap-2">
                        <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center transition-colors">
                            <i class="fas fa-plus mr-1.5"></i> Add Bulk Note
                        </button>
                        <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center transition-colors">
                            <i class="fas fa-check mr-1.5"></i> Bulk Confirm
                        </button>
                    </div>
                    <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center transition-colors w-28">
                        <i class="fas fa-trash-alt mr-1.5"></i> Delete
                    </button>
                </div>

                <!-- Middle: Transfer -->
                <div class="space-y-3 flex-1 max-w-[300px]">
                    <div>
                        <label class="block text-xs font-bold text-gray-800 mb-1.5">Transfer To*</label>
                        <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-teal-500 bg-white">
                            <option>Search Employee</option>
                        </select>
                    </div>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors">
                        Transfer Selected
                    </button>
                </div>

                <!-- Right: Tags -->
                <div class="space-y-3 flex-1 max-w-[300px]">
                    <div>
                        <label class="block text-xs font-bold text-gray-800 mb-1.5">Order Tag</label>
                        <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500">
                    </div>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors">
                        Set Tag
                    </button>
                </div>

                <!-- Totals -->
                <div class="text-right space-y-1">
                    <div class="text-[13px] font-bold text-gray-800">Total Amount: <span class="text-gray-900">0.00 Tk</span></div>
                    <div class="text-[13px] font-bold text-gray-800">Paid Amount: <span class="text-gray-900">0.00 Tk</span></div>
                    <div class="text-[13px] font-bold text-gray-800">Due Amount: <span class="text-gray-900">0.00 Tk</span></div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
