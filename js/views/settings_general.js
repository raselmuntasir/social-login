const settingsGeneralHTML = `
<div class="space-y-6 pb-10">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="flex flex-col md:flex-row">
        <!-- Left Sidebar Tabs -->
        <div class="w-full md:w-64 border-r border-gray-100 bg-gray-50/30">
            <nav class="flex flex-col">
                <a href="javascript:void(0)" onclick="switchGeneralTab('general')" id="tab-general" class="px-6 py-4 text-sm font-medium border-b border-gray-100 bg-gray-100/80 text-gray-800 general-tab-link block">General Info</a>
                <a href="javascript:void(0)" onclick="switchGeneralTab('order')" id="tab-order" class="px-6 py-4 text-sm font-medium border-b border-gray-100 text-blue-600 hover:bg-gray-50 transition-colors general-tab-link block">Order</a>
                <a href="javascript:void(0)" onclick="switchGeneralTab('invoice')" id="tab-invoice" class="px-6 py-4 text-sm font-medium border-b border-gray-100 text-blue-600 hover:bg-gray-50 transition-colors general-tab-link block">Invoice</a>
                <a href="javascript:void(0)" onclick="switchGeneralTab('customer')" id="tab-customer" class="px-6 py-4 text-sm font-medium border-b border-gray-100 text-blue-600 hover:bg-gray-50 transition-colors general-tab-link block">Customer</a>
                <a href="javascript:void(0)" onclick="switchGeneralTab('others')" id="tab-others" class="px-6 py-4 text-sm font-medium border-b border-gray-100 text-blue-600 hover:bg-gray-50 transition-colors general-tab-link block">Others</a>
            </nav>
        </div>

        <!-- Right Content Area -->
        <div class="flex-1 p-8">
            <!-- TABS CONTENT INJECTED HERE -->
                ${tabGeneralHTML}
                ${tabOrderHTML}
                ${tabInvoiceHTML}
                ${tabCustomerHTML}
                ${tabOthersHTML}
</div>
        </div>
    </div>

    <!-- Footer Action -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <button class="bg-[#7c14b4] hover:bg-[#6a119a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-sm transition-colors mb-2">Update</button>
        <p class="text-[11px] text-gray-900 font-bold">NB: * marked are required field.</p>
    </div>
</div>
`;
