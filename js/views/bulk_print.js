const bulkPrintHTML = `
<div class="space-y-4 pb-10">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Print by Status -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
                <h2 class="text-gray-800 font-medium text-sm">Print by Status</h2>
            </div>
            <div class="p-5 space-y-5">
                <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                    <option>Select Status</option>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Processing</option>
                    <option>Hold</option>
                    <option>In Courier</option>
                    <option>Delivered</option>
                    <option>Completed</option>
                    <option>Canceled</option>
                    <option>Returned</option>
                </select>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-print"></i> Print</button>
            </div>
        </div>

        <!-- Print by Sheet -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
                <h2 class="text-gray-800 font-medium text-sm">Print by Sheet</h2>
            </div>
            <div class="p-5 space-y-5">
                <input type="file" accept=".csv,.xlsx,.xls" class="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded file:border file:border-gray-300 file:text-xs file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer">
                <div class="flex items-center gap-3">
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-print"></i> Print</button>
                    <button class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-download"></i> Example</button>
                </div>
            </div>
        </div>

    </div>

</div>
`;
