import conn from "@/lib/connection";
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';
import { ApiResponse, Product} from '../../../types/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    let query = `
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
    `;

    const queryParams: (string | number)[] = [];

    if (slug) {
      query += ` WHERE A.slug = ?`;
      queryParams.push(slug);
    }

    query += ` ORDER BY A.created_at DESC`;

    const [rows] = await conn.query<(RowDataPacket)[]>(query, queryParams);

    const productsMap: { [key: number]: Product } = {};
    for (const row of rows) {
      const productId = row.product_id;
      if (!productsMap[productId]) {
        productsMap[productId] = {
          id: row.product_id,
          slug: row.product_slug,
          name: row.product_name,
          price_start: row.product_price_start,
          price_end: row.product_price_end,
          category: row.product_category,
          subcategory: row.product_subcategory,
          description: row.product_description,
          image_file: [],
        };
      }

      if (row.image_id) {
        productsMap[productId].image_file.push({
          id: row.image_id,
          product_id: row.image_product_id,
          filename: row.image_filename,
          created_at: row.image_created_at,
        });
      }
    }

    const products = Object.values(productsMap);

    return NextResponse.json({
      status: true,
      message: 'Products retrieved successfully',
      data: products,
    } as ApiResponse<Product[]>);
  } catch (error: Error | unknown) {
    return NextResponse.json({
      status: false,
      message: 'Failed to retrieve products',
      data: { error: error instanceof Error ? error.message : 'Unknown error' },
    } as ApiResponse<{ error: string }>, { status: 500 });
  }
}