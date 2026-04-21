const tabOrderHTML = `
<!-- ORDER CONTENT -->
            <div id="content-order" class="general-tab-content hidden">
                <div class="space-y-6">
                    <!-- Currency -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Currency:</label>
                        <input type="text" id="settings-currency" placeholder="Currency symbol" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-1/3">
                    </div>

                    <!-- Default Shipping Charge -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Default Shipping Charge:</label>
                        <input type="text" id="settings-default-shipping" placeholder="Shipping Charge" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-2/3">
                    </div>

                    <!-- Alert me when product quantity are less then -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Alert me when product quantity are less then</label>
                        <input type="number" id="settings-low-stock-alert" value="5" class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 w-full md:w-2/3">
                    </div>

                    <!-- Order Sources -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Order Sources:</label>
                        <div id="settings-order-sources-container" class="border border-gray-300 rounded p-2 flex flex-wrap gap-2 items-center w-full md:w-4/5">
                            <input type="text" placeholder="Add new Source" class="flex-1 min-w-[120px] outline-none text-sm text-gray-600 bg-transparent">
                        </div>
                        <p class="text-sm text-gray-800 font-bold mt-1">NB: <span class="font-normal text-gray-600">You can add multiple by Comma(,)</span></p>
                    </div>

                    <!-- Order Tags -->
                    <div class="flex flex-col gap-1">
                        <label class="text-sm font-bold text-gray-800">Order Tags:</label>
                        <div id="settings-order-tags-container" class="border border-gray-300 rounded p-2 flex flex-wrap gap-2 items-center w-full md:w-4/5">
                            <input type="text" placeholder="Add new Tag" class="flex-1 min-w-[120px] outline-none text-sm text-gray-600 bg-transparent">
                        </div>
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
                        <div id="settings-additional-statuses-container" class="border border-gray-300 rounded p-2 flex flex-wrap gap-2 items-center w-full md:w-4/5">
                            <input type="text" placeholder="Add new Status" class="flex-1 min-w-[120px] outline-none text-sm text-gray-600 bg-transparent">
                        </div>
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
`;
