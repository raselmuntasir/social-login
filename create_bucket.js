const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cmdculyngchoxcnzaypt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGN1bHluZ2Nob3hjbnpheXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjU3NDQsImV4cCI6MjA5MjAwMTc0NH0.gCks8rNvyQ9hV8vR3oVkrEN5WaLGuN0aja6SK-gY7g0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createBucket() {
    console.log('Attempting to create bucket "product-images"...');
    const { data, error } = await supabase.storage.createBucket('product-images', {
        public: true,
        fileSizeLimit: 1024 * 1024 * 2, // 2MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif']
    });

    if (error) {
        console.error('Error creating bucket:', error.message);
        if (error.message.includes('403')) {
            console.log('Permission denied. You likely need a service_role key to create buckets via API.');
        }
    } else {
        console.log('Bucket "product-images" created successfully!', data);
    }
}

createBucket();
