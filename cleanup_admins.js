
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function cleanupAdmins() {
    console.log('Cleaning up admins table...');

    // Delete all admins EXCEPT the Super Admin (raselmoontasir@gmail.com)
    const { data, error } = await supabase
        .from('admins')
        .delete()
        .neq('email', 'raselmoontasir@gmail.com');

    if (error) {
        console.error('Error during cleanup:', error);
    } else {
        console.log('Cleanup successful. All admins deleted except Super Admin.');
    }
}

cleanupAdmins();
