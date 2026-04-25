const productListHTML = `
<div class="space-y-6 pb-10">
    <!-- Filters Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-gray-800 font-medium text-sm">Product list</h2>
            <a href="#/create-product" class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors">
                <i class="fas fa-plus"></i> Create new
            </a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Group</label>
                <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                    <option>Finished Goods</option>
                    <option>Raw Material</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Type</label>
                <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                    <option>All</option>
                    <option>Simple</option>
                    <option>Variable</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select id="filter-prod-category" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                    <option value="">All Categories</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Status</label>
                <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Attribute</label>
                <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
                    <option>All</option>
                </select>
            </div>
        </div>
        
        <button class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded text-xs font-medium transition-colors">
            Clear Filter
        </button>
    </div>

    <!-- Product Table Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-4">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <div class="text-xs text-gray-500">
                    Show 
                    <select class="border border-gray-300 rounded px-1 py-1 mx-1 outline-none">
                        <option>10</option>
                    </select>
                    entries
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Search:</span>
                    <input type="text" class="border border-gray-300 rounded px-3 py-1 text-sm outline-none focus:border-purple-500">
                </div>
            </div>

            <div class="overflow-x-auto border border-gray-100 rounded">
                <table class="w-full text-left text-xs">
                    <thead class="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                        <tr>
                            <th class="px-3 py-3 border-r border-gray-200 w-12 text-center">SL <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200 w-16 text-center">
                                <input type="checkbox" class="rounded border-gray-300">
                                <span class="block text-[10px] mt-0.5">Select</span>
                            </th>
                            <th class="px-3 py-3 border-r border-gray-200">Name <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200">SKU</th>
                            <th class="px-3 py-3 border-r border-gray-200">Image</th>
                            <th class="px-3 py-3 border-r border-gray-200">Type</th>
                            <th class="px-3 py-3 border-r border-gray-200">Regular Price</th>
                            <th class="px-3 py-3 border-r border-gray-200">Sale Price</th>
                            <th class="px-3 py-3 border-r border-gray-200">Stock</th>
                            <th class="px-3 py-3 border-r border-gray-200">Status</th>
                            <th class="px-3 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody id="productListTable">
                        <tr>
                            <td colspan="11" class="px-4 py-8 text-center text-gray-400 italic">No data available in table</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
                <div class="flex gap-2">
                    <button class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-[11px] font-medium flex items-center gap-2 transition-colors">
                        <i class="fas fa-print"></i> Print Barcode
                    </button>
                    <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-[11px] font-medium flex items-center gap-2 transition-colors">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
                
                <div class="flex items-center gap-4">
                    <div class="text-xs text-gray-500">Showing 0 to 0 of 0 entries</div>
                    <div class="flex border border-gray-200 rounded overflow-hidden">
                        <button class="px-3 py-1.5 text-xs text-gray-400 border-r border-gray-200 hover:bg-gray-50">Previous</button>
                        <button class="px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
