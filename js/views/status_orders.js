const statusOrdersHTML = (statusLabel) => `
<div class="space-y-4 pb-10">
    <!-- Filtering Section (collapsed by default) -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <!-- Header -->
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer" onclick="const content = this.nextElementSibling; content.classList.toggle('hidden'); this.querySelector('.toggle-icon').classList.toggle('rotate-180');">
            <h2 class="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                <i class="fa-solid fa-filter text-indigo-600"></i> ফিল্টারিং (Filtering)
            </h2>
            <button class="text-gray-400 hover:text-gray-600 transition-all toggle-icon">
                <i class="fa-solid fa-chevron-down"></i>
            </button>
        </div>

        <div class="hidden p-6 space-y-8">
            <!-- Search Field -->
            <div class="relative max-w-lg">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="text" id="filter-search-text" placeholder="Search by Name, Phone, or Order ID..." class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
            </div>

            <!-- Filter Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                <!-- Order Created At -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Order Created At</label>
                    <div id="filter-created-at"></div>
                </div>

                <!-- Courier Submitted At -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier Submitted At</label>
                    <div id="filter-courier-at"></div>
                </div>

                <!-- Status Added At -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Status Added At</label>
                    <div id="filter-status-at"></div>
                    <p class="text-[9px] text-red-500 mt-1"><span class="font-bold text-gray-700">NB:</span> Max 90 days</p>
                </div>

                <!-- Note Added At -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Note Added At</label>
                    <div id="filter-note-at"></div>
                </div>

                <!-- Row 2 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Employee</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white custom-select">
                        <option>All Employee</option>
                        <option>Not Assigned</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Employee Action</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-100 outline-none custom-select bg-white">
                        <option>Order Created/Assigned</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Order Source</label>
                    <select id="filter-order-source" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100 bg-white custom-select">
                        <option value="">All Source</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Order Tag</label>
                    <select id="filter-order-tag" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100 bg-white custom-select">
                        <option value="">All Tag</option>
                        <option>No Tag</option>
                    </select>
                </div>

                <!-- Row 3 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All Courier</option>
                        <option>Steadfast</option>
                        <option>Pathao</option>
                        <option>RedX</option>
                        <option>Paperfly</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier Status</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>In Review</option>
                        <option>Delivered</option>
                        <option>Returned</option>
                        <option>Cancelled</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier Success Rate</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All Rate</option>
                        <option>90% - 100%</option>
                        <option>80% - 90%</option>
                        <option>70% - 80%</option>
                        <option>Below 70%</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Courier Charged</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All</option>
                        <option>Charged</option>
                        <option>Not Charged</option>
                    </select>
                </div>

                <!-- Row 4 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Product Category</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100 bg-white custom-select">
                        <option>All Category</option>
                        <option>Other</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <div class="flex justify-between items-center">
                        <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Select Product</label>
                        <label class="flex items-center gap-1 text-[10px] text-gray-500">
                            <input type="checkbox" class="rounded"> Exclude
                        </label>
                    </div>
                    <input type="text" placeholder="Search Product" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                    <div class="flex gap-3 mt-1">
                        <label class="flex items-center gap-1 text-[10px] text-gray-500 cursor-pointer">
                            <input type="checkbox" class="rounded"> Include Returns
                        </label>
                        <label class="flex items-center gap-1 text-[10px] text-gray-500 cursor-pointer">
                            <input type="checkbox" class="rounded"> Only These
                        </label>
                    </div>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">District</label>
                    <select id="filter-order-district" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100 bg-white text-gray-700 custom-select">
                        <option value="">All District</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Payment Status</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All</option>
                    </select>
                </div>

                <!-- Row 5 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Website</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Print Status</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>All</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Email Status</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>Any</option>
                    </select>
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">UTM Source</label>
                    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none custom-select bg-white">
                        <option>Any</option>
                    </select>
                </div>

                <!-- Row 6 -->
                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Product Amount Min</label>
                    <input type="number" placeholder="Min" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Product Amount Max</label>
                    <input type="number" placeholder="Max" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Url</label>
                    <input type="text" placeholder="https://..." class="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                </div>

                <div class="space-y-1">
                    <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-tight">Discount Amount</label>
                    <div class="flex">
                        <input type="number" placeholder="0" class="w-full border border-gray-300 rounded-l-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100">
                        <select class="bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg px-2 text-[10px] outline-none">
                            <option>Greater Than Equal</option>
                            <option>Less Than Equal</option>
                            <option>Equal</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                <button id="btn-apply-filter" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-filter"></i> Apply Filter
                </button>
                <button id="btn-clear-filter" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-xmark"></i> Clear Filter
                </button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-list-check"></i> Order Items
                </button>
                <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-layer-group"></i> Order Sources
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-copy"></i> Duplicate Orders
                </button>
                <button class="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-user-tie"></i> Orders Employee
                </button>
                <button class="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-history"></i> Order Previous Status
                </button>
                <button class="bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 border border-orange-200 shadow-sm">
                    <i class="fa-solid fa-location-dot"></i> Orders by Locations
                </button>
                <button class="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-truck-fast"></i> Courier Statuses
                </button>
            </div>
        </div>
    </div>

    <!-- Order List -->
    <style id="ao-styles">
    /* ── BLOBS ── */
    .blob{position:fixed;border-radius:50%;filter:blur(90px);opacity:.28;animation:floatb 9s ease-in-out infinite;pointer-events:none;z-index:0;}
    .b1{width:500px;height:500px;background:radial-gradient(#c7d2fe,#a5b4fc);top:-140px;left:-160px;animation-delay:0s;}
    .b2{width:380px;height:380px;background:radial-gradient(#e9d5ff,#ddd6fe);bottom:-100px;right:-100px;animation-delay:-4s;}
    .b3{width:240px;height:240px;background:radial-gradient(#fce7f3,#fbcfe8);top:38%;left:52%;animation-delay:-6s;}
    @keyframes floatb{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-30px) scale(1.05);}}

    /* ── MAIN CARD ── */
    .glass-card{
      position:relative;z-index:1;
      width:100%;max-width:1800px;margin:0 auto;
      background:rgba(255,255,255,0.72);
      backdrop-filter:blur(22px) saturate(1.7);
      -webkit-backdrop-filter:blur(22px) saturate(1.7);
      border:1px solid rgba(255,255,255,0.88);
      border-radius:26px;
      box-shadow:0 8px 40px rgba(99,102,241,0.11),0 2px 10px rgba(0,0,0,0.06),0 0 0 1px rgba(99,102,241,0.05);
      overflow:hidden;
    }

    /* ── TOP BAR ── */
    .top-bar{
      background:linear-gradient(90deg,#4f46e5 0%,#7c3aed 55%,#a855f7 100%);
      padding:12px 20px;
      display:flex;align-items:center;justify-content:space-between;
      position:relative;overflow:hidden;
    }
    .top-bar::after{content:'';position:absolute;top:-70%;right:-4%;width:340px;height:340px;
      background:radial-gradient(circle,rgba(255,255,255,0.14),transparent 68%);border-radius:50%;pointer-events:none;}
    .top-bar h2{color:#fff;font-size:18px;font-weight:800;letter-spacing:-.02em;display:flex;align-items:center;gap:10px;margin:0;}
    .id-search{display:flex;align-items:center;background:rgba(255,255,255,0.17);
      border:1px solid rgba(255,255,255,0.32);border-radius:10px;overflow:hidden;backdrop-filter:blur(8px);}
    .id-label{padding:6px 12px;background:rgba(255,255,255,0.2);color:#fff;font-size:12px;font-weight:700;
      letter-spacing:.06em;border-right:1px solid rgba(255,255,255,0.22);}
    .id-input{background:transparent;border:none;outline:none;color:#fff;font-size:13px;
      padding:6px 14px;width:175px;font-family:inherit;}
    .id-input::placeholder{color:rgba(255,255,255,0.5);}

    /* ── CONTROLS ── */
    .ctrl-bar{
      padding:10px 20px;display:flex;align-items:center;justify-content:space-between;
      border-bottom:1px solid rgba(148,163,184,0.18);
      background:rgba(255,255,255,0.38);flex-wrap:wrap;gap:10px;
    }
    .show-lbl{font-size:13px;color:#64748b;display:flex;align-items:center;gap:6px;}
    .styled-sel{background:rgba(255,255,255,0.85);border:1px solid rgba(148,163,184,0.28);
      border-radius:7px;padding:3px 8px;font-size:13px;color:#374151;font-family:inherit;outline:none;cursor:pointer;
      box-shadow:0 1px 4px rgba(99,102,241,0.07);}
    .entry-info{font-size:12px;color:#94a3b8;font-weight:500;}
    .srch-wrap{display:flex;align-items:center;gap:7px;}
    .srch-wrap label{font-size:13px;color:#64748b;font-weight:500;}
    .srch-input{
      background:rgba(255,255,255,0.82);border:1px solid rgba(148,163,184,0.28);
      border-radius:9px;padding:6px 12px 6px 32px;font-size:13px;color:#374151;
      font-family:inherit;outline:none;width:190px;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='13' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E");
      background-repeat:no-repeat;background-position:10px center;
      box-shadow:0 1px 5px rgba(99,102,241,0.07);
      transition:box-shadow .2s,border-color .2s;
    }
    .srch-input:focus{border-color:rgba(99,102,241,0.38);box-shadow:0 0 0 3px rgba(99,102,241,0.1);}

    /* ── TABLE SCROLL ── */
    .tbl-wrap{overflow-x:auto;padding-bottom:4px;}
    .glass-card table{width:100%;border-collapse:collapse;min-width:1400px;}

    /* THEAD */
    .glass-card thead tr{
      background:linear-gradient(90deg,rgba(238,242,255,0.95),rgba(245,243,255,0.95));
      border-bottom:1px solid rgba(148,163,184,0.18);
    }
    .glass-card th{padding:10px 14px;text-align:left;font-size:11.5px;font-weight:700;
      text-transform:uppercase;letter-spacing:.07em;color:#6366f1;white-space:nowrap;}

    /* TBODY */
    .glass-card tbody tr{
      border-bottom:1px solid rgba(148,163,184,0.11);
      transition:background .16s,transform .16s,box-shadow .16s;
      animation:rowIn .42s ease both;
    }
    .glass-card tbody tr:last-child{border-bottom:none;}
    .glass-card tbody tr:hover{
      background:rgba(99,102,241,0.035);
      transform:translateX(3px);
      box-shadow:inset 4px 0 0 #6366f1,0 2px 14px rgba(99,102,241,0.06);
    }
    .glass-card tbody tr:nth-child(1){animation-delay:.07s;}
    .glass-card tbody tr:nth-child(2){animation-delay:.16s;}
    @keyframes rowIn{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}

    .glass-card td{padding:12px 14px;vertical-align:top;font-size:13.5px;color:#374151;}

    /* STATUS */
    .status-badge{
      display:inline-flex;align-items:center;gap:5px;
      padding:4px 10px;border-radius:100px;font-size:11.5px;font-weight:700;letter-spacing:.04em;
      background:linear-gradient(135deg,#d1fae5,#a7f3d0);color:#065f46;
      border:1px solid rgba(16,185,129,0.28);box-shadow:0 0 10px rgba(16,185,129,0.18);
    }
    .sdot{width:6px;height:6px;border-radius:50%;background:#10b981;animation:sdotP 1.7s ease infinite;}
    @keyframes sdotP{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5);}50%{box-shadow:0 0 0 4px rgba(16,185,129,0);}}
    .sl-tag{font-size:11px;color:#94a3b8;font-weight:500;margin-top:4px;display:flex;align-items:center;gap:3px;}

    /* CHECKBOX */
    .cb{width:16px;height:16px;border:1.5px solid #c7d2fe;border-radius:5px;
      background:rgba(255,255,255,0.8);cursor:pointer;accent-color:#6366f1;}

    /* ICON BTN */
    .ibtn{
      display:inline-flex;align-items:center;justify-content:center;
      width:28px;height:28px;border-radius:8px;
      background:rgba(99,102,241,0.07);border:1px solid rgba(99,102,241,0.17);
      color:#6366f1;cursor:pointer;
      transition:background .14s,box-shadow .14s,transform .14s;
    }
    .ibtn:hover{background:rgba(99,102,241,0.15);box-shadow:0 0 9px rgba(99,102,241,0.22);transform:scale(1.1);}
    .ibtn.g{background:rgba(16,185,129,0.07);border-color:rgba(16,185,129,0.2);color:#059669;}
    .ibtn.g:hover{background:rgba(16,185,129,0.15);box-shadow:0 0 9px rgba(16,185,129,0.22);}
    .ibtn.red { background:rgba(239,68,68,0.08); border-color:rgba(239,68,68,0.2); color:#ef4444; }
    .ibtn.red:hover { background:rgba(239,68,68,0.16);box-shadow:0 0 10px rgba(239,68,68,0.25); }

    /* INVOICE */
    .inv-id{font-weight:800;font-size:14.5px;
      background:linear-gradient(90deg,#4f46e5,#7c3aed);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .prod-item{font-size:12.5px;color:#64748b;display:flex;align-items:flex-start;gap:4px;margin-top:3px;}
    .prod-item::before{content:'•';color:#a5b4fc;flex-shrink:0;}
    .vlink{color:#6366f1;font-weight:600;font-size:12px;text-decoration:none;
      border-bottom:1px dashed rgba(99,102,241,0.32);transition:color .14s;}
    .vlink:hover{color:#7c3aed;}

    /* NAME & PHONE */
    .name-txt{font-weight:700;color:#1e293b;font-size:13.5px;margin-bottom:5px;
      display:flex;align-items:center;gap:4px;}
    .phone-chip{
      display:inline-flex;align-items:center;
      background:linear-gradient(90deg,#1e293b,#334155);
      border-radius:9px;overflow:hidden;
      box-shadow:0 2px 10px rgba(30,41,59,0.2);
    }
    .pnum{padding:5px 11px;color:#fff;font-size:12.5px;font-weight:600;letter-spacing:.02em;}
    .pbtn{padding:5px 8px;cursor:pointer;transition:background .13s;border-left:1px solid rgba(255,255,255,0.09);border-top:none;border-bottom:none;border-right:none;}
    .pbtn.wa{background:#25d366;}.pbtn.wa:hover{background:#22c55e;}
    .pbtn.cl{background:#6366f1;}.pbtn.cl:hover{background:#4f46e5;}
    .pbtn.cp{background:#475569;}.pbtn.cp:hover{background:#64748b;}
    .src-tag{font-size:12px;color:#94a3b8;margin-top:5px;display:flex;align-items:center;gap:4px;}
    .src-tag b{color:#6366f1;font-weight:600;}

    /* DATE */
    .dl{font-size:12.5px;margin-bottom:3px;display:flex;align-items:center;gap:5px;color:#374151;}
    .dlbl{font-size:10.5px;font-weight:700;padding:1px 6px;border-radius:4px;letter-spacing:.05em;}
    .dc{background:#dbeafe;color:#1d4ed8;}.du{background:#f3e8ff;color:#7e22ce;}
    .by-t{font-size:11.5px;color:#94a3b8;margin-top:3px;}
    .by-t b{color:#6366f1;}

    /* ADDRESS */
    .addr{font-size:13.5px;color:#374151;font-weight:500;display:flex;align-items:flex-start;gap:5px;}
    .cpaddr{
      display:inline-flex;align-items:center;justify-content:center;
      width:22px;height:22px;border-radius:6px;
      background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.18);
      color:#6366f1;cursor:pointer;margin-left:4px;
      transition:background .13s,box-shadow .13s;
    }
    .cpaddr:hover{background:rgba(99,102,241,0.15);box-shadow:0 0 7px rgba(99,102,241,0.2);}

    /* COURIER */
    .cour-top{display:flex;align-items:center;gap:7px;margin-bottom:5px;flex-wrap:wrap;}
    .cstat{font-size:12.5px;color:#475569;font-weight:500;}
    .cstat b{color:#1e293b;font-weight:700;}
    .new-bdg{padding:2px 8px;border-radius:100px;
      background:linear-gradient(90deg,#e0e7ff,#ede9fe);color:#4338ca;
      font-size:10.5px;font-weight:700;letter-spacing:.05em;border:1px solid #c7d2fe;}
    .bar-track{background:#e2e8f0;border-radius:100px;height:8px;overflow:hidden;margin:4px 0 3px;position:relative;}
    .bar-fill{height:100%;border-radius:100px;width:0%;transition:width 1.3s cubic-bezier(.4,0,.2,1);}
    .bar-pct-lbl{
      position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
      font-size:9.5px;font-weight:700;color:#fff;letter-spacing:.03em;pointer-events:none;
    }
    .bg-green{background:linear-gradient(90deg,#059669,#10b981);box-shadow:0 0 8px rgba(16,185,129,0.32);}
    .bstats{display:flex;gap:10px;font-size:12px;color:#64748b;}
    .bstats .su{color:#059669;font-weight:700;}.bstats .fa{color:#ef4444;font-weight:700;}

    /* SUMMARY */
    .sum-total{font-size:13.5px;color:#374151;font-weight:600;}
    .sum-less{font-size:13px;color:#ef4444;font-weight:600;}
    .sum-paid{font-size:13px;color:#64748b;}
    .sum-due{font-size:13.5px;color:#dc2626;font-weight:700;margin-top:2px;}
    .sum-line{display:flex;align-items:center;gap:5px;margin-bottom:1px;}
    .sum-key{font-size:11.5px;color:#94a3b8;font-weight:500;width:40px;flex-shrink:0;}

    /* EMPLOYEE */
    .emp-badge{
      display:inline-flex;align-items:center;gap:5px;
      padding:4px 10px;border-radius:100px;
      background:linear-gradient(135deg,#ede9fe,#e0e7ff);
      color:#5b21b6;font-size:12px;font-weight:700;
      border:1px solid rgba(139,92,246,0.25);
      box-shadow:0 0 10px rgba(139,92,246,0.12);
    }

    /* PAGINATION */
    .pgn{
      padding:12px 20px;display:flex;align-items:center;justify-content:space-between;
      border-top:1px solid rgba(148,163,184,0.16);
      background:rgba(255,255,255,0.38);flex-wrap:wrap;gap:10px;
    }
    .pinfo{font-size:11.5px;color:#94a3b8;font-weight:500;}
    .pbtns{display:flex;align-items:center;gap:5px;}
    .pbtnp{
      padding:5px 13px;border-radius:8px;font-size:12px;font-weight:600;
      border:1px solid rgba(148,163,184,0.28);
      background:rgba(255,255,255,0.72);color:#64748b;
      cursor:pointer;transition:all .16s;font-family:inherit;
    }
    .pbtnp:hover{background:rgba(255,255,255,0.95);box-shadow:0 2px 8px rgba(99,102,241,0.1);color:#6366f1;}
    .pbtnp.active{
      background:linear-gradient(135deg,#6366f1,#7c3aed);color:#fff;
      border-color:transparent;box-shadow:0 4px 14px rgba(99,102,241,0.32);
    }
    </style>

    <div class="blob b1"></div>
    <div class="blob b2"></div>
    <div class="blob b3"></div>

    <div class="glass-card mb-6">
      <!-- TOP BAR -->
      <div class="top-bar">
        <h2>
          <span style="width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.28);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </span>
          <span class="status-order-list-title">${statusLabel}</span>
        </h2>
        <div class="id-search">
          <div class="id-label">ID</div>
          <input class="id-input" type="text" placeholder="Search by Only ID"/>
        </div>
      </div>

      <!-- CONTROLS -->
      <div class="ctrl-bar">
        <!-- Removed Top Entries Counter -->
        <div class="srch-wrap" style="display:flex; gap:10px; align-items:center;">
          <button onclick="deleteSelectedOrders()" style="background:#ef4444; color:white; padding:7px 14px; border-radius:8px; font-size:12.5px; font-weight:600; border:none; cursor:pointer; box-shadow:0 2px 6px rgba(239,68,68,0.25); display:flex; gap:6px; align-items:center; transition:all 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Delete Selected
          </button>
          <div style="display:flex; align-items:center; gap:5px;">
            <label>Search:</label>
            <input class="srch-input" type="text" id="statusOrderSearch" oninput="filterStatusTable(this.value)" placeholder="Filter orders…"/>
          </div>
        </div>
      </div>

      <!-- TABLE -->
      <div class="tbl-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th><input type="checkbox" id="selectAllStatus" onclick="document.querySelectorAll('.order-row-check').forEach(c=>c.checked=this.checked)" title="Select All" style="cursor:pointer;"/></th>
                      <th>Notes</th>
                      <th>Invoice ID ↓</th>
                      <th>Name &amp; Number</th>
                      <th>Date</th>
                      <th>Address</th>
                      <th>Courier</th>
                      <th>Summary</th>
                      <th>Employee</th>
                    </tr>
                  </thead>
                  <tbody id="statusOrderTable">
                    <tr>
                      <td colspan="10" class="px-4 py-6 text-center text-red-400 bg-gray-50/50 text-xs">No data available in table</td>
                    </tr>
                  </tbody>
                </table>
      </div>

      <!-- PAGINATION -->
      <div class="pgn">
        <span class="pinfo status-entry-info">Showing 0 entries</span>
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
          <div class="show-lbl">
            Show <select class="styled-sel" style="font-size:11px;padding:2px 7px;"><option>10</option><option>25</option><option>50</option></select> entries
          </div>
          <div class="pbtns">
            <button class="pbtnp">← Previous</button>
            <button class="pbtnp active">1</button>
            <button class="pbtnp">Next →</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Action & Summary Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Action Card -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
            <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
                <h2 class="text-gray-800 font-medium text-sm">Action</h2>
            </div>
            <div class="p-4 flex flex-wrap gap-2 border-b border-gray-100">
                <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-print mr-1"></i> Print Selected</button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-barcode mr-1"></i> Print Barcode</button>
                <button class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-print mr-1"></i> Print Info</button>
                <button class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-print mr-1"></i> Print Info 2</button>
                <button class="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-download mr-1"></i> Export</button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-check mr-1"></i> Update Courier Status</button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-check mr-1"></i> Set Followup</button>
                <button class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-exchange-alt mr-1"></i> Transfer Selected</button>
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"><i class="fas fa-times mr-1"></i> Courier Unlink</button>
            </div>
            <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Transfer To*</label>
                    <input type="text" placeholder="Search Employee" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-brand-teal text-gray-600 mb-3">
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-full text-xs font-medium shadow-sm">Transfer Selected</button>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Change Status*</label>
                    <select id="action-change-status" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-brand-teal text-gray-600 bg-white mb-3">
                        <option value="">Select Status</option>
                        <option>Pending</option><option>Confirmed</option><option>Processing</option>
                        <option>Hold</option><option>In Courier</option><option>Delivered</option>
                        <option>Completed</option><option>Canceled</option><option>Returned</option>
                    </select>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-full text-xs font-medium shadow-sm">Change Selected</button>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-800 mb-2">Assign Tag*</label>
                    <select id="action-assign-tag" class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-brand-teal text-gray-600 bg-white mb-3">
                        <option value="">Select Tag</option>
                    </select>
                    <button class="bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-full text-xs font-medium shadow-sm">Change Selected</button>
                </div>
            </div>
        </div>

        <!-- Summary Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
            <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50 rounded-t-lg">
                <h2 class="text-gray-800 font-medium text-sm">Summary</h2>
            </div>
            <div class="p-4 space-y-2">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Product Total: <i class="fas fa-info-circle text-[10px] ml-0.5 text-black"></i></span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Total Shipping:</span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Discount:</span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Grand Total: <i class="fas fa-info-circle text-[10px] ml-0.5 text-black"></i></span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-gray-800">Paid:</span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs pb-2 border-b border-gray-100">
                    <span class="font-bold text-gray-800">Due:</span>
                    <span class="text-gray-600">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs pt-1">
                    <span class="font-bold text-brand-orange">Return/Damage:</span>
                    <span class="text-brand-orange">0.00 Tk</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-brand-orange">Return Discount: <i class="fas fa-info-circle text-[10px] ml-0.5"></i></span>
                    <span class="text-brand-orange">0.00 Tk</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Sales Summary -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <button class="w-full px-4 py-3 flex items-center gap-2 bg-gray-50/50 hover:bg-gray-100/50 transition-colors rounded-lg text-left" onclick="this.nextElementSibling.classList.toggle('hidden');">
            <h2 class="text-gray-800 font-medium text-sm">Sales Summary</h2>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        </button>
        <div class="hidden border-t border-gray-100 overflow-x-auto">
            <table class="w-full text-xs text-left">
                <thead>
                    <tr class="border-b border-gray-200 bg-gray-50/30">
                        <th class="px-4 py-3 font-bold text-gray-800 w-3/4">Type</th>
                        <th class="px-4 py-3 font-bold text-gray-800">Amount</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr><td class="px-4 py-3 text-gray-800">Total Sales Product Total(0 Orders) <i class="fas fa-info-circle text-[10px] text-black ml-0.5"></i></td><td class="px-4 py-3 text-gray-700">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-green-600 font-medium">Total Shipping Charge Collected from Customer(0 Orders)</td><td class="px-4 py-3 text-gray-700">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-gray-800">Order Total with Collected Shipping Charge(0 Orders)</td><td class="px-4 py-3 text-gray-700">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-brand-orange font-semibold">Courier Charge From API(0 Orders)</td><td class="px-4 py-3 text-brand-orange font-semibold">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-brand-orange font-semibold">Courier Charge Other Expense</td><td class="px-4 py-3 text-brand-orange font-semibold">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-brand-orange font-semibold">Total Courier Charge</td><td class="px-4 py-3 text-brand-orange font-semibold">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-gray-800">After Reducing Courier Charge</td><td class="px-4 py-3 font-bold text-gray-800">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-gray-800">Purchase Amount of Sold Items(0 Unit)<br><span class="text-[10px] text-gray-500">The cost are calculated from product's average purchase price!</span></td><td class="px-4 py-3 text-gray-700">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 font-bold text-gray-800">Sales Profit/Loss(0 Unit)</td><td class="px-4 py-3 font-bold text-gray-800">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 text-brand-orange">Other Expense</td><td class="px-4 py-3 text-brand-orange">0.00 Tk</td></tr>
                    <tr><td class="px-4 py-3 font-bold text-gray-800">Net Income</td><td class="px-4 py-3 font-bold text-gray-800">0.00 Tk</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
`;

// Client-side search filter for status orders table
function filterStatusTable(query) {
    const rows = document.querySelectorAll('#statusOrderTable tr');
    const q = query.toLowerCase();
    rows.forEach(row => {
        row.style.display = (row.textContent.toLowerCase().includes(q)) ? '' : 'none';
    });
}
