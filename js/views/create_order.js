const createOrderHTML = `
<div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
        <h2 class="text-gray-800 font-medium text-sm">Customer Information</h2>
    </div>
    <div class="p-4 space-y-4">
        <!-- Row 1 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Mobile Number*</label>
                <div class="flex">
                    <input type="text" id="order-mobile" class="w-full border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500">
                    <button class="bg-teal-500 hover:bg-teal-600 text-white px-2 py-1.5 transition-colors"><i class="fab fa-whatsapp"></i></button>
                    <button class="bg-purple-700 hover:bg-purple-800 text-white px-2 py-1.5 transition-colors"><i class="fas fa-phone-alt"></i></button>
                    <button class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1.5 rounded-r transition-colors"><i class="fas fa-copy"></i></button>
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Alternative Number</label>
                <input type="text" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500">
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Name*</label>
                <input type="text" id="order-name" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500">
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input type="email" id="order-email" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500">
            </div>
        </div>
        
        <!-- Row 2 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="md:col-span-3">
                <label class="block text-xs font-bold text-gray-700 mb-1">Address*</label>
                <input type="text" id="order-address" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500">
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">District</label>
                <select id="order-district" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-700">
                    <option value="">Select District</option>
                </select>
            </div>
        </div>

        <!-- Row 3 -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Total Orders</label>
                <input type="text" value="0" readonly class="w-full border border-gray-200 bg-gray-100 rounded px-3 py-1.5 text-sm text-gray-500 cursor-not-allowed">
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Completed/Delivered</label>
                <input type="text" value="0" readonly class="w-full border border-gray-200 bg-gray-100 rounded px-3 py-1.5 text-sm text-gray-500 cursor-not-allowed">
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Order Source</label>
                <select id="order-source" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-500">
                    <option value="">Select Order Source</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Mobile Call">Mobile Call</option>
                    <option value="Messenger">Messenger</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="FB Group">FB Group</option>
                    <option value="Bulk SMS">Bulk SMS</option>
                    <option value="Failed Orders">Failed Orders</option>
                    <option value="Wordpress Website">Wordpress Website</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Order Tag</label>
                <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500 bg-white">
                    <option value="">Select Order Tag</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High Value">High Value</option>
                    <option value="Fragile">Fragile</option>
                    <option value="Pre-order">Pre-order</option>
                    <option value="Gift">Gift</option>
                    <option value="COD Verified">COD Verified</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Customer Tag</label>
                <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-500">
                    <option value="">Select Tag</option>
                    <option value="New Customer">New Customer</option>
                    <option value="VIP Customer">VIP Customer</option>
                    <option value="Repeat Buyer">Repeat Buyer</option>
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Blacklisted">Blacklisted</option>
                    <option value="Influencer">Influencer</option>
                </select>
            </div>
        </div>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
    <!-- Listed Products -->
    <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Listed Products</h2>
        </div>
        <div class="p-4 border-b border-gray-100">
            <div class="flex items-center gap-2 mb-6 max-w-lg mx-auto lg:mx-0 relative z-50">
                <label class="text-sm font-bold text-gray-700 w-28 text-right shrink-0">Select Product</label>
                
                <!-- Custom Searchable Dropdown -->
                <div class="flex-1 relative" id="product-search-container">
                    <div class="border border-gray-400 rounded overflow-hidden flex items-center bg-white cursor-pointer hover:border-purple-500 transition-colors" id="product-search-box">
                        <input type="text" id="product-search-input" placeholder="Search Product" class="w-full px-3 py-1.5 text-sm focus:outline-none placeholder-gray-400 font-medium" autocomplete="off">
                        <i class="fas fa-caret-down text-gray-400 pr-3"></i>
                    </div>
                    
                    <!-- Dropdown List -->
                    <div id="product-dropdown-list" class="absolute w-full mt-1 bg-white border border-gray-200 rounded shadow-xl hidden max-h-60 overflow-y-auto">
                        <div class="p-4 text-center text-xs text-gray-500 italic">Type to search products...</div>
                    </div>
                </div>

                <a href="#/create-product" class="w-8 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded-full flex items-center justify-center transition-all shadow-md shrink-0 focus:outline-none">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
            
            <div class="overflow-x-auto border border-gray-200 rounded">
                <table class="w-full text-left text-[13px] whitespace-nowrap bg-white">
                    <thead>
                        <tr class="bg-gray-50/50 border-b border-gray-200">
                            <th class="py-3 px-4 font-bold text-gray-800 border-r border-gray-200">Name</th>
                            <th class="py-3 px-4 font-bold text-gray-800 border-r border-gray-200 w-16 text-center">Color</th>
                            <th class="py-3 px-4 font-bold text-gray-800 border-r border-gray-200 w-32">Price</th>
                            <th class="py-3 px-4 font-bold text-gray-800 border-r border-gray-200 w-32 text-center">Quantity</th>
                            <th class="py-3 px-4 font-bold text-gray-800 border-r border-gray-200 w-24">Discount</th>
                            <th class="py-3 px-4 font-bold text-gray-800 w-32">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody id="selected-products-body">
                        <!-- Products added here dynamically -->
                        <tr id="empty-product-row">
                            <td colspan="6" class="py-8 text-center text-gray-400 italic text-xs">No products selected</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Order Status*</label>
                    <select id="order-status" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-600">
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
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Payment Method*</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-600">
                        <option value="Cash on Delivery">Cash on Delivery</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Attachments</label>
                    <div class="flex items-center gap-2 mt-1">
                        <label class="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1 text-sm rounded cursor-pointer transition-colors text-gray-700">
                            Choose File
                            <input type="file" class="hidden">
                        </label>
                        <span class="text-xs text-gray-500">No file chosen</span>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Courier Note</label>
                    <textarea class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 h-24 resize-none"></textarea>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Packing Note</label>
                    <textarea class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 h-24 resize-none"></textarea>
                </div>
            </div>

            <div class="mt-5">
                <label class="block text-xs font-bold text-gray-700 mb-1">Order Note</label>
                <textarea class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 h-24 resize-none"></textarea>
            </div>
        </div>
    </div>

    <!-- Summary -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-fit">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Summary</h2>
        </div>
        <div class="p-4 space-y-4 flex-1">
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Date*</label>
                <input type="text" id="order-date" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500 text-gray-700">
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Reference No</label>
                <input type="text" id="ref-no" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500">
            </div>
            
            <div class="mt-6 space-y-2 border-t border-gray-100 pt-5">
                <div class="flex justify-between items-center text-sm">
                    <span class="font-bold text-gray-700 text-xs">Subtotal(Tk):</span>
                    <input type="number" id="subtotal" class="border border-gray-300 rounded px-2 py-1 w-1/2 text-right text-gray-700 text-xs bg-white focus:outline-none focus:border-purple-500" placeholder="">
                </div>
                <div class="flex justify-between items-center text-sm">
                    <span class="font-bold text-gray-700 text-xs">Discount/Less*:</span>
                    <input type="number" id="discount" class="border border-gray-300 rounded px-2 py-1 w-1/2 text-right text-gray-700 text-xs bg-white focus:outline-none focus:border-purple-500" placeholder="">
                </div>
                <div class="flex justify-between items-center text-sm">
                    <span class="font-bold text-gray-700 text-xs">After Discount(Tk):</span>
                    <span id="after-discount" class="w-1/2 text-right px-2 text-gray-700 text-xs py-1"></span>
                </div>
                <div class="flex justify-between items-center text-sm">
                    <span class="font-bold text-gray-700 text-xs flex items-center">
                        Shipping*(Tk) 
                        <div class="tooltip ml-1">
                            <i class="fas fa-info-circle text-[10px] text-black"></i>
                            <span class="tooltiptext">শিপিং চার্জ বাবদ কাস্টমারের কাছ থেকে নেয়া এমাউন্ট!</span>
                        </div>:
                    </span>
                    <input type="number" id="shipping" class="border border-gray-300 rounded px-2 py-1 w-1/2 text-right text-gray-700 text-xs bg-white focus:outline-none focus:border-purple-500" placeholder="">
                </div>
                <div class="flex justify-between items-center text-sm">
                    <span class="font-bold text-gray-700 text-xs">Grand Total(Tk):</span>
                    <span id="grand-total" class="w-1/2 text-right px-2 text-gray-700 text-xs py-1 font-bold"></span>
                </div>
                <div class="flex justify-between items-center text-sm">
                    <span class="font-bold text-gray-700 text-xs">Advance Payment:</span>
                    <input type="number" id="advance" class="border border-gray-300 rounded px-2 py-1 w-1/2 text-right text-gray-700 text-xs bg-white focus:outline-none focus:border-purple-500" placeholder="">
                </div>
                <div class="flex justify-between items-center text-sm mb-2">
                    <span class="font-bold text-gray-700 text-xs">Due(Tk):</span>
                    <span id="due" class="w-1/2 text-right px-2 text-gray-700 text-xs py-1 font-bold"></span>
                </div>
                <div class="flex justify-between items-center text-sm pt-2">
                    <span class="font-bold text-gray-700 text-xs flex items-center text-gray-600">
                        Courier Charged to me 
                        <div class="tooltip ml-1">
                            <i class="fas fa-info-circle text-[10px] text-gray-400"></i>
                            <span class="tooltiptext">ডেলিভারি করার জন্য কুরিয়ার আপনার থেকে যে এমাউন্ট চার্জ করেছে!</span>
                        </div>
                    </span>
                    <input type="number" id="courier-charge" class="border border-gray-300 rounded px-2 py-1 w-1/2 text-right text-gray-700 text-xs bg-white focus:outline-none focus:border-purple-500" placeholder="">
                </div>
                
                <div class="text-right mt-3 pb-2">
                    <a href="#" class="text-[12px] text-teal-600 hover:text-teal-700 font-medium">Apply Coupon</a>
                </div>
            </div>
        </div>
        <div class="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-lg">
            <button id="submit-order" class="w-full bg-brand-teal hover:bg-teal-600 text-white font-medium py-2 rounded-full text-sm transition-colors shadow-sm">
                Submit
            </button>
        </div>
    </div>
</div>
`;
