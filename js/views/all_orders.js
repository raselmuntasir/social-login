const allOrdersHTML = `
<div class="space-y-4 pb-10">
    <!-- Filtering Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <button class="w-full px-4 py-3 flex justify-between items-center bg-gray-50/50 hover:bg-gray-100/50 transition-colors rounded-lg text-left" onclick="this.nextElementSibling.classList.toggle('hidden');">
            <h2 class="text-gray-800 font-medium text-sm">Filtering</h2>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        </button>
        <div class="hidden p-4 border-t border-gray-100 space-y-6">
            <!-- Search Field -->
            <div class="relative max-w-lg">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" id="filter-search-text" placeholder="Search by Name, Phone, or Order ID..." class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all">
            </div>

            <!-- Row 1: Date filters -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Order Created At</label>
                    <div id="filter-created-at"></div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Courier Submitted At</label>
                    <div id="filter-courier-at"></div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Status Added At</label>
                    <div id="filter-status-at"></div>
                    <p class="text-[10px] text-gray-500 mt-1">NB: Max 90 days</p>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Note Added At</label>
                    <div id="filter-note-at"></div>
                </div>
            </div>

            <!-- Row 2: Employee, Status, Employee Action, Order Source -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Employee</label>
                    <input type="text" placeholder="Search Employee" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 text-gray-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Status</label>
                    <select id="filter-status" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option value="">All Status</option>
                        <option>Pending</option><option>Confirmed</option><option>Processing</option>
                        <option>Hold</option><option>Hold Followup</option><option>In Courier</option>
                        <option>Delivered</option><option>Completed</option><option>Canceled</option>
                        <option>Returned</option><option>Damage</option><option>Others</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Employee Action</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Order Created/Assigned</option>
                        <option>Status Updated</option>
                        <option>Note Added</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Order Source</label>
                    <select id="filter-order-source" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option value="">All Source</option>
                    </select>
                </div>
            </div>

            <!-- Row 3: Order Tag, Courier, Courier Status, Courier Success Rate -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Order Tag</label>
                    <select id="filter-order-tag" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option value="">All Tag</option>
                        <option>No Tag</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Courier</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Courier Status</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Courier Success Rate</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
            </div>

            <!-- Row 4: Courier Charged, Select Product (with Exclude), Product Category, District -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Courier Charged</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-3">
                        Select Product 
                        <span class="flex items-center gap-1 font-normal text-gray-600">
                            <input type="checkbox" class="rounded"> Exclude
                        </span>
                    </label>
                    <input type="text" placeholder="Search Product" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 text-gray-500 mb-1">
                    <div class="flex items-center gap-3 text-[11px] text-gray-600">
                        <label class="flex items-center gap-1"><input type="checkbox" class="rounded"> Include Returns</label>
                        <label class="flex items-center gap-1"><input type="checkbox" class="rounded"> Only These</label>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Product Category</label>
                    <input type="text" placeholder="Search Category" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 text-gray-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">District</label>
                    <select id="filter-order-district" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option value="">All District</option>
                    </select>
                </div>
            </div>

            <!-- Row 5: Payment Status, Website, Print Status, Email Status -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Payment Status</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Website</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Print Status</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Email Status</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Any</option>
                    </select>
                </div>
            </div>

            <!-- Row 6: UTM Source, Product Amount Min, Product Amount Max, Url -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">UTM Source</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option>Any</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Product Amount Min</label>
                    <input type="number" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Product Amount Max</label>
                    <input type="number" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Url</label>
                    <input type="text" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500">
                </div>
            </div>

            <!-- Row 7: Discount Amount -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-1">Discount Amount</label>
                    <div class="flex">
                        <input type="number" class="w-full border border-gray-300 rounded-l px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500">
                        <select class="border border-gray-300 border-l-0 rounded-r px-2 py-1.5 text-xs focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                            <option>Greater Then Equal</option>
                            <option>Less Then Equal</option>
                            <option>Equal</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Filter Action Buttons Row -->
            <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                <button id="btn-apply-filter" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm flex items-center gap-1"><i class="fas fa-filter"></i> Apply Filter</button>
                <button id="btn-clear-filter" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1"><i class="fas fa-times"></i> Clear Filter</button>
                <button class="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1"><i class="fas fa-print"></i> Order Items</button>
                <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1"><i class="fas fa-list"></i> Order Sources</button>
                <button class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1"><i class="fas fa-copy"></i> Duplicate Orders</button>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1"><i class="fas fa-user"></i> Orders Employee</button>
                <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1"><i class="fas fa-history"></i> Order Previous Status</button>
                <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1"><i class="fas fa-map-marker-alt"></i> Orders by Locations</button>
                <button class="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm flex items-center gap-1"><i class="fas fa-list"></i> Courier Statuses</button>
            </div>
        </div>
    </div>

    <!-- Group by Status Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <button class="w-full px-4 py-3 flex items-center bg-gray-50/50 hover:bg-gray-100/50 transition-colors rounded-lg text-left gap-2" onclick="this.nextElementSibling.classList.toggle('hidden');">
            <h2 class="text-gray-800 font-medium text-sm">Group by Status</h2>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        </button>
        <div class="hidden p-4 border-t border-gray-100">
            <div class="flex flex-wrap gap-3">
                <!-- Total / Green Card -->
                <div class="bg-green-600 text-white rounded-lg p-4 min-w-[160px] flex-1 relative overflow-hidden shadow">
                    <i class="fas fa-list text-white/30 text-3xl absolute left-3 top-3"></i>
                    <div class="text-right mt-4">
                        <div class="text-3xl font-bold">0</div>
                        <div class="text-xs text-white/80">(0 Un.)</div>
                        <div class="text-sm font-semibold mt-1">Total</div>
                    </div>
                </div>
                <!-- Return Ratio / Red Card -->
                <div class="bg-red-500 text-white rounded-lg p-4 min-w-[160px] flex-1 relative overflow-hidden shadow">
                    <i class="fas fa-times text-white/30 text-3xl absolute left-3 top-3"></i>
                    <div class="text-right mt-4">
                        <div class="text-3xl font-bold">0%</div>
                        <div class="text-xs text-white/80">Orders: 0</div>
                        <div class="text-sm font-semibold mt-1">Return Ratio</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Order List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg flex justify-between items-center">
            <h2 class="text-gray-800 font-medium text-sm order-list-title">Order List</h2>
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
                    <input type="text" class="border border-gray-300 rounded px-2 py-1 outline-none focus:border-brand-teal w-48">
                </div>
            </div>

            <div class="text-xs text-gray-500 mb-2 all-orders-entry-info">Showing 0 to 0 of 0 entries</div>

            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[11px] whitespace-nowrap">
                    <thead class="bg-gray-50/80 border-b border-gray-200 text-gray-700 font-bold text-[11px] uppercase tracking-wider">
                        <tr>
                            <th class="px-4 py-3 border-r border-gray-200">Status</th>
                            <th class="px-2 py-3 border-r border-gray-200 text-center"><input type="checkbox" id="selectAllOrders" onchange="document.querySelectorAll('.order-row-check').forEach(c=>c.checked=this.checked)"><br>Select</th>
                            <th class="px-4 py-3 border-r border-gray-200">Notes</th>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center justify-between gap-3">Invoice ID <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-200">Name & Number</th>
                            <th class="px-4 py-3 border-r border-gray-200">Date</th>
                            <th class="px-4 py-3 border-r border-gray-200">Address</th>
                            <th class="px-4 py-3 border-r border-gray-200">Courier</th>
                            <th class="px-4 py-3 border-r border-gray-200">Summary</th>
                            <th class="px-4 py-3">Employee</th>
                        </tr>
                    </thead>
                    <tbody id="allOrderTable">
                        <tr>
                            <td colspan="10" class="px-4 py-6 text-center text-red-400 bg-gray-50/50 text-xs">No data available in table</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-between items-center mt-4">
                <div>
                    <div class="text-xs text-gray-500 mb-2 all-orders-entry-info">Showing 0 to 0 of 0 entries</div>
                    <div class="flex items-center text-xs text-gray-600">
                        <span>Show</span>
                        <select class="mx-2 border border-gray-300 rounded px-2 py-1 outline-none focus:border-brand-teal">
                            <option>10</option><option>25</option><option>50</option>
                        </select>
                        <span>entries</span>
                    </div>
                </div>
                <div class="flex">
                    <button class="px-3 py-1.5 border border-gray-300 bg-white text-gray-500 text-xs rounded-l cursor-not-allowed hover:bg-gray-50">Previous</button>
                    <button class="px-3 py-1.5 border border-gray-300 border-l-0 bg-white text-gray-500 text-xs rounded-r cursor-not-allowed hover:bg-gray-50">Next</button>
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
            
            <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Transfer To*</label>
                    <input type="text" placeholder="Search Employee" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-brand-teal text-gray-600 mb-3">
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm">Transfer Selected</button>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Assign Tag*</label>
                    <select id="action-assign-tag" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-brand-teal text-gray-600 bg-white mb-3">
                        <option value="">Select Tag</option>
                    </select>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm">Change Selected</button>
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
            <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
        </button>
        <div class="border-t border-gray-100 overflow-x-auto">
            <table class="w-full text-xs text-left">
                <thead>
                    <tr class="border-b border-gray-200 bg-gray-50/30">
                        <th class="px-4 py-3 font-bold text-gray-800 w-3/4">Type</th>
                        <th class="px-4 py-3 font-bold text-gray-800">Amount</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3">
                            <div class="text-gray-800">Total Sales Product Total(0 Orders) <i class="fas fa-info-circle text-[10px] text-black ml-0.5"></i></div>
                            <div class="flex items-center gap-1 mt-1 text-gray-600"><input type="checkbox" class="rounded"> Include Returns</div>
                        </td>
                        <td class="px-4 py-3 text-gray-700">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 text-green-600 font-medium">Total Shipping Charge Collected from Customer(0 Orders)</td>
                        <td class="px-4 py-3 text-gray-700">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 text-gray-800">Order Total with Collected Shipping Charge(0 Orders)</td>
                        <td class="px-4 py-3 text-gray-700">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 text-brand-orange font-semibold">Courier Charge From API(0 Orders)</td>
                        <td class="px-4 py-3 text-brand-orange font-semibold">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 text-brand-orange font-semibold">Courier Charge Other Expense</td>
                        <td class="px-4 py-3 text-brand-orange font-semibold">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 text-brand-orange font-semibold">Total Courier Charge</td>
                        <td class="px-4 py-3 text-brand-orange font-semibold">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 text-gray-800">After Reducing Courier Charge</td>
                        <td class="px-4 py-3 font-bold text-gray-800">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3">
                            <div class="text-gray-800">Purchase Amount of Sold Items(0 Unit)</div>
                            <div class="text-[10px] text-gray-500 mt-0.5">The cost are calculated from product's average purchase price!</div>
                        </td>
                        <td class="px-4 py-3 text-gray-700">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 font-bold text-gray-800">Sales Profit/Loss(0 Unit)</td>
                        <td class="px-4 py-3 font-bold text-gray-800">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 text-brand-orange">Other Expense</td>
                        <td class="px-4 py-3 text-brand-orange">0.00 Tk</td>
                    </tr>
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 font-bold text-gray-800">Net Income</td>
                        <td class="px-4 py-3 font-bold text-gray-800">0.00 Tk</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>
`;
