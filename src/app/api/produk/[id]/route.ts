import conn from '@/lib/connection';
import { NextResponse } from 'next/server';
import { ApiResponse, Product } from '../../../../types/api';
import { RowDataPacket } from 'mysql2';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({
        status: false,
        message: 'Invalid ID format',
        data: null,
      } as ApiResponse<Product>, { status: 400 });
    }

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
        B.created_at AS image_created_at
        FROM products A
        LEFT JOIN product_images B ON A.id = B.product_id
        WHERE A.id = ?
        ORDER BY A.created_at DESC
        `, [id]
    );

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
      image_file: []
    };

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