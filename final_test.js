const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function finalTest() {
    console.log('Testing insert with "name" instead of "customer_name"...');
    const { error } = await supabase.from('orders').insert([{
        name: 'Test Customer',
        customer_phone: '01712345678',
        amount: 100,
        status: 'Pending'
    }]);
    
    if (error) {
        console.log('Final test FAILED:', error.message);
    } else {
        console.log('Final test SUCCESS! The column is likely "name".');
    }
}

finalTest();
