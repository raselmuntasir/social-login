
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function debugData() {
    console.log('--- ADMINS ---');
    const { data: admins } = await supabase.from('admins').select('*, roles(id, name)');
    console.log(JSON.stringify(admins, null, 2));

    console.log('--- ROLES ---');
    const { data: roles } = await supabase.from('roles').select('*');
    console.log(JSON.stringify(roles, null, 2));

    console.log('--- PRODUCTS ---');
    const { data: products } = await supabase.from('products').select('*').limit(2);
    console.log(JSON.stringify(products, null, 2));

    console.log('--- CATEGORIES ---');
    const { data: categories } = await supabase.from('categories').select('*');
    console.log(JSON.stringify(categories, null, 2));

    console.log('--- BRANDS ---');
    const { data: brands } = await supabase.from('brands').select('*');
    console.log(JSON.stringify(brands, null, 2));
}

debugData();
