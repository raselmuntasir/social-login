const tabInvoiceHTML = `
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

                    <!-- Invoice Styles Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <!-- Custom Style -->
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
`;
