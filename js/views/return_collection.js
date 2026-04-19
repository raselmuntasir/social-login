const returnCollectionHTML = `
<div class="space-y-4 pb-10">

    <!-- Top Row: Search by Barcode & By Excel Sheet -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Search by Barcode -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
                <h2 class="text-gray-800 font-medium text-sm">Search by Barcode</h2>
            </div>
            <div class="p-5">
                <input type="text" placeholder="Search by Order ID or Courier Invoice" class="w-full border-2 border-purple-400 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-purple-600 text-gray-600 placeholder-gray-400">
                <p class="text-brand-orange text-[11px] mt-2">Only "In Courier", "Delivered", "Completed" & "Pending Return" Order will be Search!</p>
            </div>
        </div>

        <!-- By Excel Sheet -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
                <h2 class="text-gray-800 font-medium text-sm">By Excel Sheet</h2>
            </div>
            <div class="p-5 space-y-4">
                <div>
                    <label class="block text-sm font-bold text-gray-800 mb-2">Select .xlsx file</label>
                    <input type="file" accept=".xlsx,.xls" class="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded file:border file:border-gray-300 file:text-xs file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-800 mb-2">Filter By</label>
                    <div class="flex items-center gap-4 text-sm text-gray-700">
                        <label class="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="filterBy" value="invoice" checked class="text-purple-600 focus:ring-purple-500"> Invoice ID
                        </label>
                        <label class="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="filterBy" value="courier" class="text-purple-600 focus:ring-purple-500"> Courier Invoice
                        </label>
                    </div>
                </div>
                <div class="flex items-center gap-3 pt-1">
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-upload"></i> Upload</button>
                    <button class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-download"></i> Download Example</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Listed Order -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Listed Order</h2>
        </div>
        <div class="p-4">
            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[11px] whitespace-nowrap">
                    <thead class="bg-white border-b border-gray-200 text-gray-800 font-bold">
                        <tr>
                            <th class="px-4 py-3 border-r border-gray-200">Order ID</th>
                            <th class="px-4 py-3 border-r border-gray-200">Date</th>
                            <th class="px-4 py-3 border-r border-gray-200">Order Info</th>
                            <th class="px-4 py-3 border-r border-gray-200">Staff Notes</th>
                            <th class="px-4 py-3 border-r border-gray-200">Courier</th>
                            <th class="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody id="returnCollectionTable">
                        <tr>
                            <td colspan="6" class="px-4 py-8 text-center text-gray-400 text-xs"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex items-center gap-3 mt-5">
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-undo"></i> Return</button>
                <button class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-times"></i> Damage</button>
            </div>
            <div class="mt-2 text-xs font-bold text-gray-800">Total: 0</div>
        </div>
    </div>

</div>
`;
