const settingsGeneralHTML = `
<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="flex flex-col md:flex-row">
        <!-- Left Sidebar Tabs -->
        <div class="w-full md:w-64 border-r border-gray-100 bg-gray-50/30">
            <nav class="flex flex-col">
                <a href="#/settings/general" class="px-6 py-4 text-sm font-medium border-b border-gray-100 bg-gray-100/80 text-gray-800">General Info</a>
                <a href="#" class="px-6 py-4 text-sm font-medium border-b border-gray-100 text-blue-600 hover:bg-gray-50 transition-colors">Order</a>
                <a href="#" class="px-6 py-4 text-sm font-medium border-b border-gray-100 text-blue-600 hover:bg-gray-50 transition-colors">Invoice</a>
                <a href="#" class="px-6 py-4 text-sm font-medium border-b border-gray-100 text-blue-600 hover:bg-gray-50 transition-colors">Customer</a>
                <a href="#" class="px-6 py-4 text-sm font-medium border-b border-gray-100 text-blue-600 hover:bg-gray-50 transition-colors">Others</a>
            </nav>
        </div>

        <!-- Right Content Area -->
        <div class="flex-1 p-8">
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

            <!-- Footer -->
            <div class="mt-10 pt-6 border-t border-gray-100">
                <button class="bg-purple-700 hover:bg-purple-800 text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-sm transition-colors mb-2">Update</button>
                <p class="text-[11px] text-gray-500 italic">NB: * marked are required field.</p>
            </div>
        </div>
    </div>
</div>
`;
