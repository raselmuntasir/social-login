const suppliersHTML = `
<div class="space-y-6 pb-10">
    <!-- Suppliers List Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Suppliers list</h2>
            <button class="bg-purple-700 hover:bg-purple-800 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors">
                <i class="fas fa-plus"></i> Create new
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
                    <thead class="bg-white text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                            <th class="px-3 py-3 border-r border-gray-200">SL <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200">Name <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200">Mobile Number <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200">Previous Due <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200">Total Purchase <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200">Total Paid <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200">Total Return <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200">Total Payable/Advance <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 text-right">Action <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="9" class="px-4 py-8 text-center text-gray-400 italic">No data available in table</td>
                        </tr>
                    </tbody>
                    <tfoot class="bg-white font-bold border-t border-gray-200">
                        <tr>
                            <td colspan="3" class="px-3 py-3 text-right">Total</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td class="px-3 py-3">0.00 Tk</td>
                            <td></td>
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
