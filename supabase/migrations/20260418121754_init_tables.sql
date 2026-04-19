-- 1. Create Roles table
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insert default roles
INSERT INTO roles (name, permissions) VALUES 
('Inventory Employee', '["view_inventory", "edit_inventory"]'),
('Manager', '["all"]'),
('Order Employee', '["view_orders", "edit_orders"]'),
('Sub Admin', '["all_except_billing"]')
ON CONFLICT (name) DO NOTHING;

-- 3. Create Customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    address TEXT,
    total_orders INTEGER DEFAULT 0,
    total_amount DECIMAL DEFAULT 0,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Admins table
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role_id INTEGER REFERENCES roles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Orders table (if not exists)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name TEXT,
    customer_phone TEXT,
    product_name TEXT,
    amount DECIMAL DEFAULT 0,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    customer_id INTEGER REFERENCES customers(id)
);

-- 6. Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 7. Create Policies
CREATE POLICY "Allow all for orders" ON orders FOR ALL TO public USING (true);
CREATE POLICY "Allow all for customers" ON customers FOR ALL TO public USING (true);
CREATE POLICY "Allow all for roles" ON roles FOR ALL TO public USING (true);
CREATE POLICY "Allow all for admins" ON admins FOR ALL TO public USING (true);
