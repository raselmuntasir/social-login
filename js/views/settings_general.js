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
            <!-- GENERAL INFO CONTENT -->
            <div id="content-general" class="general-tab-content block">
                <div class="flex flex-col lg:flex-row gap-10">
                    <!-- Form Fields -->
                    <div class="flex-1 space-y-5">
                        <div class="flex flex-col md:flex-row md:items-center gap-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700">Business Name*:</label>
                            <input type="text" value="Top One Bazar" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center gap-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700">Business Mobile*:</label>
                            <input type="text" value="01710501210" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center gap-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700">Business Email:</label>
                            <input type="email" value="raselmoontasir@gmail.com" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center gap-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700">Web URL:</label>
                            <input type="text" placeholder="Web URL" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div class="flex flex-col md:flex-row gap-2 pt-2">
                            <label class="w-full md:w-40 text-sm font-bold text-gray-700 pt-2">Address*</label>
                            <textarea rows="2" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">550/c, Khilgaon, Dhaka, bangladesh.</textarea>
                        </div>
                    </div>

                    <!-- Logo Section -->
                    <div class="w-full lg:w-72 flex flex-col items-center">
                        <div class="w-full aspect-video bg-green-600 rounded-lg overflow-hidden relative group cursor-pointer border border-gray-200">
                            <img src="https://via.placeholder.com/300x150/059669/ffffff?text=LOGO" alt="Logo Preview" class="w-full h-full object-cover">
                            <!-- Crop Mockup -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-3/4 h-3/4 border-2 border-white/50 relative">
                                    <div class="absolute -top-1 -left-1 w-2 h-2 bg-white"></div>
                                    <div class="absolute -top-1 -right-1 w-2 h-2 bg-white"></div>
                                    <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-white"></div>
                                    <div class="absolute -bottom-1 -right-1 w-2 h-2 bg-white"></div>
                                    <div class="absolute top-1/2 left-0 w-full h-[1px] bg-white/20"></div>
                                    <div class="absolute top-0 left-1/2 w-[1px] h-full bg-white/20"></div>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm font-bold text-gray-700 mt-2 mb-4">Logo</p>
                        
                        <div class="w-full flex">
                            <div class="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm text-gray-400 truncate">Choose file...</div>
                            <button class="bg-gray-100 hover:bg-gray-200 border-y border-r border-gray-300 rounded-r px-4 py-2 text-sm font-medium text-gray-700 transition-colors">Browse</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ORDER CONTENT -->
            <div id="content-order" class="general-tab-content hidden">
                <div class="space-y-6">
                    <!-- Currency -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Currency:</label>
                        <input type="text" placeholder="Currency symbol" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-1/3">
                    </div>

                    <!-- Default Shipping Charge -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Default Shipping Charge:</label>
                        <input type="text" placeholder="Shipping Charge" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-2/3">
                    </div>

                    <!-- Alert me when product quantity are less then -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Alert me when product quantity are less then</label>
                        <input type="number" value="5" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-2/3">
                    </div>

                    <!-- Order Sources -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Order Sources:</label>
                        <div class="border border-gray-300 rounded p-2 flex flex-wrap gap-2 items-center w-full md:w-4/5">
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Landing Page <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Mobile Call <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Messenger <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">WhatsApp <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">FB Group <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Bulk SMS <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Failed Orders <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Wordpress Website <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">POS <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <input type="text" placeholder="Add new Source" class="flex-1 min-w-[120px] outline-none text-sm text-gray-600 bg-transparent">
                        </div>
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>

                    <!-- Order Tags -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Order Tags:</label>
                        <input type="text" placeholder="Add new Tag" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5">
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>

                    <!-- Followup Tags -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Followup Tags:</label>
                        <input type="text" placeholder="Add new Tag" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5">
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>

                    <!-- Default Order Tag -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Default Order Tag:</label>
                        <select class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5">
                            <option>No Tag</option>
                        </select>
                    </div>

                    <!-- Additional Statuses -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Additional Statuses: <a href="#" class="text-blue-500 font-normal hover:underline">(Rearrange)</a></label>
                        <input type="text" placeholder="Add new Status" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5">
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>

                    <!-- Failed Order Statuses -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Failed Order Statuses:</label>
                        <input type="text" placeholder="Add new Status" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5">
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>

                    <!-- Additional Return Statuses -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Additional Return Statuses:</label>
                        <select class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5 text-gray-500">
                            <option>Select Option</option>
                        </select>
                    </div>

                    <!-- Additional Courier Statuses -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Additional Courier Statuses:</label>
                        <select class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5 text-gray-500">
                            <option>Select Option</option>
                        </select>
                    </div>

                    <!-- Cancel Reasons -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Cancel Reasons:</label>
                        <div class="border border-gray-300 rounded p-2 flex flex-wrap gap-2 items-center w-full md:w-4/5">
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Other <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Over Price <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Color/Size <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <span class="bg-[#17a2b8] text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">Duplicated <i class="fas fa-times cursor-pointer text-[10px]"></i></span>
                            <input type="text" placeholder="Add new Cancel Reason" class="flex-1 min-w-[120px] outline-none text-sm text-gray-600 bg-transparent">
                        </div>
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>

                    <!-- Redirect after Order Created -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Redirect after Order Created:</label>
                        <select class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5 text-gray-700">
                            <option>Create Order Page</option>
                            <option>Order Details Page</option>
                        </select>
                    </div>

                    <!-- Stock Out Product can Order -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Stock Out Product can Order</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="stock-order" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="stock-order" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Stock Out Product can Submit Courier -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Stock Out Product can Submit Courier</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="stock-submit" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="stock-submit" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Purchase Quantity Decimal -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Purchase Quantity Decimal</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="purchase-qty" class="w-4 h-4 text-blue-600"> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="purchase-qty" class="w-4 h-4 text-blue-600" checked> No</label>
                        </div>
                    </div>

                    <!-- Today's hold Followup also Show on Hold List -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Today's hold Followup also Show on Hold List</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="hold-followup" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="hold-followup" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Decrease stock on -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Decrease stock on:</label>
                        <input type="text" value="In Courier" disabled class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none w-full md:w-4/5 bg-gray-100 text-gray-500 cursor-not-allowed">
                    </div>

                    <!-- Make Delivered & Completed from Order Create Page -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Make Delivered & Completed from Order Create Page</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="make-delivered" class="w-4 h-4 text-blue-600" checked> No</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="make-delivered" class="w-4 h-4 text-blue-600"> Yes</label>
                        </div>
                    </div>

                    <!-- Set Order Employee -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Set Order Employee</label>
                        <select class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5 text-gray-700">
                            <option>Disabled</option>
                            <option>On Confirm</option>
                            <option>On Confirm If Not Assigned</option>
                            <option>On First Confirm</option>
                            <option>On Processing</option>
                            <option>On Processing If Not Assigned</option>
                            <option>On First Processing</option>
                            <option>On Click If Not Assigned</option>
                        </select>
                    </div>

                    <!-- Distribute Main Admin Order -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Distribute Main Admin Order</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="distribute" class="w-4 h-4 text-blue-600" checked> To All</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="distribute" class="w-4 h-4 text-blue-600"> To Own</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="distribute" class="w-4 h-4 text-blue-600"> Distribute</label>
                        </div>
                    </div>

                    <!-- Allow Employee to View not Assign Orders -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Allow Employee to View not Assign Orders</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="view-orders" class="w-4 h-4 text-blue-600"> No</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="view-orders" class="w-4 h-4 text-blue-600" checked> Yes</label>
                        </div>
                    </div>

                    <!-- Allow Employee to View Everyone's Order if Distribution are Disabled? -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800 flex items-center gap-1">Allow Employee to View Everyone's Order if Distribution are Disabled? <i class="fas fa-info-circle text-gray-800"></i></label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="view-everyone" class="w-4 h-4 text-blue-600"> No</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="view-everyone" class="w-4 h-4 text-blue-600" checked> Yes</label>
                        </div>
                    </div>

                    <!-- Header Order Search By -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Header Order Search By</label>
                        <div class="flex flex-wrap gap-x-4 gap-y-2 max-w-2xl">
                            <label class="flex items-center gap-1 text-sm text-gray-500 cursor-not-allowed"><input type="checkbox" class="w-4 h-4 text-gray-400 rounded" checked disabled> Mobile Number</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked> Order ID</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded"> Only Own Order ID <i class="fas fa-info-circle text-gray-800"></i></label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded"> Courier Invoice</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded"> Pre Order Pending</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded"> Pre Order Confirmed</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded"> Pre Order Canceled</label>
                        </div>
                    </div>

                    <!-- Order List Items -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Order List Items</label>
                        <div class="flex flex-wrap gap-x-4 gap-y-2 max-w-2xl">
                            <label class="flex items-center gap-1 text-sm text-gray-500 cursor-not-allowed"><input type="checkbox" class="w-4 h-4 text-gray-400 rounded" checked disabled> Status</label>
                            <label class="flex items-center gap-1 text-sm text-gray-500 cursor-not-allowed"><input type="checkbox" class="w-4 h-4 text-gray-400 rounded" checked disabled> Select</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked> Notes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked> Invoice ID</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded"> Reference ID</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked> Information</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked> Date</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked> Address</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked> Courier</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked> Summary</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked> Employee</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded"> User Agent</label>
                        </div>
                    </div>

                    <!-- Check Pre Order is Duplicate -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Check Pre Order is Duplicate</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="preorder-duplicate" class="w-4 h-4 text-blue-600" checked> No</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="preorder-duplicate" class="w-4 h-4 text-blue-600"> Yes</label>
                        </div>
                    </div>

                    <!-- Allow Employee to View not Assign Followup -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Allow Employee to View not Assign Followup</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="view-followup" class="w-4 h-4 text-blue-600"> No</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="view-followup" class="w-4 h-4 text-blue-600" checked> Yes</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- INVOICE CONTENT -->
            <div id="content-invoice" class="general-tab-content hidden">
                <div class="space-y-6">
                    <!-- Print Double Invoice -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Print Double Invoice</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="double-invoice" class="w-4 h-4 text-blue-600"> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="double-invoice" class="w-4 h-4 text-blue-600" checked> No</label>
                        </div>
                    </div>

                    <!-- Alert on Second Time Print -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Alert on Second Time Print</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="alert-second-print" class="w-4 h-4 text-blue-600"> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="alert-second-print" class="w-4 h-4 text-blue-600" checked> No</label>
                        </div>
                    </div>

                    <!-- Invoice Color -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Invoice Color</label>
                        <input type="text" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-1/3">
                    </div>

                    <!-- Enable Logo -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Enable Logo</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="enable-logo" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="enable-logo" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Enable Courier Name -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Enable Courier Name</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="enable-courier-name" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="enable-courier-name" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Enable Barcode -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Enable Barcode</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="enable-barcode" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="enable-barcode" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Enable Barcode Number -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Enable Barcode Number</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="enable-barcode-num" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="enable-barcode-num" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Hide Customer Address -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Hide Customer Address</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="hide-cust-addr" class="w-4 h-4 text-blue-600"> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="hide-cust-addr" class="w-4 h-4 text-blue-600" checked> No</label>
                        </div>
                    </div>

                    <!-- Show Invoice Serial -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Show Invoice Serial</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-inv-serial" class="w-4 h-4 text-blue-600"> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-inv-serial" class="w-4 h-4 text-blue-600" checked> No</label>
                        </div>
                    </div>

                    <!-- Show Courier Note -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Show Courier Note</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-courier-note" class="w-4 h-4 text-blue-600"> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-courier-note" class="w-4 h-4 text-blue-600" checked> No</label>
                        </div>
                    </div>

                    <!-- Show Packing Note -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Show Packing Note</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-packing-note" class="w-4 h-4 text-blue-600"> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-packing-note" class="w-4 h-4 text-blue-600" checked> No</label>
                        </div>
                    </div>

                    <!-- Show Product Info -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Show Product Info</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-product-info" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-product-info" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Show Product Image -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Show Product Image</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-product-image" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-product-image" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Multiple Invoice Order by -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Multiple Invoice Order by</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="multiple-invoice-order" class="w-4 h-4 text-blue-600" checked> Invoice Id</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="multiple-invoice-order" class="w-4 h-4 text-blue-600"> Product Title</label>
                        </div>
                    </div>

                    <!-- Show Product SKU -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Show Product SKU</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-product-sku" class="w-4 h-4 text-blue-600" checked> Yes</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="show-product-sku" class="w-4 h-4 text-blue-600"> No</label>
                        </div>
                    </div>

                    <!-- Order ID Prefix -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Order ID Prefix</label>
                        <input type="text" value="#" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full">
                    </div>

                    <!-- Invoice Header Text -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Invoice Header Text</label>
                        <input type="text" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full">
                    </div>

                    <!-- Invoice Footer Text -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Invoice Footer Text</label>
                        <input type="text" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full">
                    </div>

                    <!-- Invoice Styles Header -->
                    <div>
                        <h3 class="text-lg font-medium text-gray-800">Invoice Styles</h3>
                    </div>

                    <!-- Invoice Styles Grid -->\n                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">\n                        <!-- Custom Style -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-white p-2"></div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Custom Style</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>

                        <!-- Default -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-white p-2 flex items-center justify-center border-b">
                                <div class="w-full text-[8px] leading-tight">
                                    <div class="flex justify-between border-b pb-1 mb-1">
                                        <div class="font-bold">Test</div>
                                        <div class="text-right">Order No: #45<br>Invoice Date: <br>COD:</div>
                                    </div>
                                    <div class="mb-1"><strong>BILLING TO:</strong><br>Test Customer<br>Dhaka, Bangladesh<br>123456789</div>
                                    <div class="bg-black text-white p-1 flex justify-between mb-1"><span>PRICE</span><span>QTY</span></div>
                                </div>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Default</span>
                                <span class="text-white text-sm font-bold">Activated</span>
                            </div>
                        </div>

                        <!-- Style 2 POS -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-white p-2 flex items-center justify-center border-b">
                                <div class="w-full text-[8px] leading-tight text-center">
                                    <div class="font-bold text-[10px]">POS Invoice</div>
                                    <div class="my-1 border-b pb-1">Shop Address<br>Phone: 123456789</div>
                                    <table class="w-full text-left mt-1 border-t"><tr><th>Product</th><th>Qty</th><th>Total</th></tr></table>
                                </div>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 2 POS</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 3 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 3 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 3</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 4 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 4 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 4</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 5 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 5 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 5</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 6 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 6 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 6</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 7 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 7 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 7</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 8 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 8 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 8</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 9 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 9 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 9</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 10 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 10 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 10</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 11 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 11 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 11</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 12 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 12 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 12</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 13 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 13 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 13</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 14 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 14 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 14</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 15 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 15 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 15</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 16 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 16 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 16</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 17 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 17 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 17</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 18 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 18 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 18</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 19 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 19 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 19</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 20 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 20 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 20</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 21 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 21 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 21</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 22 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 22 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 22</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 23 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 23 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 23</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 24 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 24 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 24</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 25 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 25 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 25</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 26 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 26 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 26</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 27 Sticker -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <div class="w-full text-[8px] leading-tight">
                                    <div class="flex justify-between"><div>Invoice No: #5583<br>Date: Sep 25, 2025</div><div class="w-6 h-6 border bg-gray-100 text-center">QR</div></div>
                                    <div class="mt-1"><strong>Invoice To</strong><br>MD Satu<br>Uttara Dhaka</div>
                                </div>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 27 Sticker</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 28 A4 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <div class="w-full h-full border border-gray-100 flex flex-col p-1 text-[6px]">
                                    <div class="text-right border-b pb-1 mb-1">Discount: 400 Tk<br>Payable: 1,150 Tk</div>
                                </div>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 28 A4</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 29 Sticker -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <div class="w-full text-[8px] leading-tight text-center">
                                    <div class="font-bold">#5397</div>
                                    <div>25/12/2024</div>
                                    <table class="w-full text-left mt-1 border-t border-b"><tr><th>Qty</th><th>Total</th></tr><tr><td>1</td><td>1,000</td></tr></table>
                                </div>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 29 Sticker</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 30 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <div class="w-full text-[8px] leading-tight">
                                    <div class="text-right font-bold text-orange-500">INVOICE</div>
                                    <div class="mt-2 border-b border-orange-500 pb-1">BILL TO</div>
                                </div>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 30</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 31 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <div class="w-full text-[8px] leading-tight">
                                    <div class="bg-red-900 text-white p-1 text-[6px]">PRODUCT DETAILS</div>
                                    <div class="text-right text-red-900 font-bold mt-2">TOTAL BDT 11,680</div>
                                </div>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 31</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 32 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 32 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 32</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 33 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 33 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 33</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 34 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 34 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 34</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 35 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 35 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 35</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 36 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 36 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 36</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 37 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 37 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 37</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 38 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 38 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 38</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 39 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 39 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 39</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                        <!-- Style 40 -->
                        <div class="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col bg-white">
                            <div class="h-40 bg-gray-50 p-2 flex items-center justify-center border-b">
                                <span class="text-gray-400 font-medium">Style 40 Preview</span>
                            </div>
                            <div class="bg-[#343a40] p-2 flex justify-between items-center mt-auto">
                                <span class="text-white text-sm font-medium">Style 40</span>
                                <button class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded">Activate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CUSTOMER CONTENT -->
            <div id="content-customer" class="general-tab-content hidden">
                <div class="space-y-6">
                    <!-- Statuses -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Statuses:</label>
                        <input type="text" placeholder="Add new Status" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5">
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>

                    <!-- Additional Fields -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Additional Fields:</label>
                        <input type="text" placeholder="Add new Field" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5">
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>

                    <!-- Customer Tags -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Customer Tags:</label>
                        <input type="text" placeholder="Add new Tag" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5">
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>
                </div>
            </div>

            <!-- OTHERS CONTENT -->
            <div id="content-others" class="general-tab-content hidden">
                <div class="space-y-6">
                    <!-- Open WhatsApp In -->
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-800">Open WhatsApp In</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="whatsapp-in" class="w-4 h-4 text-blue-600" checked> App</label>
                            <label class="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="whatsapp-in" class="w-4 h-4 text-blue-600"> Browser</label>
                        </div>
                    </div>

                    <!-- DataTable Default Entries -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">DataTable Default Entries:</label>
                        <select class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5 text-gray-700">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                    </div>

                    <!-- Dashboard Default Date -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Dashboard Default Date:</label>
                        <select class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-4/5 text-gray-700">
                            <option>Today</option>
                            <option>Yesterday</option>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option selected>This Month</option>
                            <option>Last Month</option>
                        </select>
                    </div>
                </div>
            </div>

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
