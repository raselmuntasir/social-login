const paymentsHTML = `
<div class="space-y-4 pb-10">

    <!-- Filter -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Filter</h2>
        </div>
        <div class="p-5 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Payment Date</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-purple-700 text-white font-medium">
                        <option>Last 30 Days</option>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>All Time</option>
                    </select>
                    <p class="text-[10px] text-gray-500 mt-1">20-03-2026 to 18-04-2026</p>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Payment Method</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Cash on Delivery</option>
                        <option>bKash</option>
                        <option>Nagad</option>
                        <option>Bank Transfer</option>
                        <option>Online Payment</option>
                    </select>
                </div>
            </div>
            <div class="pt-2">
                <button class="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-times"></i> Clear Filter</button>
            </div>
        </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Payments</h2>
        </div>
        <div class="p-4">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center text-xs text-gray-600">
                    <span>Show</span>
                    <select class="mx-2 border border-gray-300 rounded px-2 py-1 outline-none focus:border-brand-teal">
                        <option>10</option><option>25</option><option>50</option><option>100</option>
                    </select>
                    <span>entries</span>
                </div>
                <div class="flex items-center text-xs text-gray-600">
                    <span class="mr-2">Search:</span>
                    <input type="text" class="border border-gray-300 rounded px-2 py-1 outline-none focus:border-brand-teal w-48">
                </div>
            </div>

            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[11px] whitespace-nowrap">
                    <thead class="bg-white border-b border-gray-200 text-gray-800 font-bold">
                        <tr>
                            <th class="px-4 py-3 border-r border-gray-200">ID</th>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center gap-2">Date <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">Order Info</th>
                            <th class="px-4 py-3 border-r border-gray-200">Amount</th>
                            <th class="px-4 py-3 border-r border-gray-200">Method</th>
                            <th class="px-4 py-3 border-r border-gray-200">Added By</th>
                            <th class="px-4 py-3 border-r border-gray-200">Status</th>
                            <th class="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody id="paymentsTable">
                        <tr>
                            <td colspan="8" class="px-4 py-6 text-center text-red-400 bg-gray-50/50 text-xs">No data available in table</td>
                        </tr>
                    </tbody>
                    <tfoot class="border-t border-gray-200">
                        <tr>
                            <td class="px-4 py-3"></td>
                            <td class="px-4 py-3"></td>
                            <td class="px-4 py-3 text-right text-xs font-bold text-gray-800">Total:</td>
                            <td class="px-4 py-3 text-xs font-bold text-gray-800">0.00 Tk</td>
                            <td class="px-4 py-3"></td>
                            <td class="px-4 py-3"></td>
                            <td class="px-4 py-3"></td>
                            <td class="px-4 py-3"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="flex justify-between items-center mt-4">
                <div class="text-xs text-brand-orange">Showing 0 to 0 of 0 entries</div>
                <div class="flex">
                    <button class="px-3 py-1.5 border border-gray-300 bg-white text-gray-500 text-xs rounded-l cursor-not-allowed">Previous</button>
                    <button class="px-3 py-1.5 border border-gray-300 border-l-0 bg-white text-gray-500 text-xs rounded-r cursor-not-allowed">Next</button>
                </div>
            </div>
        </div>
    </div>

</div>
`;
