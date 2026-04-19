const adminsHTML = `
<div class="space-y-6 pb-10">
    <!-- Role Filter -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <label class="block text-xs font-bold text-gray-700 mb-1">Role</label>
        <select class="w-full max-w-sm border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 bg-white">
            <option>All Role</option>
            <option>Super Admin</option>
            <option>Manager</option>
            <option>Operator</option>
        </select>
    </div>

    <!-- Admin List Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg">
            <h2 class="text-gray-800 font-medium text-sm">Admin list</h2>
            <button class="bg-purple-700 hover:bg-purple-800 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors">
                <i class="fas fa-plus"></i> Create new
            </button>
        </div>
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
                    <thead class="bg-white text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                            <th class="px-3 py-3 border-r border-gray-200 w-12 text-center">SL <i class="fas fa-sort ml-1 text-gray-300"></i></th>
                            <th class="px-3 py-3 border-r border-gray-200">Info</th>
                            <th class="px-3 py-3 border-r border-gray-200 text-center">Role</th>
                            <th class="px-3 py-3 border-r border-gray-200 text-center">Order Distribution</th>
                            <th class="px-3 py-3 border-r border-gray-200 text-center">
                                Followup Distribution
                                <div class="text-[9px] font-normal text-gray-400">For Automatic Followup</div>
                            </th>
                            <th class="px-3 py-3 border-r border-gray-200 text-center">Last Seen</th>
                            <th class="px-3 py-3 border-r border-gray-200 text-center">Status</th>
                            <th class="px-3 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-3 py-4 text-center border-r border-gray-100">1</td>
                            <td class="px-3 py-4 border-r border-gray-100">
                                <div class="font-bold text-gray-800">MD Rasel</div>
                                <div class="text-gray-500">01710501210</div>
                                <div class="text-gray-400">raselmoontasir@gmail.com</div>
                            </td>
                            <td class="px-3 py-4 text-center border-r border-gray-100 text-gray-400">n/a</td>
                            <td class="px-3 py-4 text-center border-r border-gray-100 text-gray-400">n/a</td>
                            <td class="px-3 py-4 text-center border-r border-gray-100 text-gray-400">n/a</td>
                            <td class="px-3 py-4 text-center border-r border-gray-100">
                                <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">Active</span>
                            </td>
                            <td class="px-3 py-4 text-center border-r border-gray-100 text-gray-400">n/a</td>
                            <td class="px-3 py-4 text-right text-gray-400">n/a</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="flex justify-between items-center mt-4">
                <div class="text-xs text-gray-500">Showing 1 to 1 of 1 entries</div>
                <div class="flex items-center gap-1">
                    <button class="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">Previous</button>
                    <button class="w-8 h-8 flex items-center justify-center bg-purple-700 text-white rounded text-xs font-bold shadow-sm">1</button>
                    <button class="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">Next</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;
