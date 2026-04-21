const createOrderHTML = `
<div class="space-y-6 pb-20">
    <!-- Customer Information Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
        <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h2 class="text-slate-800 font-bold text-sm flex items-center gap-2">
                <i class="fas fa-user-circle text-indigo-500"></i>
                Customer Information
            </h2>
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 1 of 3</span>
        </div>
        <div class="p-6 space-y-6">
            <!-- Row 1 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Mobile Number*</label>
                    <div class="flex group shadow-sm rounded-xl">
                        <input type="text" id="order-mobile" placeholder="017XXXXXXXX" class="flex-1 w-full min-w-0 bg-white border-2 border-slate-300 border-r-0 rounded-l-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700">
                        <div class="flex items-stretch shrink-0">
                            <button class="bg-emerald-500 hover:bg-emerald-600 text-white w-10 flex items-center justify-center transition-colors border-r border-emerald-600/20 shrink-0" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
                            <button class="bg-indigo-600 hover:bg-indigo-700 text-white w-10 flex items-center justify-center transition-colors border-r border-indigo-700/20 shrink-0" title="Call"><i class="fas fa-phone-alt"></i></button>
                            <button class="bg-sky-500 hover:bg-sky-600 text-white w-10 flex items-center justify-center transition-colors rounded-r-xl shrink-0" title="Copy Number" onclick="navigator.clipboard.writeText(document.getElementById('order-mobile').value); alert('Copied!');"><i class="fas fa-copy"></i></button>
                        </div>
                    </div>
                    <div id="customer-autofill-badge" class="hidden mt-2 flex items-center gap-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5 w-fit animate-pulse">
                        <i class="fas fa-user-check"></i>
                        <span id="customer-autofill-msg">Returning Customer</span>
                    </div>
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Alternative Number</label>
                    <div class="flex group shadow-sm rounded-xl">
                        <input type="text" id="order-alternative" placeholder="Alternative Number" class="flex-1 w-full min-w-0 bg-white border-2 border-slate-300 border-r-0 rounded-l-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700">
                        <div class="flex items-stretch shrink-0">
                            <button class="bg-sky-500 hover:bg-sky-600 text-white w-10 flex items-center justify-center transition-colors rounded-r-xl shrink-0" title="Copy Number" onclick="navigator.clipboard.writeText(document.getElementById('order-alternative').value); alert('Copied!');"><i class="fas fa-copy"></i></button>
                        </div>
                    </div>
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Name*</label>
                    <input type="text" id="order-name" placeholder="Customer Name" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700">
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Email</label>
                    <input type="email" id="order-email" placeholder="Customer Email" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700">
                </div>
            </div>
            
            <!-- Row 2 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="md:col-span-3 space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Address*</label>
                    <input type="text" id="order-address" placeholder="Full Address" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700">
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">District</label>
                    <select id="order-district" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700 cursor-pointer">
                        <option value="">Select District</option>
                    </select>
                </div>
            </div>

            <!-- Row 3: Stats & Source -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div class="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-sm group">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-500 transition-colors">Total Orders</label>
                    <input type="text" id="cust-total-orders" value="0" readonly class="w-full bg-transparent text-lg font-black text-slate-700 cursor-default focus:outline-none">
                </div>
                <div class="space-y-1.5 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 transition-all hover:bg-white hover:shadow-sm group">
                    <label class="block text-[10px] font-black text-emerald-600/60 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Success Rates</label>
                    <input type="text" id="cust-completed-orders" value="0" readonly class="w-full bg-transparent text-lg font-black text-emerald-700 cursor-default focus:outline-none">
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Order Source</label>
                    <select id="order-source" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700 cursor-pointer">
                        <option value="">Select Source</option>
                    </select>
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Order Tag</label>
                    <select id="order-tag" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-indigo-600 cursor-pointer">
                        <option value="">Select Tag</option>
                    </select>
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Customer Tag</label>
                    <select id="customer-tag" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700 cursor-pointer">
                        <option value="">Select Tag</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <!-- Courier Success Rate & Fraud Check (Dynamic) -->
    <div id="fraud-check-section" class="hidden bg-white rounded-2xl shadow-sm border border-slate-200 mb-6 overflow-hidden transition-all hover:shadow-md">
        <div class="p-6 lg:p-8">
            <!-- HEADER -->
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 border border-emerald-100 text-emerald-500 shadow-sm">
                        <i class="fas fa-shield-alt text-lg"></i>
                    </div>
                    <div>
                        <h2 class="text-slate-800 font-bold text-lg tracking-tight">Courier Success Rate</h2>
                        <p class="text-xs text-slate-500 mt-0.5">Delivery performance by courier partner</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm">
                    <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">LIVE</span>
                </div>
            </div>

            <!-- MAIN GRID -->
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- TABLE SECTION -->
                <div class="flex-1 flex flex-col gap-3">
                    <!-- Column Headers -->
                    <div class="flex items-center px-5 pb-1">
                        <span class="w-32 text-[10px] font-black text-slate-400 uppercase tracking-widest">Courier</span>
                        <span class="flex-1 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Score & Stats</span>
                    </div>
                    
                    <!-- Dynamic Rows Container -->
                    <div id="courier-rows-container" class="space-y-3">
                        <!-- Rows injected here by app.js -->
                    </div>

                    <!-- NOTE -->
                    <div class="mt-2 bg-amber-50/30 border border-amber-100 rounded-xl p-3 flex items-start gap-2 shadow-sm">
                        <i class="fas fa-info-circle text-amber-500 mt-0.5 text-sm"></i>
                        <p class="text-[11px] text-slate-600 font-medium">
                            <span class="text-amber-600 font-bold">NB:</span> Top One (Shop History) এর হিসাব টোটাল এ যোগ হবে না।
                        </p>
                    </div>
                </div>

                <!-- DONUT SECTION -->
                <div class="flex flex-row lg:flex-col items-center justify-center gap-6 lg:gap-8 lg:w-48 lg:border-l lg:border-slate-100 lg:pl-8">
                    
                    <!-- BizMation Donut -->
                    <div class="flex flex-col items-center gap-3">
                        <div class="relative w-28 h-28 drop-shadow-sm">
                            <svg viewBox="0 0 130 130" class="transform -rotate-90">
                                <circle cx="65" cy="65" r="52" fill="none" stroke="#f1f5f9" stroke-width="12"/>
                                <circle cx="65" cy="65" r="52" fill="none" stroke="#10b981" stroke-width="12" stroke-dasharray="326.7" stroke-dashoffset="326.7" stroke-linecap="round" id="biz-arc" class="transition-all duration-1000 ease-out"/>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span id="biz-percent" class="text-2xl font-black text-slate-800 tracking-tighter">0%</span>
                            </div>
                        </div>
                        <div class="text-center">
                            <p class="font-bold text-slate-700 text-[13px]">Top One</p>
                            <div class="mt-1 flex items-center justify-center gap-2 text-[10px] font-bold">
                                <span class="text-slate-400">T: <span id="biz-total" class="text-slate-600">0</span></span>
                                <span class="text-emerald-400">S: <span id="biz-success" class="text-emerald-600">0</span></span>
                                <span class="text-rose-400">F: <span id="biz-failed" class="text-rose-600">0</span></span>
                            </div>
                        </div>
                    </div>

                    <!-- Divider Mobile -->
                    <div class="lg:hidden w-px h-16 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

                    <!-- All Donut -->
                    <div class="flex flex-col items-center gap-3">
                        <div class="relative w-28 h-28 drop-shadow-sm">
                            <svg viewBox="0 0 130 130" class="transform -rotate-90">
                                <circle cx="65" cy="65" r="52" fill="none" stroke="#f1f5f9" stroke-width="12"/>
                                <circle cx="65" cy="65" r="52" fill="none" stroke="#6366f1" stroke-width="12" stroke-dasharray="326.7" stroke-dashoffset="326.7" stroke-linecap="round" id="all-arc" class="transition-all duration-1000 ease-out"/>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span id="all-percent" class="text-2xl font-black text-slate-800 tracking-tighter">0%</span>
                            </div>
                        </div>
                        <div class="text-center">
                            <p class="font-bold text-slate-700 text-[13px]">All External</p>
                            <div class="mt-1 flex items-center justify-center gap-2 text-[10px] font-bold">
                                <span class="text-slate-400">T: <span id="all-total" class="text-slate-600">0</span></span>
                                <span class="text-emerald-400">S: <span id="all-success" class="text-emerald-600">0</span></span>
                                <span class="text-rose-400">F: <span id="all-failed" class="text-rose-600">0</span></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Order Details Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Listed Products -->
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h2 class="text-slate-800 font-bold text-sm flex items-center gap-2">
                        <i class="fas fa-box-open text-indigo-500"></i>
                        Listed Products
                    </h2>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 2 of 3</span>
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-8 max-w-2xl">
                        <label class="text-[11px] font-black text-slate-500 uppercase tracking-wider w-32 shrink-0">Select Product</label>
                        
                        <!-- Custom Searchable Dropdown -->
                        <div class="flex-1 relative" id="product-search-container">
                            <div class="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center cursor-pointer hover:border-indigo-400 hover:bg-white hover:shadow-sm transition-all group" id="product-search-box">
                                <i class="fas fa-search text-slate-400 pl-4 text-xs group-hover:text-indigo-500 transition-colors"></i>
                                <input type="text" id="product-search-input" placeholder="Search products by name or code..." class="w-full px-3 py-2.5 text-sm focus:outline-none placeholder-slate-400 font-bold bg-transparent" autocomplete="off">
                                <i class="fas fa-chevron-down text-slate-300 pr-4 text-[10px] group-hover:text-indigo-400 transition-colors"></i>
                            </div>
                            
                            <!-- Dropdown List -->
                            <div id="product-dropdown-list" class="absolute w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl hidden max-h-72 overflow-y-auto z-[60] py-2 backdrop-blur-xl">
                                <div class="p-6 text-center text-xs text-slate-400 italic font-medium">Type to search available inventory...</div>
                            </div>
                        </div>

                        <a href="#/create-product" class="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-all shadow-indigo-200 shadow-lg shrink-0 group">
                            <i class="fas fa-plus group-hover:rotate-90 transition-transform"></i>
                        </a>
                    </div>
                    
                    <div class="overflow-hidden border border-slate-100 rounded-2xl shadow-inner">
                        <table class="w-full text-left text-[13px] whitespace-nowrap bg-slate-50/30">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-100">
                                    <th class="py-4 px-6 font-black text-[10px] text-slate-400 uppercase tracking-widest">Product Information</th>
                                    <th class="py-4 px-4 font-black text-[10px] text-slate-400 uppercase tracking-widest text-center">Color</th>
                                    <th class="py-4 px-4 font-black text-[10px] text-slate-400 uppercase tracking-widest text-center">Price</th>
                                    <th class="py-4 px-4 font-black text-[10px] text-slate-400 uppercase tracking-widest text-center w-32">Qty</th>
                                    <th class="py-4 px-4 font-black text-[10px] text-slate-400 uppercase tracking-widest text-center">Discount</th>
                                    <th class="py-4 px-6 font-black text-[10px] text-slate-400 uppercase tracking-widest text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody id="selected-products-body" class="divide-y divide-slate-100">
                                <!-- Products added here dynamically -->
                                <tr id="empty-product-row">
                                    <td colspan="6" class="py-12 text-center">
                                        <div class="flex flex-col items-center gap-2">
                                            <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-1">
                                                <i class="fas fa-shopping-cart text-slate-200"></i>
                                            </div>
                                            <p class="text-slate-300 italic font-medium">Your order basket is currently empty</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Additional Fields -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="space-y-2">
                        <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Order Status*</label>
                        <select id="order-status" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-indigo-600 cursor-pointer">
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Courier">In Courier</option>
                            <option value="Hold">Hold</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Hand Delivery">Hand Delivery</option>
                            <option value="Hand Delivery Completed">Hand Delivery Completed</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Payment Method*</label>
                        <select class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700 cursor-pointer">
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Attachments</label>
                        <div class="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1 px-3 border-dashed">
                            <label class="bg-white hover:bg-slate-100 border border-slate-200 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg cursor-pointer transition-all shadow-sm active:scale-95 text-slate-600">
                                Browse
                                <input type="file" class="hidden">
                            </label>
                            <span class="text-[10px] text-slate-400 font-bold">No file chosen</span>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-2">
                        <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Courier Note</label>
                        <textarea placeholder="Instructions for the courier..." class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-28 resize-none font-bold text-slate-700"></textarea>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Packing Note</label>
                        <textarea placeholder="Instructions for the warehouse team..." class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-28 resize-none font-bold text-slate-700"></textarea>
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Order Note</label>
                    <textarea placeholder="General notes about this order..." class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-28 resize-none font-bold text-slate-700"></textarea>
                </div>
            </div>
        </div>

        <!-- Summary (Side Panel) -->
        <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 sticky top-4 flex flex-col">
                <div class="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between rounded-t-2xl">
                    <h2 class="text-slate-800 font-bold text-sm flex items-center gap-2">
                        <i class="fas fa-receipt text-indigo-500"></i>
                        Order Summary
                    </h2>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 3 of 3</span>
                </div>
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Order Date*</label>
                            <input type="text" id="order-date" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700">
                        </div>
                        <div class="space-y-1.5">
                            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Reference No</label>
                            <input type="text" id="ref-no" placeholder="Optional" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700">
                        </div>
                    </div>
                    
                    <div class="space-y-4 pt-2">
                        <!-- Subtotal -->
                        <div class="flex justify-between items-center">
                            <span class="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Subtotal</span>
                            <div class="relative w-1/2">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">৳</span>
                                <input type="number" id="subtotal" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="0">
                            </div>
                        </div>

                        <!-- Discount -->
                        <div class="flex justify-between items-center">
                            <span class="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">Discount/Less*</span>
                            <div class="relative w-1/2">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-500">৳</span>
                                <input type="number" id="discount" class="w-full bg-white border-2 border-emerald-300 shadow-sm rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-bold text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="0">
                            </div>
                        </div>

                        <div class="flex justify-between items-center py-2 border-b border-dashed border-slate-200">
                            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Net Total</span>
                            <span id="after-discount" class="text-sm font-bold text-slate-700">৳ 0</span>
                        </div>

                        <!-- Shipping -->
                        <div class="flex justify-between items-center pt-2">
                            <span class="text-[11px] font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                                Shipping*
                                <div class="group/tip relative">
                                    <i class="fas fa-info-circle text-[10px] text-slate-400"></i>
                                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-slate-800 text-[9px] text-white rounded-lg opacity-0 group-hover/tip:opacity-100 transition-opacity z-[70] shadow-xl pointer-events-none text-center leading-relaxed">শিপিং চার্জ বাবদ কাস্টমারের কাছ থেকে নেয়া এমাউন্ট!</span>
                                </div>
                            </span>
                            <div class="relative w-1/2">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">৳</span>
                                <input type="number" id="shipping" class="w-full bg-white border-2 border-slate-300 shadow-sm rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="0">
                            </div>
                        </div>

                        <!-- Grand Total -->
                        <div class="flex justify-between items-center py-4 my-2 border-y border-slate-200 bg-slate-50/50 px-3 rounded-lg">
                            <span class="text-[13px] font-black text-slate-800 uppercase tracking-widest">Grand Total</span>
                            <span id="grand-total" class="text-xl font-black text-indigo-600 tracking-tighter">৳ 0</span>
                        </div>

                        <!-- Advance -->
                        <div class="flex justify-between items-center">
                            <span class="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">Advance Paid</span>
                            <div class="relative w-1/2">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-indigo-400">৳</span>
                                <input type="number" id="advance" class="w-full bg-white border-2 border-indigo-200 shadow-sm rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-bold text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="0">
                            </div>
                        </div>

                        <!-- Due -->
                        <div class="flex justify-between items-center py-3">
                            <span class="text-[12px] font-black text-rose-600 uppercase tracking-widest">Balance Due</span>
                            <span id="due" class="text-xl font-black text-rose-600 tracking-tighter">৳ 0</span>
                        </div>

                        <!-- Courier Charge (Internal) -->
                        <div class="flex justify-between items-center pt-4 border-t border-slate-100">
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                Courier Cost
                                <div class="group/tip relative">
                                    <i class="fas fa-info-circle text-[9px]"></i>
                                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-slate-800 text-[9px] text-white rounded-lg opacity-0 group-hover/tip:opacity-100 transition-opacity z-[70] shadow-xl pointer-events-none text-center leading-relaxed">কুরিয়ার খরচ (শুধুমাত্র ইন্টারনাল ব্যবহারের জন্য)</span>
                                </div>
                            </span>
                            <div class="relative w-1/3">
                                <input type="number" id="courier-charge" class="w-full bg-white border-2 border-slate-200 shadow-sm rounded-lg px-3 py-1 text-right text-xs font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500/20 focus:border-slate-400 transition-all" placeholder="0">
                            </div>
                        </div>
                        
                        <div class="text-center pt-2">
                            <button class="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold uppercase tracking-wider transition-colors underline decoration-indigo-200 underline-offset-4">Apply Coupon Code</button>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-slate-50/50 rounded-b-2xl border-t border-slate-100 mt-auto">
                    <button id="submit-order" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3.5 rounded-xl text-sm uppercase tracking-widest shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        <i class="fas fa-check-circle"></i>
                        Confirm & Place Order
                    </button>
                    <p class="text-[9px] text-slate-400 text-center mt-3 font-bold uppercase tracking-tighter">Confirming will save the order and update inventory</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;
