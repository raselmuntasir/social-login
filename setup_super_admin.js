
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function setupSuperAdmin() {
    console.log('Setting up Super Admin role...');

    // 1. Create Super Admin role
    const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .upsert([{ name: 'Super Admin', permissions: ['all'] }], { onConflict: 'name' })
        .select();

    if (roleError) {
        console.error('Error creating role:', roleError);
        return;
    }

    const superAdminRoleId = roleData[0].id;
    console.log('Super Admin Role ID:', superAdminRoleId);

    // 2. Assign this role to MD Rasel
    const { error: adminError } = await supabase
        .from('admins')
        .update({ role_id: superAdminRoleId })
        .eq('email', 'raselmoontasir@gmail.com');

    if (adminError) {
        console.error('Error updating admin:', adminError);
    } else {
        console.log('MD Rasel is now a Super Admin.');
    }
}

setupSuperAdmin();
