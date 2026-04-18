const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkSchema() {
    console.log('Checking orders table schema...');
    
    // Try to fetch one row to see columns
    const { data, error } = await supabase.from('orders').select('*').limit(1);
    
    if (error) {
        console.error('Error fetching orders:', error.message);
    } else {
        console.log('Columns found in orders table:', Object.keys(data[0] || {}));
        if (data.length === 0) {
            console.log('Table is empty, trying another way...');
            // Try to insert a dummy row with only one column to trigger a column error
            const { error: insertError } = await supabase.from('orders').insert([{ some_fake_column: 'test' }]);
            console.log('Insert error response (should list columns if it fails):', insertError.message);
        }
    }
}

checkSchema();
