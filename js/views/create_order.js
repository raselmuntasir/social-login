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
                    <div class="flex group">
                        <input type="text" id="order-mobile" placeholder="017XXXXXXXX" class="flex-1 bg-slate-50 border border-slate-200 border-r-0 rounded-l-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium">
                        <div class="flex items-center">
                            <button class="bg-emerald-500 hover:bg-emerald-600 text-white w-10 h-full flex items-center justify-center transition-colors border-r border-emerald-600/20"><i class="fab fa-whatsapp"></i></button>
                            <button class="bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-full flex items-center justify-center transition-colors border-r border-indigo-700/20"><i class="fas fa-phone-alt"></i></button>
                            <button class="bg-slate-500 hover:bg-slate-600 text-white w-10 h-full flex items-center justify-center transition-colors rounded-r-xl"><i class="fas fa-copy"></i></button>
                        </div>
                    </div>
                    <div id="customer-autofill-badge" class="hidden mt-2 flex items-center gap-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5 w-fit animate-pulse">
                        <i class="fas fa-user-check"></i>
                        <span id="customer-autofill-msg">Returning Customer</span>
                    </div>
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Alternative Number</label>
                    <input type="text" id="order-alternative" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium">
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Name*</label>
                    <input type="text" id="order-name" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium">
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Email</label>
                    <input type="email" id="order-email" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium">
                </div>
            </div>
            
            <!-- Row 2 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="md:col-span-3 space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Address*</label>
                    <input type="text" id="order-address" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium">
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">District</label>
                    <select id="order-district" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700 cursor-pointer">
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
                    <select id="order-source" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-600 cursor-pointer">
                        <option value="">Select Source</option>
                    </select>
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Order Tag</label>
                    <select id="order-tag" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-indigo-600 cursor-pointer">
                        <option value="">Select Tag</option>
                    </select>
                </div>
                <div class="space-y-1.5">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Customer Tag</label>
                    <select id="customer-tag" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-600 cursor-pointer">
                        <option value="">Select Tag</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <!-- Courier Success Rate & Fraud Check (Dynamic) -->
    <div id="fraud-check-section" class="hidden bg-white rounded-2xl shadow-lg border-2 border-indigo-100 mb-6 overflow-hidden transform transition-all hover:scale-[1.01]">
        <div class="px-6 py-4 border-b border-indigo-50 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-between">
            <h2 class="text-white font-bold text-sm flex items-center gap-2">
                <i class="fas fa-shield-alt"></i>
                Advanced Fraud Check & Delivery Analysis
            </h2>
            <span class="text-[10px] font-black text-white/60 uppercase tracking-widest">Real-time Intelligence</span>
        </div>
        <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <!-- Stats Column -->
                <div class="space-y-8">
                    <div class="space-y-3">
                        <div class="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Internal Trust Score</span>
                            <span id="fraud-score-text" class="text-indigo-600">0%</span>
                        </div>
                        <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                            <div id="fraud-score-bar" class="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-1000 shadow-lg" style="width: 0%"></div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-4">
                        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center transition-all hover:bg-white hover:shadow-md">
                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                            <p id="fraud-total" class="text-xl font-black text-slate-700">0</p>
                        </div>
                        <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center transition-all hover:bg-white hover:shadow-md">
                            <p class="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Delivered</p>
                            <p id="fraud-success" class="text-xl font-black text-emerald-700">0</p>
                        </div>
                        <div class="bg-rose-50 p-4 rounded-2xl border border-rose-100 text-center transition-all hover:bg-white hover:shadow-md">
                            <p class="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1">Failed</p>
                            <p id="fraud-failed" class="text-xl font-black text-rose-700">0</p>
                        </div>
                    </div>
                </div>

                <!-- Visualization Column -->
                <div class="flex flex-col items-center justify-center py-4">
                    <div class="relative w-40 h-40 group">
                        <!-- Glow effect -->
                        <div class="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all duration-500"></div>
                        <!-- SVG Circular Chart -->
                        <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90 relative z-10">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" stroke-width="2.5" />
                            <path id="fraud-circle-path" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#gradient-success)" stroke-width="2.5" stroke-dasharray="0, 100" class="transition-all duration-1000 stroke-linecap-round" />
                            <defs>
                                <linearGradient id="gradient-success" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#10b981" />
                                    <stop offset="100%" stop-color="#34d399" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center z-20">
                            <span id="fraud-percent-text" class="text-3xl font-black text-slate-800 tracking-tighter">0%</span>
                            <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Success</span>
                        </div>
                    </div>
                </div>

                <!-- Info Column -->
                <div class="bg-indigo-50/30 rounded-2xl p-6 border border-indigo-100/50 backdrop-blur-sm">
                    <h4 class="text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <i class="fas fa-lightbulb text-amber-500"></i> AI Insights
                    </h4>
                    <div class="space-y-4">
                        <div id="fraud-insight-msg" class="text-[13px] text-slate-600 leading-relaxed font-medium italic">
                            Analyzing customer history... enter a mobile number for real-time risk assessment.
                        </div>
                        <div id="fraud-tag" class="hidden inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                            Safe Customer
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
                        <select id="order-status" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-indigo-600 cursor-pointer">
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
                        <select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700 cursor-pointer">
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
                        <textarea placeholder="Instructions for the courier..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-28 resize-none font-medium"></textarea>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Packing Note</label>
                        <textarea placeholder="Instructions for the warehouse team..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-28 resize-none font-medium"></textarea>
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Order Note</label>
                    <textarea placeholder="General notes about this order..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-28 resize-none font-medium"></textarea>
                </div>
            </div>
        </div>

        <!-- Summary (Side Panel) -->
        <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 sticky top-4 flex flex-col">
                <div class="px-6 py-4 border-b border-slate-100 bg-slate-800 rounded-t-2xl">
                    <h2 class="text-white font-bold text-sm flex items-center gap-2">
                        <i class="fas fa-file-invoice text-indigo-400"></i>
                        Order Summary
                    </h2>
                </div>
                <div class="p-8 space-y-6">
                    <div class="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div class="space-y-1.5">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Date*</label>
                            <input type="text" id="order-date" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700">
                        </div>
                        <div class="space-y-1.5">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference No</label>
                            <input type="text" id="ref-no" placeholder="Optional" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700">
                        </div>
                    </div>
                    
                    <div class="space-y-4 pt-4 border-t border-slate-50">
                        <!-- Subtotal -->
                        <div class="flex justify-between items-center group">
                            <span class="text-[11px] font-black text-slate-500 uppercase tracking-widest">Subtotal</span>
                            <div class="relative w-1/2">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">৳</span>
                                <input type="number" id="subtotal" class="w-full bg-slate-50 border border-transparent rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-black text-slate-700 focus:bg-white focus:border-indigo-100 focus:outline-none transition-all">
                            </div>
                        </div>

                        <!-- Discount -->
                        <div class="flex justify-between items-center group">
                            <span class="text-[11px] font-black text-slate-500 uppercase tracking-widest">Discount/Less*</span>
                            <div class="relative w-1/2">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-400">৳</span>
                                <input type="number" id="discount" class="w-full bg-emerald-50/50 border border-transparent rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-black text-emerald-600 focus:bg-white focus:border-emerald-100 focus:outline-none transition-all" placeholder="0">
                            </div>
                        </div>

                        <div class="flex justify-between items-center py-2 px-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                            <span class="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Net Total</span>
                            <span id="after-discount" class="text-sm font-black text-indigo-700 tracking-tight">৳ 0</span>
                        </div>

                        <!-- Shipping -->
                        <div class="flex justify-between items-center group">
                            <span class="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                Shipping*
                                <div class="group/tip relative">
                                    <i class="fas fa-info-circle text-[10px] text-slate-300"></i>
                                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-slate-800 text-[9px] text-white rounded-lg opacity-0 group-hover/tip:opacity-100 transition-opacity z-[70] shadow-xl pointer-events-none">শিপিং চার্জ বাবদ কাস্টমারের কাছ থেকে নেয়া এমাউন্ট!</span>
                                </div>
                            </span>
                            <div class="relative w-1/2">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">৳</span>
                                <input type="number" id="shipping" class="w-full bg-slate-50 border border-transparent rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-black text-slate-700 focus:bg-white focus:border-indigo-100 focus:outline-none transition-all" placeholder="0">
                            </div>
                        </div>

                        <!-- Grand Total -->
                        <div class="flex justify-between items-center py-4 px-4 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl shadow-slate-200">
                            <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Grand Total</span>
                            <span id="grand-total" class="text-xl font-black text-white tracking-tighter">৳ 0</span>
                        </div>

                        <!-- Advance -->
                        <div class="flex justify-between items-center group pt-2">
                            <span class="text-[11px] font-black text-slate-500 uppercase tracking-widest">Advance Paid</span>
                            <div class="relative w-1/2">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-indigo-400">৳</span>
                                <input type="number" id="advance" class="w-full bg-indigo-50/50 border border-transparent rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-black text-indigo-700 focus:bg-white focus:border-indigo-100 focus:outline-none transition-all" placeholder="0">
                            </div>
                        </div>

                        <!-- Due -->
                        <div class="flex justify-between items-center py-3 px-4 bg-rose-50 rounded-xl border border-rose-100">
                            <span class="text-[10px] font-black text-rose-900 uppercase tracking-widest">Balance Due</span>
                            <span id="due" class="text-lg font-black text-rose-600 tracking-tighter">৳ 0</span>
                        </div>

                        <!-- Courier Charge (Internal) -->
                        <div class="flex justify-between items-center pt-4 opacity-70">
                            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                Courier Cost
                                <div class="group/tip relative">
                                    <i class="fas fa-info-circle text-[9px]"></i>
                                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-slate-800 text-[9px] text-white rounded-lg opacity-0 group-hover/tip:opacity-100 transition-opacity z-[70] shadow-xl pointer-events-none text-center">কুরিয়ার খরচ (শুধুমাত্র ইন্টারনাল ব্যবহারের জন্য)</span>
                                </div>
                            </span>
                            <div class="relative w-1/3">
                                <input type="number" id="courier-charge" class="w-full bg-slate-50 border border-transparent rounded-lg px-3 py-1 text-right text-[12px] font-bold text-slate-500 focus:bg-white focus:border-slate-200 focus:outline-none transition-all" placeholder="0">
                            </div>
                        </div>
                        
                        <div class="text-center pt-4">
                            <button class="text-[11px] text-indigo-600 hover:text-indigo-700 font-black uppercase tracking-widest transition-colors">Apply Coupon Code</button>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-slate-50/50 rounded-b-2xl border-t border-slate-100">
                    <button id="submit-order" class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black py-4 rounded-2xl text-sm uppercase tracking-widest shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                        <i class="fas fa-check-circle text-lg"></i>
                        Confirm & Place Order
                    </button>
                    <p class="text-[9px] text-slate-400 text-center mt-4 font-bold uppercase tracking-tighter">Confirming will save the order and update inventory</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;
