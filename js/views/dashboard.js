const dashboardHTML = `
<div class="space-y-6 pb-10">
    <!-- Summary Section -->
    <div class="flex justify-between items-end mb-2">
        <div>
            <h1 class="text-xl md:text-2xl font-normal text-gray-800">Summary</h1>
            <p class="text-xs text-gray-500 mt-1">18-04-2026 to 18-04-2026</p>
        </div>
        <button class="bg-brand-header hover:bg-purple-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center shadow-sm transition-colors">
            Today <i class="fas fa-chevron-down ml-2 text-[10px]"></i>
        </button>
    </div>

    <!-- Stat Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Card 1: Total / Completed (Success/Primary) -->
        <div class="bg-emerald-600 text-white rounded-lg p-4 shadow-sm relative overflow-hidden group">
            <i class="fas fa-check-circle absolute -right-2 -top-2 text-white/10 text-6xl transform -rotate-12 transition-transform group-hover:rotate-0"></i>
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                    <div class="bg-white/20 p-2 rounded-lg">
                        <i class="fas fa-box text-sm"></i>
                    </div>
                    <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Success</span>
                </div>
                <div class="flex justify-between items-end">
                    <div>
                        <div class="text-2xl font-bold leading-none mb-1" id="totalCount">0</div>
                        <div class="text-[11px] text-emerald-100">Total Orders</div>
                    </div>
                    <div class="text-right">
                        <div class="text-xl font-bold leading-none mb-1" id="completedCount">0</div>
                        <div class="text-[11px] text-emerald-100">Completed</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card 2: Pending / Conversion (Processing) -->
        <div class="bg-cyan-600 text-white rounded-lg p-4 shadow-sm relative overflow-hidden group">
            <i class="fas fa-clock absolute -right-2 -top-2 text-white/10 text-6xl transform -rotate-12 transition-transform group-hover:rotate-0"></i>
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                    <div class="bg-white/20 p-2 rounded-lg">
                        <i class="fas fa-hourglass-half text-sm"></i>
                    </div>
                    <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">In Progress</span>
                </div>
                <div class="flex justify-between items-end">
                    <div>
                        <div class="text-2xl font-bold leading-none mb-1" id="pendingCount">0</div>
                        <div class="text-[11px] text-cyan-100">Pending</div>
                    </div>
                    <div class="text-right">
                        <div class="text-xl font-bold leading-none mb-1" id="conversionRate">0%</div>
                        <div class="text-[11px] text-cyan-100">Conversion</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card 3: In Courier / Older (Attention/Amber) -->
        <div class="bg-amber-500 text-white rounded-lg p-4 shadow-sm relative overflow-hidden group">
            <i class="fas fa-shipping-fast absolute -right-2 -top-2 text-white/10 text-6xl transform -rotate-12 transition-transform group-hover:rotate-0"></i>
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                    <div class="bg-white/20 p-2 rounded-lg">
                        <i class="fas fa-truck text-sm"></i>
                    </div>
                    <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">In Transit</span>
                </div>
                <div class="flex justify-between items-end">
                    <div>
                        <div class="text-2xl font-bold leading-none mb-1" id="inCourierCount">0</div>
                        <div class="text-[11px] text-amber-50">In Courier</div>
                    </div>
                    <div class="text-right">
                        <div class="text-xl font-bold leading-none mb-1" id="olderCount">0</div>
                        <div class="text-[11px] text-amber-50">Older</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card 4: Units (Neutral) -->
        <div class="bg-indigo-600 text-white rounded-lg p-4 shadow-sm relative overflow-hidden group">
            <i class="fas fa-layer-group absolute -right-2 -top-2 text-white/10 text-6xl transform -rotate-12 transition-transform group-hover:rotate-0"></i>
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                    <div class="bg-white/20 p-2 rounded-lg">
                        <i class="fas fa-tags text-sm"></i>
                    </div>
                    <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Inventory</span>
                </div>
                <div class="flex justify-between items-end">
                    <div>
                        <div class="text-2xl font-bold leading-none mb-1" id="unitsCount">0</div>
                        <div class="text-[11px] text-indigo-100">Total Units</div>
                    </div>
                    <div class="text-right">
                        <div class="text-xl font-bold leading-none mb-1">0</div>
                        <div class="text-[11px] text-indigo-100">Returned</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card 5: Financials (Premium/Summary) -->
        <div class="bg-slate-800 text-white rounded-lg p-4 shadow-sm relative overflow-hidden group">
            <div class="relative z-10 h-full flex flex-col justify-between">
                <div class="flex justify-between items-start mb-2">
                    <div class="bg-white/10 p-2 rounded-lg">
                        <i class="fas fa-wallet text-sm text-emerald-400"></i>
                    </div>
                    <span class="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Finance</span>
                </div>
                <div class="space-y-1.5 mt-auto">
                    <div class="flex justify-between items-center text-[11px]">
                        <span class="text-slate-400">Sales:</span>
                        <span class="font-bold text-white" id="salesTotal">0৳</span>
                    </div>
                    <div class="flex justify-between items-center text-[11px]">
                        <span class="text-slate-400">Purch.:</span>
                        <span class="font-bold text-white" id="purchaseTotal">0৳</span>
                    </div>
                    <div class="h-px bg-slate-700 my-1"></div>
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Profit</span>
                        <span class="text-lg font-bold text-emerald-400" id="profitTotal">0৳</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Percentage & Source Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Order Status Percentage -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 h-[280px] flex flex-col">
            <div class="p-4 border-b border-gray-100 flex justify-between items-start">
                <div>
                    <h2 class="text-gray-800 font-medium flex items-center text-[13px]">Order Status Percentage <i class="fas fa-info-circle ml-1.5 text-gray-400 text-[10px]"></i></h2>
                    <p class="text-[10px] text-gray-500 mt-1">01-04-2026 to 30-04-2026</p>
                </div>
                <button class="bg-brand-header hover:bg-purple-900 text-white px-3 py-1 rounded-lg text-[11px] font-medium flex items-center transition-colors">
                    This Month <i class="fas fa-chevron-down ml-1.5 text-[9px]"></i>
                </button>
            </div>
            <div class="flex-1 flex flex-col items-center justify-center text-gray-400">
                <div class="bg-gray-50 p-6 rounded-full mb-4">
                    <i class="fas fa-chart-pie text-4xl opacity-20"></i>
                </div>
                <p class="text-sm font-medium">No data yet</p>
                <p class="text-[10px] opacity-60 mt-1">Try changing the date range</p>
            </div>
        </div>

        <!-- Order Source -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 h-[280px] flex flex-col">
            <div class="p-4 border-b border-gray-100 flex justify-between items-start">
                <div>
                    <h2 class="text-gray-800 font-medium flex items-center text-[13px]">Order Source <i class="fas fa-info-circle ml-1.5 text-gray-400 text-[10px]"></i></h2>
                    <p class="text-[10px] text-gray-500 mt-1">01-04-2026 to 30-04-2026</p>
                </div>
                <button class="bg-brand-header hover:bg-purple-900 text-white px-3 py-1 rounded-lg text-[11px] font-medium flex items-center transition-colors">
                    This Month <i class="fas fa-chevron-down ml-1.5 text-[9px]"></i>
                </button>
            </div>
            <div class="flex-1 flex flex-col items-center justify-center text-gray-400">
                <div class="bg-gray-50 p-6 rounded-full mb-4">
                    <i class="fas fa-globe text-4xl opacity-20"></i>
                </div>
                <p class="text-sm font-medium">No sources recorded</p>
                <p class="text-[10px] opacity-60 mt-1">Waiting for incoming orders</p>
            </div>
        </div>
    </div>

    <!-- Order Trend Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 class="text-gray-800 font-medium flex items-center text-[13px]">Order Trend <i class="fas fa-info-circle ml-1.5 text-gray-400 text-[10px]"></i></h2>
            <div class="flex items-center gap-2">
                <select class="border border-gray-300 rounded-full px-4 py-1.5 text-[11px] text-gray-600 focus:outline-none bg-white">
                    <option>Order Trend</option>
                </select>
                <button class="bg-brand-header hover:bg-purple-900 text-white px-4 py-1.5 rounded-full text-[11px] font-medium flex items-center transition-colors">
                    Monthly <i class="fas fa-chevron-down ml-1.5 text-[9px]"></i>
                </button>
            </div>
        </div>
        <div class="p-6 h-[450px] flex">
            <!-- Y-Axis Labels -->
            <div class="flex flex-col justify-between text-[10px] text-gray-400 pr-3 pb-8 text-right w-8">
                <span>1.0</span>
                <span>0.9</span>
                <span>0.8</span>
                <span>0.7</span>
                <span>0.6</span>
                <span>0.5</span>
                <span>0.4</span>
                <span>0.3</span>
                <span>0.2</span>
                <span>0.1</span>
                <span>0</span>
            </div>
            
            <div class="flex-1 flex flex-col relative">
                <!-- Legend -->
                <div class="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-gray-500 z-10">
                    <span class="w-8 h-3 bg-purple-400 rounded-sm"></span>
                    <span>Order Count</span>
                </div>

                <!-- Chart Grid Area -->
                <div class="flex-1 border-l border-b border-gray-200 relative">
                    <!-- Horizontal Grid Lines -->
                    <div class="absolute inset-0 flex flex-col justify-between">
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="border-t border-gray-100 w-full h-0"></div>
                        <div class="h-0"></div>
                    </div>
                    
                    <!-- Vertical Grid Lines -->
                    <div class="absolute inset-0 flex justify-between">
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="border-l border-gray-50 h-full w-0"></div>
                        <div class="h-full w-0"></div>
                    </div>
                </div>

                <!-- X-Axis Labels (Dates) -->
                <div class="flex justify-between mt-2 overflow-visible">
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">19-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">20-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">21-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">22-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">23-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">24-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">25-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">26-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">27-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">28-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">29-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">30-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">31-03-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">01-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">02-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">03-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">04-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">05-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">06-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">07-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">08-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">09-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">10-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">11-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">12-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">13-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">14-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">15-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">16-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">17-04-2026</span></div>
                    <div class="w-0 relative"><span class="absolute whitespace-nowrap text-[9px] text-gray-500 rotate-[-35deg] origin-top-left -left-2">18-04-2026</span></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Order List Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div class="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 class="text-gray-800 font-medium text-[13px]">Recent Order List</h2>
            <button class="bg-brand-header hover:bg-purple-900 text-white px-3 py-1 rounded-lg text-[11px] font-medium transition-colors" onclick="window.location.hash='#/all-orders'">View All</button>
        </div>
        <div class="p-4">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center text-xs text-gray-600">
                    <span>Show</span>
                    <select class="mx-2 border border-gray-300 rounded px-2 py-1 outline-none">
                        <option>10</option>
                    </select>
                    <span>entries</span>
                </div>
                <div class="flex items-center text-xs text-gray-600">
                    <span class="mr-2">Search:</span>
                    <input type="text" class="border border-gray-300 rounded px-2 py-1 outline-none w-48">
                </div>
            </div>

            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[11px] whitespace-nowrap">
                    <thead class="bg-white border-b border-gray-200 text-gray-800 font-bold">
                        <tr>
                            <th class="px-4 py-3 border-r border-gray-200">#</th>
                            <th class="px-4 py-3 border-r border-gray-200">Date</th>
                            <th class="px-4 py-3 border-r border-gray-200">Name & Number</th>
                            <th class="px-4 py-3 border-r border-gray-200">Product Name</th>
                            <th class="px-4 py-3 border-r border-gray-200">Amount</th>
                            <th class="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody id="recentOrdersTable">
                        <tr>
                            <td colspan="6" class="px-4 py-6 text-center text-gray-500 bg-gray-50/50 text-xs">No data available in table</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-between items-center mt-4">
                <div class="text-[10px] text-gray-500">Showing 0 to 0 of 0 entries</div>
                <div class="flex">
                    <button class="px-3 py-1.5 border border-gray-300 bg-white text-gray-400 text-[10px] rounded-l cursor-not-allowed">Previous</button>
                    <button class="px-3 py-1.5 border border-gray-300 border-l-0 bg-white text-gray-400 text-[10px] rounded-r cursor-not-allowed">Next</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Lowest Stock Product Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 class="text-gray-800 font-medium text-[13px]">Lowest Stock Product</h2>
            <button class="bg-brand-header hover:bg-purple-900 text-white px-3 py-1 rounded-lg text-[11px] font-medium transition-colors">View All</button>
        </div>
        <div class="p-4">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center text-xs text-gray-600">
                    <span>Show</span>
                    <select class="mx-2 border border-gray-300 rounded px-2 py-1 outline-none">
                        <option>10</option>
                    </select>
                    <span>entries</span>
                </div>
                <div class="flex items-center text-xs text-gray-600">
                    <span class="mr-2">Search:</span>
                    <input type="text" class="border border-gray-300 rounded px-2 py-1 outline-none w-48">
                </div>
            </div>

            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[11px] whitespace-nowrap">
                    <thead class="bg-white border-b border-gray-200 text-gray-800 font-bold">
                        <tr>
                            <th class="px-4 py-3 border-r border-gray-200">Title</th>
                            <th class="px-4 py-3 border-r border-gray-200">Image</th>
                            <th class="px-4 py-3 border-r border-gray-200">
                                <div class="flex items-center justify-between">Available Stock <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody id="lowestStockTable">
                        <tr>
                            <td colspan="4" class="px-4 py-6 text-center text-gray-500 bg-gray-50/50 text-xs">No data available in table</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-between items-center mt-4">
                <div class="text-[10px] text-gray-500">Showing 0 to 0 of 0 entries</div>
                <div class="flex">
                    <button class="px-3 py-1.5 border border-gray-300 bg-white text-gray-400 text-[10px] rounded-l cursor-not-allowed">Previous</button>
                    <button class="px-3 py-1.5 border border-gray-300 border-l-0 bg-white text-gray-400 text-[10px] rounded-r cursor-not-allowed">Next</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;
