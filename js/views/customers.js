const customersHTML = `
<div class="space-y-4 pb-10">
    <!-- Filtering Section (collapsed by default) -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <button class="w-full px-4 py-3 flex justify-between items-center bg-gray-50/50 hover:bg-gray-100/50 transition-colors rounded-lg text-left" onclick="this.nextElementSibling.classList.toggle('hidden');">
            <h2 class="text-gray-800 font-medium text-sm">Filtering</h2>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        </button>
        <div class="hidden p-4 border-t border-gray-100 space-y-5">
            <!-- Row 1 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Create Date</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Last Order Range</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">No Order Range</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                    <label class="flex items-center gap-1.5 mt-1 text-[10px] text-gray-600 cursor-pointer">
                        <input type="checkbox" class="rounded-sm border-gray-300"> No lead note added in this range
                    </label>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Customer Note Added At</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
            </div>

            <!-- Row 2 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Followup Range</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Delivered At</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-purple-700 text-white font-medium">
                        <option>All Time</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Followup Status</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Note Added By</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>Search Employee</option>
                    </select>
                </div>
            </div>

            <!-- Row 3 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Number of Min Orders</label>
                    <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Number of Min Delivered/Completed</label>
                    <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none">
                </div>
                <div>
                    <div class="flex justify-between items-center mb-1.5">
                        <label class="text-xs font-bold text-gray-800">Order Statuses</label>
                        <label class="flex items-center gap-1 text-[10px] text-gray-600 cursor-pointer">
                            <input type="checkbox" class="rounded-sm border-gray-300"> Exclude
                        </label>
                    </div>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>Select Statuses</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Order Source</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>Select Source</option>
                    </select>
                </div>
            </div>

            <!-- Row 4 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Product</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>Search Product</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Courier Success Rate</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Customer Type</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Customer Tag</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>Select Tag</option>
                    </select>
                </div>
            </div>

            <!-- Row 5 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Employee</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>Search Employee</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">District</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>Search District</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Order Item Amount(Min)</label>
                    <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Order Item Amount(Max)</label>
                    <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none">
                </div>
            </div>

            <!-- Row 6 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Product Category</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none bg-white text-gray-600">
                        <option>Search Category</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1.5">Number of Notes</label>
                    <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none">
                </div>
            </div>

            <!-- Filter Buttons -->
            <div class="flex items-center gap-3 pt-3 border-t border-gray-100">
                <button class="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5">
                    <i class="fas fa-undo"></i> Clear Filter
                </button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5">
                    <i class="fas fa-file-export"></i> Export Customers
                </button>
            </div>
        </div>
    </div>

    <!-- Status Badges -->
    <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex flex-wrap gap-2">
        <button class="bg-teal-600 text-white px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-2">
            All <span class="bg-black/20 px-1.5 rounded-full">0</span>
        </button>
    </div>

    <!-- Customer List Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
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
                    <input type="text" id="customer-search" class="border border-gray-300 rounded px-2 py-1 outline-none w-48">
                </div>
            </div>

            <div class="text-[11px] text-gray-500 mb-2">Showing 0 to 0 of 0 entries</div>

            <!-- Customer Table -->
            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[11px] whitespace-nowrap">
                    <thead class="bg-white border-b border-gray-200 text-gray-800 font-bold">
                        <tr>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center justify-between">ID <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200 text-center">
                                <input type="checkbox" class="rounded border-gray-300">
                                <div class="text-[9px] mt-0.5 font-bold">Select</div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center justify-between">Name & Number <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center justify-between">Orders <i class="fas fa-info-circle text-gray-400 ml-1"></i> <i class="fas fa-sort text-gray-300 ml-auto"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center justify-between">Delivered Completed <i class="fas fa-info-circle text-gray-400 ml-1"></i> <i class="fas fa-sort text-gray-300 ml-auto"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">Courier Score</th>
                            <th class="px-4 py-3 border-r border-gray-200">Ordered Products</th>
                            <th class="px-4 py-3 border-r border-gray-200">Additional Info</th>
                            <th class="px-4 py-3 border-r border-gray-200">Tag</th>
                            <th class="px-4 py-3 border-r border-gray-200">Customer Notes</th>
                            <th class="px-4 py-3 border-r border-gray-200">Status</th>
                            <th class="px-4 py-3 border-r border-gray-200">Followup</th>
                            <th class="px-4 py-3 border-r border-gray-200">Employee</th>
                            <th class="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody id="customers-table-body">
                        <tr>
                            <td colspan="14" class="px-4 py-8 text-center text-gray-500 bg-gray-50/50 text-xs font-medium">No data available in table</td>
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
        <div class="p-6 border-t border-gray-100 bg-white">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <div class="text-xs font-bold text-gray-800 mb-2">0 Selected</div>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium flex items-center transition-colors">
                        <i class="fas fa-check mr-2"></i> Set Followup
                    </button>
                </div>
                <div class="flex items-center">
                    <input type="text" placeholder="Jump to Page" class="border border-gray-200 rounded-l px-3 py-2 text-xs focus:outline-none w-32 h-9">
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-r h-9 transition-colors">
                        <i class="fas fa-check text-xs"></i>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Assign -->
                <div class="space-y-3">
                    <label class="block text-xs font-bold text-gray-800">Assign To*</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-600 focus:outline-none bg-white">
                        <option>Search Employee</option>
                    </select>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors">
                        Assign Selected
                    </button>
                </div>
                <!-- Customer Status -->
                <div class="space-y-3">
                    <label class="block text-xs font-bold text-gray-800">Customer Status</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-600 focus:outline-none bg-white">
                        <option>Select Status</option>
                    </select>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors">
                        Change Status
                    </button>
                </div>
                <!-- Customer Tag -->
                <div class="space-y-3">
                    <label class="block text-xs font-bold text-gray-800">Customer Tag</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-600 focus:outline-none bg-white">
                        <option>Select Tag</option>
                    </select>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors">
                        Change Status
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
`;
