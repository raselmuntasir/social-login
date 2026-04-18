const courierPaymentHTML = `
<div class="space-y-4 pb-10">

    <!-- Upload Courier Payment File -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Upload Courier Payment File</h2>
        </div>
        <div class="p-5 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Courier</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Select Courier</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Match By</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Invoice ID</option>
                        <option>Tracking ID</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Select file (.csv/.xlsx)</label>
                    <input type="file" accept=".csv,.xlsx,.xls" class="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded file:border file:border-gray-300 file:text-xs file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer">
                    <p class="text-brand-orange text-[11px] mt-2">Required columns: <strong>Merchant_Order_ID</strong> (or Invoice_ID/Tracking_ID), <strong>Collectable_Amount</strong>, <strong>Courier_Charge</strong>.</p>
                </div>
            </div>

            <div class="flex items-center gap-3 pt-2 border-t border-gray-100">
                <button class="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-upload"></i> Upload & Validate</button>
                <button class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"><i class="fas fa-undo"></i> Reset</button>
            </div>
        </div>
    </div>

</div>
`;
