import conn from "@/lib/connection";
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';
import { ApiResponse, Product } from '../../../types/api';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  try {
    console.log('Starting products API request...');
    const { searchParams } = new URL(request.url);
    console.log('Search params:', Object.fromEntries(searchParams.entries()));

    const slug = searchParams.get('slug');
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '10');
    const search = searchParams.get('search');

    console.log('Parsed parameters:', { slug, page, size, search });

    // Calculate offset for pagination
    const offset = (page - 1) * size;

    // Base query for counting total items
    let countQuery = `
      SELECT COUNT(DISTINCT A.id) as total
      FROM products A
    `;

    // Base query for fetching products
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
        A.url_tiktok AS product_url_tiktok,
        A.url_shopee AS product_url_shopee,
        A.url_tokopedia AS product_url_tokopedia,
        B.updated_at AS product_updated_at,
        B.id AS image_id,
        B.product_id AS image_product_id,
        B.filename AS image_filename,
        B.created_at AS image_created_at
      FROM products A
      LEFT JOIN product_images B ON A.id = B.product_id
    `;

    const queryParams: (string | number)[] = [];
    const whereConditions: string[] = [];

    if (slug) {
      whereConditions.push('A.slug = ?');
      queryParams.push(slug);
    }

    if (search) {
      whereConditions.push('(A.name LIKE ? OR A.description LIKE ? OR A.category LIKE ? OR A.subcategory LIKE ?)');
      const searchPattern = `%${search}%`;
      queryParams.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    if (whereConditions.length > 0) {
      const whereClause = ' WHERE ' + whereConditions.join(' AND ');
      query += whereClause;
      countQuery += whereClause;
    }

    // Add pagination to the main query
    query += ` ORDER BY A.created_at DESC LIMIT ? OFFSET ?`;
    queryParams.push(size, offset);

    console.log('Count query:', countQuery);
    console.log('Main query:', query);
    console.log('Query parameters:', queryParams);

    try {
      // Execute both queries
      console.log('Executing count query...');
      const [countResult] = await conn.query<(RowDataPacket)[]>(countQuery, queryParams.slice(0, -2));
      console.log('Count result:', countResult);

      console.log('Executing main query...');
      const [rows] = await conn.query<(RowDataPacket)[]>(query, queryParams);
      console.log('Query returned rows:', rows.length);

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / size);

      console.log('Pagination info:', { totalItems, totalPages, currentPage: page, itemsPerPage: size });

      const productsMap: { [key: number]: Product } = {};
      for (const row of rows) {
        const productId = row.product_id;
        if (!productsMap[productId]) {
          productsMap[productId] = {
            id: row.product_id.toString(),
            slug: row.product_slug,
            name: row.product_name,
            price_start: row.product_price_start,
            price_end: row.product_price_end,
            category: row.product_category,
            subcategory: row.product_subcategory,
            description: row.product_description,
            url_tiktok: row.product_url_tiktok,
            url_shopee: row.product_url_shopee,
            url_tokopedia: row.product_url_tokopedia,
            image_file: [],
          };
        }

        if (row.image_id) {
          productsMap[productId].image_file.push({
            id: row.image_id,
            filename: process.env.URL_APP + '/' + row.image_filename,
            created_at: row.image_created_at,
          });
        }
      }

      const products = Object.values(productsMap);
      console.log('Processed products:', products.length);
      console.log('First product:', JSON.stringify(products[0], null, 2));
      console.log('Second product:', JSON.stringify(products[1], null, 2));

      return NextResponse.json({
        status: true,
        message: 'Products retrieved successfully',
        data: {
          items: products,
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
          items_per_page: size,
        },
      } as ApiResponse<{
        items: Product[];
        current_page: number;
        total_pages: number;
        total_items: number;
        items_per_page: number;
      }>);
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw dbError; // Re-throw to be caught by outer try-catch
    }
  } catch (error: Error | unknown) {
    console.error('Error in products API:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json({
      status: false,
      message: 'Failed to retrieve products',
      data: { 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      },
    } as ApiResponse<{ error: string; details?: string }>, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('Creating new product...');
    const rawBody = await request.text();
    console.log('Raw request body:', rawBody);

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return NextResponse.json({
        status: false,
        message: 'Invalid request body format',
        data: null,
      } as ApiResponse<null>, { status: 400 });
    }

    // Validate required fields
    const requiredFields = ['name', 'price_start', 'price_end', 'category', 'subcategory', 'description'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        status: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        data: null,
      } as ApiResponse<null>, { status: 400 });
    }

    // URL fields are optional, convert null/undefined to empty string
    const urlFields = ['url_tiktok', 'url_shopee', 'url_tokopedia'];
    urlFields.forEach(field => {
      if (!data[field]) {
        data[field] = '';
      }
    });

    // Generate UUID for id
    const id = uuidv4();
    console.log('Generated UUID:', id);

    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const query = `
      INSERT INTO products (
        id,
        name, 
        price_start, 
        price_end, 
        category, 
        subcategory, 
        description,
        url_tiktok,
        url_shopee,
        url_tokopedia,
        slug,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    const values = [
      id,
      data.name,
      data.price_start,
      data.price_end,
      data.category,
      data.subcategory,
      data.description,
      data.url_tiktok || '',
      data.url_shopee || '',
      data.url_tokopedia || '',
      slug
    ];

    console.log('Insert query:', query);
    console.log('Insert values:', values);

    const [result] = await conn.query(query, values);
    console.log('Insert result:', result);

    return NextResponse.json({
      status: true,
      message: 'Product created successfully',
      data: { id },
    } as ApiResponse<{ id: string }>);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({
      status: false,
      message: error instanceof Error ? error.message : 'Failed to create product',
      data: null,
    } as ApiResponse<null>, { status: 500 });
  }
}