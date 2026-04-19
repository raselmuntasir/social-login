const createProductHTML = `
<div class="space-y-6">
    <!-- Header with Breadcrumb and View All button -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-gray-800">Add New Product</h2>
            <p class="text-xs text-gray-500">Products / Add New</p>
        </div>
        <button onclick="window.location.hash='#/all-orders'" class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-colors">
            <i class="fas fa-arrow-left"></i> View All
        </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Images and Info -->
        <div class="lg:col-span-2 space-y-6">
            
            <!-- Product Images -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div class="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <h3 class="text-sm font-bold text-gray-700">Product Images</h3>
                </div>
                <div class="p-8 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 m-4 rounded-lg bg-blue-50/30 relative">
                    <input type="file" id="prod-image-input" class="hidden" accept="image/*">
                    <div id="prod-image-placeholder" class="w-full max-w-sm aspect-video bg-white border border-gray-200 rounded flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors" onclick="document.getElementById('prod-image-input').click()">
                        <i class="fas fa-images text-2xl mb-2"></i>
                        <span class="text-xs font-bold uppercase tracking-widest">ADD IMAGES</span>
                    </div>
                    <div id="prod-image-preview-container" class="hidden w-full max-w-sm aspect-video relative rounded overflow-hidden border border-gray-200 shadow-sm">
                        <img id="prod-image-preview" src="#" class="w-full h-full object-cover">
                        <button class="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-[10px] flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors" onclick="removeProductImage()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Product Information -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-100">
                <div class="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <h3 class="text-sm font-bold text-gray-700">Product Information</h3>
                </div>
                <div class="p-4 space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Product Title*</label>
                        <input type="text" id="prod-title" placeholder="Enter product title" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Short Description</label>
                        <textarea id="prod-short-desc" rows="4" placeholder="Enter short description" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"></textarea>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div class="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <h3 class="text-sm font-bold text-gray-700">Description</h3>
                </div>
                <div class="p-4">
                    <textarea id="product-description" rows="10" class="w-full border border-gray-200 rounded p-4 text-sm focus:outline-none"></textarea>
                </div>
            </div>

            <!-- Product Data -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div class="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <h3 class="text-sm font-bold text-gray-700">Product Data</h3>
                </div>
                <div class="p-4 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Regular Price</label>
                            <input type="number" id="prod-regular-price" placeholder="0.00" class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Sale Price*</label>
                            <input type="number" id="prod-sale-price" placeholder="0.00" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Product SKU</label>
                            <input type="text" id="prod-sku" class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-gray-50">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Rack Number</label>
                            <input type="text" class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Product Unit*</label>
                            <select id="prod-unit" class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-700">
                                <option>Pcs</option>
                                <option>G</option>
                                <option>KG</option>
                                <option>ML</option>
                                <option>L</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Unit Amount*</label>
                            <input type="number" id="prod-unit-amount" value="1" class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Shipping Weight(KG)</label>
                            <input type="number" placeholder="0.00" class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Color Code</label>
                            <div class="flex items-center gap-2">
                                <input type="color" class="w-10 h-10 border border-gray-200 rounded p-1 bg-white cursor-pointer">
                                <span class="text-xs text-gray-400">#000000</span>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Barcode* <span class="text-[10px] text-gray-400">(Min: 4)</span></label>
                            <input type="text" value="179451776518100" class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Packing Material -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-100">
                <div class="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <h3 class="text-sm font-bold text-gray-700">Packing Material</h3>
                </div>
                <div class="p-4 space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Select Product(Only Raw Material!)</label>
                        <select class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-400">
                            <option>Search Product</option>
                        </select>
                    </div>
                    
                    <div class="overflow-x-auto border border-gray-100 rounded">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                                <tr>
                                    <th class="px-4 py-3">Name</th>
                                    <th class="px-4 py-3">Average Purchase Price</th>
                                    <th class="px-4 py-3">Available Stock</th>
                                    <th class="px-4 py-3">Conversion Factor</th>
                                    <th class="px-4 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="5" class="px-4 py-8 text-center text-gray-400 italic">No raw materials selected</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Additional Info -->
        <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm border border-gray-100">
                <div class="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <h3 class="text-sm font-bold text-gray-700">Additional information</h3>
                </div>
                <div class="p-4 space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">SKU</label>
                        <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-gray-50">
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <label class="text-xs font-bold text-gray-700">Product Category <span class="text-teal-600 cursor-pointer">Create</span></label>
                        </div>
                        <select id="prod-category" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                            <option value="">Nothing selected</option>
                            <option>Electronics</option>
                            <option>Fashion & Apparel</option>
                            <option>Home & Kitchen</option>
                            <option>Beauty & Personal Care</option>
                            <option>Gadgets</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Product Brand</label>
                        <select id="prod-brand" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                            <option value="">Select Brand</option>
                            <option>Top One</option>
                            <option>Apple</option>
                            <option>Samsung</option>
                            <option>Nike</option>
                            <option>Logitech</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Additional Attributes</label>
                        <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                            <option value="">Nothing selected</option>
                            <option>Color</option>
                            <option>Size</option>
                            <option>Material</option>
                            <option>Weight</option>
                        </select>
                        <p class="text-[10px] text-gray-400 mt-1 font-bold italic">NB: Use this attribute only for keep note. It will not effect on stock!</p>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Group*</label>
                        <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-700">
                            <option>Finished Goods</option>
                            <option>Raw Material</option>
                        </select>
                    </div>
                    <div>
                        <div class="flex items-center gap-1 mb-1">
                            <label class="text-xs font-bold text-gray-700">Customer Followup After(Days)</label>
                            <i class="fas fa-info-circle text-gray-400 text-[10px]"></i>
                        </div>
                        <input type="number" value="0" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                    </div>

                    <div class="pt-4">
                        <label class="block text-xs font-bold text-gray-700 mb-1">Product type*</label>
                        <select id="prod-type" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white text-gray-700">
                            <option>Simple</option>
                            <option>Bundle</option>
                            <option>Variable Bundle</option>
                            <option>Variable</option>
                        </select>
                    </div>

                    <div class="pt-6">
                        <button id="submit-product" class="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded shadow-lg transition-all transform active:scale-95">
                            Create
                        </button>
                        <p class="text-[10px] text-gray-500 mt-2 italic font-bold">NB: * marked are required field.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
