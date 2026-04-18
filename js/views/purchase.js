const purchaseHTML = `
<div class="space-y-6 pb-10">
    <!-- Filters Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Date Range</label>
                <div class="relative">
                    <button class="w-full bg-purple-700 text-white rounded px-3 py-2 text-sm flex justify-between items-center font-medium">
                        Custom Range <i class="fas fa-chevron-down text-[10px]"></i>
                    </button>
                    <p class="text-[10px] text-gray-500 mt-1">01-04-2026 to 18-04-2026</p>
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Supplier</label>
                <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                    <option>All</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Payment Status</label>
                <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                    <option>All</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Product</label>
                <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-400">
                    <option>Search Product</option>
                </select>
            </div>
        </div>
        <div class="flex gap-2">
            <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-colors">
                <i class="fas fa-undo"></i> Clear Filter
            </button>
            <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-colors">
                <i class="fas fa-download"></i> Export
            </button>
        </div>
    </div>

    <!-- Purchase List Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Purchase List</h2>
            <button class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-colors">
                <i class="fas fa-plus"></i> New Purchase
            </button>
        </div>
        <div class="p-4">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <div class="text-xs text-gray-500">
                    Show 
                    <select class="border border-gray-300 rounded px-1 py-1 mx-1 outline-none">
                        <option>10</option>
                    </select>
                    entries
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Search:</span>
                    <input type="text" class="border border-gray-300 rounded px-3 py-1 text-sm outline-none focus:border-purple-500">
                </div>
            </div>

            <div class="overflow-x-auto border border-gray-100 rounded">
                <table class="w-full text-left text-xs">
                    <thead class="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                        <tr>
                            <th class="px-3 py-3 border-r border-gray-200">ID</th>
                            <th class="px-3 py-3 border-r border-gray-200"><i class="fas fa-sort mr-1 text-gray-300"></i>Date</th>
                            <th class="px-3 py-3 border-r border-gray-200">Invoice</th>
                            <th class="px-3 py-3 border-r border-gray-200">Supplier</th>
                            <th class="px-3 py-3 border-r border-gray-200">Product Amount</th>
                            <th class="px-3 py-3 border-r border-gray-200"><i class="fas fa-sort mr-1 text-gray-300"></i>Other Cost</th>
                            <th class="px-3 py-3 border-r border-gray-200"><i class="fas fa-sort mr-1 text-gray-300"></i>Discount</th>
                            <th class="px-3 py-3 border-r border-gray-200">Grand Total</th>
                            <th class="px-3 py-3 border-r border-gray-200">Note</th>
                            <th class="px-3 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="10" class="px-4 py-8 text-center text-gray-400 italic">No data available in table</td>
                        </tr>
                    </tbody>
                    <tfoot class="bg-gray-50/50 font-bold border-t border-gray-200">
                        <tr>
                            <td colspan="4" class="px-3 py-3 text-right">Total</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td colspan="2"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div class="flex justify-between items-center mt-4">
                <div class="text-xs text-gray-500">Showing 0 to 0 of 0 entries</div>
                <div class="flex border border-gray-200 rounded overflow-hidden">
                    <button class="px-3 py-1.5 text-xs text-gray-400 border-r border-gray-200 hover:bg-gray-50">Previous</button>
                    <button class="px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Payment Histories Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Payment Histories</h2>
            <button class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-colors">
                <i class="fas fa-plus"></i> Add Payment
            </button>
        </div>
        <div class="p-4">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <div class="text-xs text-gray-500">
                    Show 
                    <select class="border border-gray-300 rounded px-1 py-1 mx-1 outline-none">
                        <option>10</option>
                    </select>
                    entries
                </div>
            </div>

            <div class="overflow-x-auto border border-gray-100 rounded">
                <table class="w-full text-left text-xs">
                    <thead class="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                        <tr>
                            <th class="px-3 py-3 border-r border-gray-200">SL</th>
                            <th class="px-3 py-3 border-r border-gray-200"><i class="fas fa-sort mr-1 text-gray-300"></i>Date</th>
                            <th class="px-3 py-3 border-r border-gray-200">Supplier</th>
                            <th class="px-3 py-3 border-r border-gray-200">Amount</th>
                            <th class="px-3 py-3 border-r border-gray-200">Added By</th>
                            <th class="px-3 py-3 border-r border-gray-200">Note</th>
                            <th class="px-3 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7" class="px-4 py-8 text-center text-gray-400 italic">No data available in table</td>
                        </tr>
                    </tbody>
                    <tfoot class="bg-gray-50/50 font-bold border-t border-gray-200">
                        <tr>
                            <td colspan="3" class="px-3 py-3 text-right">Total</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td colspan="3"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div class="flex justify-between items-center mt-4">
                <div class="text-xs text-gray-500">Showing 0 to 0 of 0 entries</div>
                <div class="flex border border-gray-200 rounded overflow-hidden">
                    <button class="px-3 py-1.5 text-xs text-gray-400 border-r border-gray-200 hover:bg-gray-50">Previous</button>
                    <button class="px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;
