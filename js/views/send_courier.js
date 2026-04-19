const sendCourierHTML = `
<div class="space-y-4 pb-10">

    <!-- Bulk Courier Submission -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Bulk Courier Submission</h2>
        </div>
        <div class="p-6 text-center">
            <p class="text-brand-orange text-sm">Please Setup Courier API</p>
        </div>
    </div>

    <!-- Selected Items -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Selected Items</h2>
        </div>
        <div class="p-4">
            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[11px] whitespace-nowrap">
                    <thead class="bg-white border-b border-gray-200 text-gray-800 font-bold">
                        <tr>
                            <th class="px-4 py-3 border-r border-gray-200">ID</th>
                            <th class="px-4 py-3 border-r border-gray-200">Name</th>
                            <th class="px-4 py-3 border-r border-gray-200">Mobile Number</th>
                            <th class="px-4 py-3 border-r border-gray-200">Address</th>
                            <th class="px-4 py-3 border-r border-gray-200">Status</th>
                            <th class="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody id="sendCourierTable">
                        <tr>
                            <td colspan="6" class="px-4 py-8 text-center text-gray-400 text-xs"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-4 text-xs"><span class="font-bold text-gray-800">Total:</span> <span class="text-blue-600">0</span></div>
        </div>
    </div>

</div>
`;
