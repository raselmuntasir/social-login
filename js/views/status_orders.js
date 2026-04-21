const statusOrdersHTML = (statusLabel) => `
<div class="space-y-4 pb-10">
    <!-- Filtering Section (collapsed by default) -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Header -->
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer" onclick="const content = this.nextElementSibling; content.classList.toggle('hidden'); this.querySelector('.toggle-icon').classList.toggle('rotate-180');">
            <h2 class="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                <i class="fa-solid fa-filter text-indigo-600"></i> ফিল্টারিং (Filtering)
            </h2>
            <button class="text-gray-400 hover:text-gray-600 transition-all toggle-icon">
                <i class="fa-solid fa-chevron-down"></i>
            </button>
        </div>

        <div class="hidden p-6 space-y-8">
            <!-- Search Field -->
            <div class="relative max-w-lg">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="text" id="filter-search-text" placeholder="Search by Name, Phone, or Order ID..." class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
            </div>

            <!-- Filter Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                <!-- Order Created At -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Order Created At</label>
                    <div id="filter-created-at"></div>
                </div>

                <!-- Courier Submitted At -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier Submitted At</label>
                    <div id="filter-courier-at"></div>
                </div>

                <!-- Status Added At -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Status Added At</label>
                    <div id="filter-status-at"></div>
                    <p class="text-[9px] text-red-500 mt-1"><span class="font-bold text-gray-700">NB:</span> Max 90 days</p>
                </div>

                <!-- Note Added At -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Note Added At</label>
                    <div id="filter-note-at"></div>
                </div>

                <!-- Row 2 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Employee</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white custom-select">
                        <option>All Employee</option>
                        <option>Not Assigned</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Employee Action</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-100 outline-none custom-select bg-white">
                        <option>Order Created/Assigned</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Order Source</label>
                    <select id="filter-order-source" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100 bg-white custom-select">
                        <option value="">All Source</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Order Tag</label>
                    <select id="filter-order-tag" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100 bg-white custom-select">
                        <option value="">All Tag</option>
                        <option>No Tag</option>
                    </select>
                </div>

                <!-- Row 3 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All Courier</option>
                        <option>Steadfast</option>
                        <option>Pathao</option>
                        <option>RedX</option>
                        <option>Paperfly</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier Status</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>In Review</option>
                        <option>Delivered</option>
                        <option>Returned</option>
                        <option>Cancelled</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier Success Rate</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All Rate</option>
                        <option>90% - 100%</option>
                        <option>80% - 90%</option>
                        <option>70% - 80%</option>
                        <option>Below 70%</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier Charged</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All</option>
                        <option>Charged</option>
                        <option>Not Charged</option>
                    </select>
                </div>

                <!-- Row 4 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Product Category</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100 bg-white custom-select">
                        <option>All Category</option>
                        <option>Other</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <div class="flex justify-between items-center">
                        <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Select Product</label>
                        <label class="flex items-center gap-1 text-[10px] text-gray-500">
                            <input type="checkbox" class="rounded"> Exclude
                        </label>
                    </div>
                    <input type="text" placeholder="Search Product" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                    <div class="flex gap-3 mt-1">
                        <label class="flex items-center gap-1 text-[10px] text-gray-500 cursor-pointer">
                            <input type="checkbox" class="rounded"> Include Returns
                        </label>
                        <label class="flex items-center gap-1 text-[10px] text-gray-500 cursor-pointer">
                            <input type="checkbox" class="rounded"> Only These
                        </label>
                    </div>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">District</label>
                    <select id="filter-order-district" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100 bg-white text-gray-700 custom-select">
                        <option value="">All District</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Payment Status</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All</option>
                    </select>
                </div>

                <!-- Row 5 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Website</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Print Status</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Email Status</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>Any</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">UTM Source</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>Any</option>
                    </select>
                </div>

                <!-- Row 6 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Product Amount Min</label>
                    <input type="number" placeholder="Min" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Product Amount Max</label>
                    <input type="number" placeholder="Max" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Url</label>
                    <input type="text" placeholder="https://..." class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Discount Amount</label>
                    <div class="flex">
                        <input type="number" placeholder="0" class="w-full border border-gray-300 rounded-l-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                        <select class="bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg px-2 text-[10px] outline-none">
                            <option>Greater Than Equal</option>
                            <option>Less Than Equal</option>
                            <option>Equal</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                <button id="btn-apply-filter" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-filter"></i> Apply Filter
                </button>
                <button id="btn-clear-filter" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-xmark"></i> Clear Filter
                </button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-list-check"></i> Order Items
                </button>
                <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-layer-group"></i> Order Sources
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-copy"></i> Duplicate Orders
                </button>
                <button class="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-user-tie"></i> Orders Employee
                </button>
                <button class="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-history"></i> Order Previous Status
                </button>
                <button class="bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 border border-orange-200 shadow-sm">
                    <i class="fa-solid fa-location-dot"></i> Orders by Locations
                </button>
                <button class="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-truck-fast"></i> Courier Statuses
                </button>
            </div>
        </div>
    </div>

    <!-- Order List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg flex justify-between items-center">
            <h2 class="text-gray-800 font-medium text-sm status-order-list-title">${statusLabel}</h2>
            <div class="flex">
                <span class="bg-gray-100 border border-gray-200 border-r-0 rounded-l px-3 py-1.5 text-xs text-gray-500 flex items-center">ID</span>
                <input type="text" placeholder="Search by Only ID" class="border border-gray-200 rounded-r px-3 py-1.5 text-xs w-48 focus:outline-none focus:border-brand-teal text-gray-600">
            </div>
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
                    <input type="text" id="statusOrderSearch" oninput="filterStatusTable(this.value)" class="border border-gray-300 rounded px-2 py-1 outline-none focus:border-brand-teal w-48">
                </div>
            </div>
            <div class="text-xs text-gray-500 mb-2 status-entry-info">Showing 0 to 0 of 0 entries</div>
            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[11px] whitespace-nowrap">
                    <thead class="bg-slate-100 text-slate-600 text-[11px] uppercase tracking-wider font-semibold">
                        <tr>
                            <th class="px-6 py-4 border-b border-slate-200 w-16 text-center">
                                <input type="checkbox" id="selectAllStatus" onchange="document.querySelectorAll('.order-id-check').forEach(c=>c.checked=this.checked)" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                                <div class="mt-1">Select</div>
                            </th>
                            <th class="px-6 py-4 border-b border-slate-200">Status & Info</th>
                            <th class="px-6 py-4 border-b border-slate-200">Invoice ID</th>
                            <th class="px-6 py-4 border-b border-slate-200">Customer Details</th>
                            <th class="px-6 py-4 border-b border-slate-200">Date & By</th>
                            <th class="px-6 py-4 border-b border-slate-200">Courier Info</th>
                        </tr>
                    </thead>
                    <tbody id="statusOrderTable">
                        <tr>
                            <td colspan="10" class="px-4 py-6 text-center text-red-400 bg-gray-50/50 text-xs">No data available in table</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-between items-center mt-4">
                <div>
                    <div class="text-xs text-gray-500 mb-2 status-entry-info">Showing 0 to 0 of 0 entries</div>
                    <div class="flex items-center text-xs text-gray-600">
                        <span>Show</span>
                        <select class="mx-2 border border-gray-300 rounded px-2 py-1 outline-none focus:border-brand-teal">
                            <option>10</option><option>25</option><option>50</option>
                        </select>
                        <span>entries</span>
                    </div>
                </div>
                <div class="flex">
                    <button class="px-3 py-1.5 border border-gray-300 bg-white text-gray-500 text-xs rounded-l cursor-not-allowed">Previous</button>
                    <button class="px-3 py-1.5 border border-gray-300 border-l-0 bg-white text-gray-500 text-xs rounded-r cursor-not-allowed">Next</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Action & Summary Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Action Card -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
            <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
                <h2 class="text-gray-800 font-medium text-sm">Action</h2>
            </div>
            <div class="p-4 flex flex-wrap gap-2 border-b border-gray-100">
                <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-print mr-1"></i> Print Selected</button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-barcode mr-1"></i> Print Barcode</button>
                <button class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-print mr-1"></i> Print Info</button>
                <button class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-print mr-1"></i> Print Info 2</button>
                <button class="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-download mr-1"></i> Export</button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-check mr-1"></i> Update Courier Status</button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-check mr-1"></i> Set Followup</button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-exchange-alt mr-1"></i> Transfer Selected</button>
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-times mr-1"></i> Courier Unlink</button>
            </div>
            <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Transfer To*</label>
                    <input type="text" placeholder="Search Employee" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-brand-teal text-gray-600 mb-3">
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-full text-xs font-medium shadow-sm">Transfer Selected</button>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Change Status*</label>
                    <select id="action-change-status" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-brand-teal text-gray-600 bg-white mb-3">
                        <option value="">Select Status</option>
                        <option>Pending</option><option>Confirmed</option><option>Processing</option>
                        <option>Hold</option><option>In Courier</option><option>Delivered</option>
                        <option>Completed</option><option>Canceled</option><option>Returned</option>
                    </select>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-full text-xs font-medium shadow-sm">Change Selected</button>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Assign Tag*</label>
                    <select id="action-assign-tag" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-brand-teal text-gray-600 bg-white mb-3">
                        <option value="">Select Tag</option>
                    </select>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-full text-xs font-medium shadow-sm">Change Selected</button>
                </div>
            </div>
        </div>

        <!-- Summary Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
            <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
                <h2 class="text-gray-800 font-medium text-sm">Summary</h2>
            </div>
            <div class="p-4 space-y-2">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Product Total: <i class="fas fa-info-circle text-[10px] ml-0.5 text-black"></i></span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Total Shipping:</span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Discount:</span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Grand Total: <i class="fas fa-info-circle text-[10px] ml-0.5 text-black"></i></span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Paid:</span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs pb-2 border-b border-gray-100">
                    <span class="font-bold text-gray-800">Due:</span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs pt-1">
                    <span class="font-bold text-brand-orange">Return/Damage:</span>
                    <span class="text-brand-orange">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-brand-orange">Return Discount: <i class="fas fa-info-circle text-[10px] ml-0.5"></i></span>
                    <span class="text-brand-orange">0.00 Tk</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Sales Summary -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <button class="w-full px-4 py-3 flex items-center gap-2 bg-gray-50/50 hover:bg-gray-100/50 transition-colors rounded-lg text-left" onclick="this.nextElementSibling.classList.toggle('hidden');">
            <h2 class="text-gray-800 font-medium text-sm">Sales Summary</h2>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        </button>
        <div class="hidden border-t border-gray-100 overflow-x-auto">
            <table class="w-full text-xs text-left">
                <thead>
                    <tr class="border-b border-gray-200 bg-gray-50/30">
                        <th class="px-4 py-3 font-bold text-gray-800 w-3/4">Type</th>
                        <th class="px-4 py-3 font-bold text-gray-800">Amount</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr><td class="px-4 py-3 text-gray-800">Total Sales Product Total(0 Orders) <i class="fas fa-info-circle text-[10px] text-black ml-0.5"></i></td><td class="px-4 py-3 text-gray-700">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-green-600 font-medium">Total Shipping Charge Collected from Customer(0 Orders)</td><td class="px-4 py-3 text-gray-700">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-gray-800">Order Total with Collected Shipping Charge(0 Orders)</td><td class="px-4 py-3 text-gray-700">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-brand-orange font-semibold">Courier Charge From API(0 Orders)</td><td class="px-4 py-3 text-brand-orange font-semibold">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-brand-orange font-semibold">Courier Charge Other Expense</td><td class="px-4 py-3 text-brand-orange font-semibold">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-brand-orange font-semibold">Total Courier Charge</td><td class="px-4 py-3 text-brand-orange font-semibold">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-gray-800">After Reducing Courier Charge</td><td class="px-4 py-3 font-bold text-gray-800">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-gray-800">Purchase Amount of Sold Items(0 Unit)<br><span class="text-[10px] text-gray-500">The cost are calculated from product's average purchase price!</span></td><td class="px-4 py-3 text-gray-700">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 font-bold text-gray-800">Sales Profit/Loss(0 Unit)</td><td class="px-4 py-3 font-bold text-gray-800">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-brand-orange">Other Expense</td><td class="px-4 py-3 text-brand-orange">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 font-bold text-gray-800">Net Income</td><td class="px-4 py-3 font-bold text-gray-800">0.00 Tk</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
`;

// Client-side search filter for status orders table
function filterStatusTable(query) {
    const rows = document.querySelectorAll('#statusOrderTable tr');
    const q = query.toLowerCase();
    rows.forEach(row => {
        row.style.display = (row.textContent.toLowerCase().includes(q)) ? '' : 'none';
    });
}
