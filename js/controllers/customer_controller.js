async function fetchCustomers() {
    const { data, error } = await _supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching customers:', error);
        return;
    }

    renderCustomersTable(data);
    
    // Setup Search (Dynamic)
    const oldSearchInput = document.getElementById('customer-search');
    if (oldSearchInput) {
        // Clone to remove any existing event listeners from previous renders
        const searchInput = oldSearchInput.cloneNode(true);
        oldSearchInput.parentNode.replaceChild(searchInput, oldSearchInput);
        
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = data.filter(c => 
                (c.name && c.name.toLowerCase().includes(term)) || 
                (c.phone && c.phone.includes(term)) || 
                (c.email && c.email.toLowerCase().includes(term))
            );
            renderCustomersTable(filtered);
        });
    }
}

function renderCustomersTable(customers) {
    const table = document.getElementById('customers-table-body');
    if (!table) return;

    if (customers.length === 0) {
        table.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-gray-500">No customers found</td></tr>';
        return;
    }

    table.innerHTML = customers.map((c, idx) => `
        <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors text-[11px]">
            <td class="px-4 py-3">${idx + 1}</td>
            <td class="px-4 py-3 font-medium">${c.name}<br><span class="text-gray-400 text-[10px]">${c.phone}</span></td>
            <td class="px-4 py-3">${c.total_orders}</td>
            <td class="px-4 py-3 font-bold">${c.total_amount}৳</td>
            <td class="px-4 py-3">
                <span class="px-2 py-0.5 rounded-full text-[10px] bg-green-100 text-green-700 font-medium">${c.status}</span>
            </td>
            <td class="px-4 py-3 text-right">
                <button class="text-blue-500 hover:text-blue-700 mr-2"><i class="fas fa-edit"></i></button>
                <button class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}


