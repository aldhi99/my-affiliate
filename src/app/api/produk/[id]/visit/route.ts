import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import conn from '@/lib/connection';
import { ApiResponse } from '@/types/api';
import { RowDataPacket } from 'mysql2';

interface RouteParams {
  params: {
    id: string;
  };
}

interface VisitStatistics extends RowDataPacket {
  platform: string;
  visit_count: number;
  unique_visitors: number;
}

function detectPlatform(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('android')) return 'android';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios';
  if (ua.includes('mobile')) return 'mobile';
  return 'web';
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const platform = detectPlatform(userAgent);
    
    // Get IP address from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    // Check if there's already a visit from this IP for this product today
    const checkQuery = `
      SELECT id FROM product_visits 
      WHERE product_id = ? 
      AND ip_address = ? 
      AND DATE(created_at) = CURDATE()
      LIMIT 1
    `;
    
    const [existingVisits] = await conn.query(checkQuery, [id, ipAddress]);
    
    // If a visit already exists for today, return success but indicate it was a duplicate
    if (Array.isArray(existingVisits) && existingVisits.length > 0) {
      return NextResponse.json({
        status: true,
        message: 'Visit already recorded for today',
        data: {
          is_duplicate: true,
          platform,
          timestamp: new Date().toISOString()
        }
      } as ApiResponse<{
        is_duplicate: boolean;
        platform: string;
        timestamp: string;
      }>);
    }

    // Generate UUID for visit record
    const visitId = uuidv4();

    // Insert visit record
    const insertQuery = `
      INSERT INTO product_visits (
        id,
        product_id,
        platform,
        user_agent,
        ip_address
      ) VALUES (?, ?, ?, ?, ?)
    `;

    const values = [visitId, id, platform, userAgent, ipAddress];

    await conn.query(insertQuery, values);

    return NextResponse.json({
      status: true,
      message: 'Visit recorded successfully',
      data: {
        visit_id: visitId,
        platform,
        timestamp: new Date().toISOString(),
        is_duplicate: false
      }
    } as ApiResponse<{
      visit_id: string;
      platform: string;
      timestamp: string;
      is_duplicate: boolean;
    }>);

  } catch (error) {
    console.error('Error recording visit:', error);
    return NextResponse.json({
      status: false,
      message: error instanceof Error ? error.message : 'Failed to record visit',
      data: null
    } as ApiResponse<null>, { status: 500 });
  }
}

// Optional: Add GET endpoint to retrieve visit statistics
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    const query = `
      SELECT 
        platform,
        COUNT(*) as visit_count,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM product_visits
      WHERE product_id = ?
      GROUP BY platform
    `;

    const [rows] = await conn.query<VisitStatistics[]>(query, [id]);

    return NextResponse.json({
      status: true,
      message: 'Visit statistics retrieved successfully',
      data: rows
    } as ApiResponse<VisitStatistics[]>);

  } catch (error) {
    console.error('Error retrieving visit statistics:', error);
    return NextResponse.json({
      status: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve visit statistics',
      data: null
    } as ApiResponse<null>, { status: 500 });
  }
} 