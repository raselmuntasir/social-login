const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testInsert() {
    const cols = ['customer_name', 'customer_phone', 'customer_address', 'district', 'amount', 'product_name', 'status', 'created_at'];
    
    for (const col of cols) {
        console.log(`Testing column: ${col}...`);
        const { error } = await supabase.from('orders').insert([{ [col]: 'test' }]);
        if (error) {
            console.log(`Column ${col} FAILED: ${error.message}`);
        } else {
            console.log(`Column ${col} is OK!`);
        }
    }
}

testInsert();
