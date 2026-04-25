function initProductForm() {
    const submitBtn = document.getElementById('submit-product');
    const imageInput = document.getElementById('prod-image-input');
    const previewContainer = document.getElementById('prod-image-preview-container');
    const placeholder = document.getElementById('prod-image-placeholder');
    const previewImg = document.getElementById('prod-image-preview');

    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (previewImg) previewImg.src = event.target.result;
                    if (placeholder) placeholder.classList.add('hidden');
                    if (previewContainer) previewContainer.classList.remove('hidden');
                }
                reader.readAsDataURL(file);
            }
        });
    }

    if (!submitBtn) return;

    submitBtn.addEventListener('click', async () => {
        let imageUrl = '';
        const file = imageInput?.files[0];

        submitBtn.innerText = 'Uploading Image...';
        submitBtn.disabled = true;

        if (file) {
            try {
                // Compress product image to max 1000x1000
                const compressedBlob = await compressImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.7 });
                
                const fileName = `product_${Date.now()}.jpg`;
                const { data, error } = await _supabase.storage
                    .from('product-images')
                    .upload(fileName, compressedBlob, { contentType: 'image/jpeg' });

                if (error) {
                    console.warn('Storage upload failed (Bucket might not exist):', error);
                    // Fallback: If storage fails, we could use base64 (but it's large)
                    // For now, let's just alert
                    if (error.message.includes('bucket not found')) {
                        alert('Warning: Please create a public bucket named "product-images" in your Supabase Storage to save images.');
                    }
                } else {
                    const { data: urlData } = _supabase.storage
                        .from('product-images')
                        .getPublicUrl(fileName);
                    imageUrl = urlData.publicUrl;
                }
            } catch (err) {
                console.error('Image upload error:', err);
            }
        }

        const productData = {
            title: document.getElementById('prod-title')?.value,
            short_description: document.getElementById('prod-short-desc')?.value,
            description: document.getElementById('product-description')?.value,
            regular_price: parseFloat(document.getElementById('prod-regular-price')?.value || 0),
            sale_price: parseFloat(document.getElementById('prod-sale-price')?.value || 0),
            sku: document.getElementById('prod-sku')?.value || ('SKU' + Date.now().toString().slice(-6)),
            unit: document.getElementById('prod-unit')?.value,
            unit_amount: parseFloat(document.getElementById('prod-unit-amount')?.value || 1),
            category: document.getElementById('prod-category')?.value || '',
            brand: document.getElementById('prod-brand')?.value || '',
            product_group: document.getElementById('prod-group')?.value || 'Finished Goods',
            followup_days: parseInt(document.getElementById('prod-followup')?.value || 0),
            type: document.getElementById('prod-type')?.value,
            stock: 0, // default stock
            image: imageUrl,
            created_at: new Date().toISOString()
        };

        if (!productData.title || !productData.sale_price) {
            alert('Please fill in required fields (Title and Sale Price)');
            submitBtn.innerText = 'Create';
            submitBtn.disabled = false;
            return;
        }

        submitBtn.innerText = 'Creating Product...';

        try {
            const { error } = await _supabase.from('products').insert([productData]);
            if (error) throw error;
            alert('Product created successfully!');
            window.location.hash = '#/products';
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product.');
        } finally {
            submitBtn.innerText = 'Create';
            submitBtn.disabled = false;
        }
    });
}

window.removeProductImage = function() {
    const imageInput = document.getElementById('prod-image-input');
    const previewContainer = document.getElementById('prod-image-preview-container');
    const placeholder = document.getElementById('prod-image-placeholder');
    const previewImg = document.getElementById('prod-image-preview');

    if (imageInput) imageInput.value = '';
    if (previewContainer) previewContainer.classList.add('hidden');
    if (placeholder) placeholder.classList.remove('hidden');
    if (previewImg) previewImg.src = '#';
}

window.selectedOrderProducts = []; // Global state for order products

async function fetchProductsForOrder() {
    const searchBox = document.getElementById('product-search-box');
    const searchInput = document.getElementById('product-search-input');
    const dropdownList = document.getElementById('product-dropdown-list');
    
    if (!searchBox || !searchInput || !dropdownList) return;

    // Reset state on load
    window.selectedOrderProducts = [];
    renderSelectedProductsTable();

    let products = [];
    
    try {
        const { data, error } = await _supabase.from('products').select('*');
        if (error) throw error;
        products = data || [];
    } catch (error) {
        console.error('Error fetching products for order:', error);
        return;
    }

    // Render Dropdown Items
    const renderDropdown = (filterText = '') => {
        const filtered = products.filter(p => p.title.toLowerCase().includes(filterText.toLowerCase()));
        
        if (filtered.length === 0) {
            dropdownList.innerHTML = '<div class="p-4 text-center text-xs text-gray-500 italic">No products found</div>';
            return;
        }

        dropdownList.innerHTML = filtered.map(p => `
            <div class="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer flex items-center gap-3 transition-colors product-option" data-id="${p.id}">
                <div class="w-8 h-8 rounded bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                    ${p.image ? `<img src="${p.image}" class="w-full h-full object-cover">` : `<i class="fas fa-box text-gray-400 text-xs"></i>`}
                </div>
                <div class="flex-1">
                    <div class="text-[13px] font-bold text-gray-800">${p.title}</div>
                    <div class="text-[10px] text-gray-500 font-medium">${p.sale_price}৳</div>
                </div>
            </div>
        `).join('');

        // Attach click events
        dropdownList.querySelectorAll('.product-option').forEach(el => {
            el.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const selectedProduct = products.find(prod => prod.id == id);
                if (selectedProduct) {
                    addProductToTable(selectedProduct);
                    dropdownList.classList.add('hidden');
                    searchInput.value = '';
                    renderDropdown(''); // reset
                }
            });
        });
    };

    // Toggle Dropdown
    searchBox.addEventListener('click', (e) => {
        dropdownList.classList.toggle('hidden');
        if (!dropdownList.classList.contains('hidden')) {
            searchInput.focus();
        }
    });

    // Handle Search input
    searchInput.addEventListener('input', (e) => {
        dropdownList.classList.remove('hidden');
        renderDropdown(e.target.value);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && !dropdownList.contains(e.target)) {
            dropdownList.classList.add('hidden');
        }
    });

    // Initial render
    renderDropdown('');
}

function addProductToTable(product) {
    const existing = window.selectedOrderProducts.find(p => p.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        window.selectedOrderProducts.push({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.sale_price || 0,
            quantity: 1,
            discount: 0
        });
    }
    renderSelectedProductsTable();
}

window.removeSelectedProduct = function(id) {
    window.selectedOrderProducts = window.selectedOrderProducts.filter(p => p.id != id);
    renderSelectedProductsTable();
};

window.updateProductQuantity = function(id, delta) {
    const item = window.selectedOrderProducts.find(p => p.id == id);
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) item.quantity = 1;
        renderSelectedProductsTable();
    }
};

window.updateProductPrice = function(id, value) {
    const item = window.selectedOrderProducts.find(p => p.id == id);
    if (item) {
        item.price = parseFloat(value) || 0;
        renderSelectedProductsTable();
    }
};

window.updateProductDiscount = function(id, value) {
    const item = window.selectedOrderProducts.find(p => p.id == id);
    if (item) {
        item.discount = parseFloat(value) || 0;
        renderSelectedProductsTable();
    }
};

function renderSelectedProductsTable() {
    const tbody = document.getElementById('selected-products-body');
    if (!tbody) return;

    if (window.selectedOrderProducts.length === 0) {
        tbody.innerHTML = `
            <tr id="empty-product-row">
                <td colspan="6" class="py-8 text-center text-gray-400 italic text-xs border-b border-x border-gray-200">No products selected</td>
            </tr>
        `;
        const subtotalInput = document.getElementById('subtotal');
        if(subtotalInput) {
            subtotalInput.value = 0;
            subtotalInput.dispatchEvent(new Event('input'));
        }
        return;
    }

    let totalSubtotal = 0;

    tbody.innerHTML = window.selectedOrderProducts.map(p => {
        const rowSubtotal = (p.price * p.quantity) - p.discount;
        totalSubtotal += rowSubtotal;

        return `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="py-2 px-4 border-r border-gray-100">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                            ${p.image ? `<img src="${p.image}" class="w-full h-full object-cover">` : `<i class="fas fa-box text-gray-400 text-xs"></i>`}
                        </div>
                        <div class="text-[13px] text-gray-800">${p.title} <br><span class="text-gray-400 text-[11px]">(${p.quantity} Unit)</span></div>
                    </div>
                </td>
                <td class="py-2 px-4 border-r border-gray-100 text-center">
                    <div class="w-5 h-5 bg-black rounded-full mx-auto shadow-sm"></div>
                </td>
                <td class="py-2 px-4 border-r border-gray-100">
                    <input type="number" value="${p.price}" onchange="updateProductPrice(${p.id}, this.value)" class="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500">
                </td>
                <td class="py-2 px-4 border-r border-gray-100 text-center">
                    <div class="flex items-center justify-center gap-1">
                        <button onclick="updateProductQuantity(${p.id}, -1)" class="w-6 h-6 bg-gray-500 text-white rounded flex items-center justify-center hover:bg-gray-600 focus:outline-none"><i class="fas fa-minus text-[10px]"></i></button>
                        <input type="text" value="${p.quantity}" readonly class="w-10 text-center border border-gray-300 rounded py-1 text-sm bg-white">
                        <button onclick="updateProductQuantity(${p.id}, 1)" class="w-6 h-6 bg-gray-500 text-white rounded flex items-center justify-center hover:bg-gray-600 focus:outline-none"><i class="fas fa-plus text-[10px]"></i></button>
                    </div>
                </td>
                <td class="py-2 px-4 border-r border-gray-100">
                    <input type="number" value="${p.discount}" onchange="updateProductDiscount(${p.id}, this.value)" class="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500">
                </td>
                <td class="py-2 px-4">
                    <input type="text" value="${rowSubtotal}" readonly class="w-24 border border-gray-200 bg-gray-100 rounded px-2 py-1 text-sm text-gray-500 mb-1 cursor-not-allowed">
                    <a href="javascript:void(0)" onclick="removeSelectedProduct(${p.id})" class="block text-xs text-orange-500 hover:text-orange-700">Remove</a>
                </td>
            </tr>
        `;
    }).join('');

    // Update main subtotal in the order calculations
    const mainSubtotalInput = document.getElementById('subtotal');
    if (mainSubtotalInput) {
        mainSubtotalInput.value = totalSubtotal;
        mainSubtotalInput.dispatchEvent(new Event('input')); // Trigger recalculation of Total Amount
    }
}

async function fetchAllProducts() {
    const table = document.getElementById('productListTable');
    if (!table) return;

    try {
        const { data, error } = await _supabase.from('products').select('*').order('created_at', { ascending: false });
        if (error) throw error;

        if (data.length === 0) {
            table.innerHTML = '<tr><td colspan="11" class="px-4 py-8 text-center text-gray-400 italic">No products found</td></tr>';
            return;
        }

        window.allProductsList = data; // Store globally for action buttons
        table.innerHTML = data.map((p, idx) => `
            <tr class="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                <td class="px-3 py-3 border-r border-gray-100 text-center">${idx + 1}</td>
                <td class="px-3 py-3 border-r border-gray-100 text-center"><input type="checkbox" class="rounded border-gray-300"></td>
                <td class="px-3 py-3 border-r border-gray-100 font-medium">${p.title}</td>
                <td class="px-3 py-3 border-r border-gray-100 text-gray-500">${p.sku || '-'}</td>
                <td class="px-3 py-3 border-r border-gray-100 text-center">
                    <img src="${p.image || 'https://via.placeholder.com/40'}" class="w-8 h-8 rounded border object-cover mx-auto">
                </td>
                <td class="px-3 py-3 border-r border-gray-100">${p.type || 'Simple'}</td>
                <td class="px-3 py-3 border-r border-gray-100">${p.regular_price || 0}৳</td>
                <td class="px-3 py-3 border-r border-gray-100 font-bold">${p.sale_price}৳</td>
                <td class="px-3 py-3 border-r border-gray-100">
                    <span class="px-2 py-0.5 rounded-full text-[10px] ${p.stock <= 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} font-bold">${p.stock || 0} In Stock</span>
                </td>
                <td class="px-3 py-3 border-r border-gray-100">
                    <span class="px-2 py-0.5 rounded-full text-[10px] bg-green-100 text-green-700 font-medium">Active</span>
                </td>
                <td class="px-3 py-3 text-right">
                    <button onclick="printBarcode(${p.id})" class="text-gray-500 hover:text-gray-800 mr-2" title="Print Barcode"><i class="fas fa-barcode"></i></button>
                    <button class="text-blue-500 hover:text-blue-700 mr-2" title="Edit"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteProduct(${p.id})" class="text-red-500 hover:text-red-700" title="Delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching all products:', error);
    }
}

window.deleteProduct = async function(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        const { error } = await _supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        
        alert('Product deleted successfully!');
        fetchAllProducts(); // Refresh the list
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
    }
}

// Print Barcode Logic
window.printBarcode = function(id) {
    if (!window.allProductsList) return;
    
    const product = window.allProductsList.find(p => p.id === id);
    if (!product) return;

    if (!product.sku) {
        alert('This product does not have an SKU to generate a barcode.');
        return;
    }
    
    const printWindow = window.open('', '_blank', 'width=600,height=400');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Barcode - ${product.title}</title>
            <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
            <style>
                body { font-family: sans-serif; text-align: center; padding: 20px; }
                .barcode-container { display: inline-block; padding: 15px; border: 1px dashed #ccc; margin: 10px; }
                .title { font-size: 14px; font-weight: bold; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
                .price { font-size: 16px; font-weight: 900; margin-top: 5px; }
            </style>
        </head>
        <body>
            <div class="barcode-container">
                <div class="title">${product.title}</div>
                <svg id="barcode"></svg>
                <div class="price">${product.sale_price ? product.sale_price + '৳' : ''}</div>
            </div>
            <script>
                JsBarcode("#barcode", "${product.sku}", {
                    format: "CODE128",
                    width: 2,
                    height: 50,
                    displayValue: true,
                    fontSize: 14
                });
                setTimeout(() => {
                    window.print();
                }, 500);
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
};

// General Settings Initialization & Save Logic
