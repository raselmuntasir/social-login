const rolesHTML = `
<div class="space-y-4 pb-10">
    <!-- Role List Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Header -->
        <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 class="text-gray-800 font-bold text-sm">Role List</h2>
            <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm">
                Add Role
            </button>
        </div>

        <div class="p-4">
            <!-- Table Controls -->
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center text-xs text-gray-600">
                    <span>Show</span>
                    <select class="mx-2 border border-gray-300 rounded px-2 py-1 outline-none">
                        <option>10</option><option>25</option><option>50</option>
                    </select>
                    <span>entries</span>
                </div>
                <div class="flex items-center text-xs text-gray-600">
                    <span class="mr-2">Search:</span>
                    <input type="text" class="border border-gray-300 rounded px-2 py-1 outline-none w-48">
                </div>
            </div>

            <!-- Role Table -->
            <div class="overflow-x-auto border border-gray-100 rounded">
                <table class="w-full text-left text-[13px] whitespace-nowrap">
                    <thead class="bg-white border-b border-gray-100 text-gray-800 font-bold">
                        <tr>
                            <th class="px-4 py-3 w-20 border-r border-gray-100">
                                <div class="flex items-center justify-between">SL <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3 border-r border-gray-100">
                                <div class="flex items-center justify-between">Role Name <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                            <th class="px-4 py-3 w-40">
                                <div class="flex items-center justify-between">Action <i class="fas fa-sort text-gray-300"></i></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="hover:bg-gray-50/50 transition-colors">
                            <td class="px-4 py-3 border-r border-gray-100">1</td>
                            <td class="px-4 py-3 border-r border-gray-100">Inventory Employee</td>
                            <td class="px-4 py-3">
                                <button class="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded text-[11px] font-medium flex items-center gap-2 transition-colors">
                                    Action <i class="fas fa-chevron-down text-[10px]"></i>
                                </button>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50/50 transition-colors">
                            <td class="px-4 py-3 border-r border-gray-100">2</td>
                            <td class="px-4 py-3 border-r border-gray-100">Manager</td>
                            <td class="px-4 py-3">
                                <button class="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded text-[11px] font-medium flex items-center gap-2 transition-colors">
                                    Action <i class="fas fa-chevron-down text-[10px]"></i>
                                </button>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50/50 transition-colors">
                            <td class="px-4 py-3 border-r border-gray-100">3</td>
                            <td class="px-4 py-3 border-r border-gray-100">Order Employee</td>
                            <td class="px-4 py-3">
                                <button class="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded text-[11px] font-medium flex items-center gap-2 transition-colors">
                                    Action <i class="fas fa-chevron-down text-[10px]"></i>
                                </button>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50/50 transition-colors">
                            <td class="px-4 py-3 border-r border-gray-100">4</td>
                            <td class="px-4 py-3 border-r border-gray-100">Sub Admin</td>
                            <td class="px-4 py-3">
                                <button class="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded text-[11px] font-medium flex items-center gap-2 transition-colors">
                                    Action <i class="fas fa-chevron-down text-[10px]"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer Pagination -->
            <div class="flex justify-between items-center mt-6">
                <div class="text-xs text-gray-500 font-medium">Showing 1 to 4 of 4 entries</div>
                <div class="flex items-center gap-0">
                    <button class="px-4 py-1.5 border border-gray-300 bg-white text-gray-500 text-[11px] rounded-l hover:bg-gray-50 transition-colors">Previous</button>
                    <button class="px-4 py-1.5 border border-purple-700 bg-purple-700 text-white text-[11px] hover:bg-purple-800 transition-colors">1</button>
                    <button class="px-4 py-1.5 border border-gray-300 border-l-0 bg-white text-gray-500 text-[11px] rounded-r hover:bg-gray-50 transition-colors">Next</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;
