import { mkdir } from 'fs/promises';
import { join } from 'path';

async function ensureUploadDirs() {
  const uploadDir = join(process.cwd(), 'public', 'product', '');
  try {
    await mkdir(uploadDir, { recursive: true });
    console.log('Upload directories created successfully');
  } catch (error) {
    console.error('Error creating upload directories:', error);
  }
}

ensureUploadDirs(); 