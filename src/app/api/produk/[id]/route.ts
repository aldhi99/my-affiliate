import conn from '@/lib/connection';
import { NextResponse } from 'next/server';
import { ApiResponse, Product } from '../../../../types/api';
import { RowDataPacket } from 'mysql2';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    console.log('Received ID in API:', id, 'Type:', typeof id);
    
    const productId = id;
    
    const [rows] = await conn.query<(Product & RowDataPacket)[]>(
        `
        SELECT 
        A.id AS product_id,
        A.name AS product_name,
        A.price_start AS product_price_start,
        A.price_end AS product_price_end,
        A.created_at AS product_created_at,
        A.slug AS product_slug,
        A.category AS product_category,
        A.subcategory AS product_subcategory,
        A.description AS product_description,
        B.updated_at AS product_updated_at,
        B.id AS image_id,
        B.product_id AS image_product_id,
        B.filename AS image_filename,
        B.created_at AS image_created_at,
        A.url_tiktok AS product_url_tiktok,
        A.url_shopee AS product_url_shopee,
        A.url_tokopedia AS product_url_tokopedia
        FROM products A
        LEFT JOIN product_images B ON A.id = B.product_id
        WHERE A.id = ?
        ORDER BY A.created_at DESC
        `, [productId]
    );

    console.log('Database query result:', rows);

    if (rows.length === 0) {
      return NextResponse.json({
        status: false,
        message: 'Product not found',
        data: null,
      } as ApiResponse<Product>, { status: 404 });
    }

    const product: Product = {
      id: rows[0].product_id.toString(),
      slug: rows[0].product_slug,
      name: rows[0].product_name,
      price_start: rows[0].product_price_start,
      price_end: rows[0].product_price_end,
      category: rows[0].product_category,
      subcategory: rows[0].product_subcategory,
      description: rows[0].product_description,
      url_tiktok: rows[0].product_url_tiktok || '',
      url_shopee: rows[0].product_url_shopee || '',
      url_tokopedia: rows[0].product_url_tokopedia || '',
      image_file: []
    };

    console.log('Raw product data:', JSON.stringify(rows[0], null, 2));
    console.log('Processed product:', JSON.stringify(product, null, 2));

    rows.forEach(row => {
      if (row.image_id) {
        product.image_file.push({
          id: row.image_id,
          filename: process.env.URL_APP + '/' + row.image_filename,
          created_at: row.image_created_at
        });
      }
    });

    return NextResponse.json({
      status: true,
      message: 'Product retrieved successfully',
      data: product,
    } as ApiResponse<Product>);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({
      status: false,
      message: `Failed to retrieve product: ${message}`,
      data: null,
    } as ApiResponse<Product>, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log('Update product - Received ID:', id, 'Type:', typeof id);

    const rawBody = await request.text();
    console.log('Update product - Raw request body:', rawBody);

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (e) {
      console.error('Update product - Failed to parse request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body format' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ['name', 'price_start', 'price_end', 'category', 'subcategory', 'description'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // URL fields are optional, convert null/undefined to empty string
    const urlFields = ['url_tiktok', 'url_shopee', 'url_tokopedia'];
    urlFields.forEach(field => {
      if (!data[field]) {
        data[field] = '';
      }
    });

    const query = `
      UPDATE products 
      SET 
        name = ?, 
        price_start = ?, 
        price_end = ?, 
        category = ?, 
        subcategory = ?, 
        description = ?,
        url_tiktok = ?,
        url_shopee = ?,
        url_tokopedia = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const values = [
      data.name,
      data.price_start,
      data.price_end,
      data.category,
      data.subcategory,
      data.description,
      data.url_tiktok || '',
      data.url_shopee || '',
      data.url_tokopedia || '',
      id
    ];

    const [result] = await conn.query(query, values);

    console.log('Update result:', result);

    // Check if any rows were affected
    if ('affectedRows' in result && result.affectedRows === 0) {
      return NextResponse.json({
        status: false,
        message: 'Product not found',
        data: null,
      } as ApiResponse<null>, { status: 404 });
    }

    return NextResponse.json({
      status: true,
      message: 'Product updated successfully',
      data: { id },
    } as ApiResponse<{ id: string }>);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({
      status: false,
      message: error instanceof Error ? error.message : 'Failed to update product',
      data: null,
    } as ApiResponse<null>, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log('Delete product - Received ID:', id, 'Type:', typeof id);

    // First, delete associated images
    await conn.query('DELETE FROM product_images WHERE product_id = ?', [id]);

    // Then delete the product
    const [result] = await conn.query('DELETE FROM products WHERE id = ?', [id]);

    console.log('Delete result:', result);

    // Check if any rows were affected
    if ('affectedRows' in result && result.affectedRows === 0) {
      return NextResponse.json({
        status: false,
        message: 'Product not found',
        data: null,
      } as ApiResponse<null>, { status: 404 });
    }

    return NextResponse.json({
      status: true,
      message: 'Product deleted successfully',
      data: { id },
    } as ApiResponse<{ id: string }>);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({
      status: false,
      message: error instanceof Error ? error.message : 'Failed to delete product',
      data: null,
    } as ApiResponse<null>, { status: 500 });
  }
}