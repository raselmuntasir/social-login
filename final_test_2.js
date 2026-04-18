const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function finalTest2() {
    console.log('Testing insert with simplified column names...');
    const { error } = await supabase.from('orders').insert([{
        name: 'Test Customer',
        phone: '01712345678',
        address: 'Test Address',
        district: 'Dhaka',
        amount: 100,
        product_name: 'Test Product',
        status: 'Pending'
    }]);
    
    if (error) {
        console.log('Final test 2 FAILED:', error.message);
    } else {
        console.log('Final test 2 SUCCESS!');
    }
}

finalTest2();
