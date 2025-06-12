import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import conn from '@/lib/connection';
import { RowDataPacket } from 'mysql2';
import { ApiResponse } from '@/types/api';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const productId = formData.get('productId') as string;
    const files = formData.getAll('images') as File[];

    if (!productId) {
      return NextResponse.json({
        status: false,
        message: 'Product ID is required',
        data: null,
      } as ApiResponse<null>, { status: 400 });
    }

    if (!files || files.length === 0) {
      return NextResponse.json({
        status: false,
        message: 'No images provided',
        data: null,
      } as ApiResponse<null>, { status: 400 });
    }

    // Verify product exists
    const [productRows] = await conn.query<(RowDataPacket)[]>(
      'SELECT id FROM products WHERE id = ?',
      [productId]
    );

    if (productRows.length === 0) {
      return NextResponse.json({
        status: false,
        message: 'Product not found',
        data: null,
      } as ApiResponse<null>, { status: 404 });
    }

    const uploadedImages = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue; // Skip non-image files
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const uniqueId = uuidv4();
      const fileExtension = file.name.split('.').pop();
      const filename = `product-${productId}-${uniqueId}.${fileExtension}`;
      const uploadDir = join(process.cwd(), 'public', 'product', '');
      const filepath = join(uploadDir, filename);

      // Save file to disk
      await writeFile(filepath, buffer);

      // Save image info to database
      const [result] = await conn.query(
        'INSERT INTO product_images (product_id, filename, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
        [productId, `product/${filename}`]
      );

      if ('insertId' in result) {
        uploadedImages.push({
          id: result.insertId,
          filename: process.env.URL_APP + '/' + `product/${filename}`,
          created_at: new Date().toISOString()
        });
      }
    }

    return NextResponse.json({
      status: true,
      message: 'Images uploaded successfully',
      data: uploadedImages,
    } as ApiResponse<typeof uploadedImages>);

  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json({
      status: false,
      message: error instanceof Error ? error.message : 'Failed to upload images',
      data: null,
    } as ApiResponse<null>, { status: 500 });
  }
}

// Optional: Add DELETE endpoint to remove images
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imageId');
    const productId = searchParams.get('productId');

    if (!imageId || !productId) {
      return NextResponse.json({
        status: false,
        message: 'Image ID and Product ID are required',
        data: null,
      } as ApiResponse<null>, { status: 400 });
    }

    // Get image filename before deleting
    const [imageRows] = await conn.query<(RowDataPacket)[]>(
      'SELECT filename FROM product_images WHERE id = ? AND product_id = ?',
      [imageId, productId]
    );

    if (imageRows.length === 0) {
      return NextResponse.json({
        status: false,
        message: 'Image not found',
        data: null,
      } as ApiResponse<null>, { status: 404 });
    }

    // Delete from database
    await conn.query(
      'DELETE FROM product_images WHERE id = ? AND product_id = ?',
      [imageId, productId]
    );

    // Delete file from disk
    const filepath = join(process.cwd(), 'public', imageRows[0].filename);
    try {
      await unlink(filepath);
    } catch (error) {
      console.error('Error deleting file from disk:', error);
      // Continue even if file deletion fails
    }

    return NextResponse.json({
      status: true,
      message: 'Image deleted successfully',
      data: { id: imageId },
    } as ApiResponse<{ id: string }>);

  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({
      status: false,
      message: error instanceof Error ? error.message : 'Failed to delete image',
      data: null,
    } as ApiResponse<null>, { status: 500 });
  }
} 