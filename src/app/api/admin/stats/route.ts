import { NextResponse } from 'next/server';
import conn from '@/lib/connection';
import { ApiResponse } from '@/types/api';
import { RowDataPacket } from 'mysql2';

interface WeeklyVisitStats extends RowDataPacket {
  week_start: string;
  visits: number;
}

interface DailyVisitStats extends RowDataPacket {
  date: string;
  visits: number;
}

export async function GET() {
  try {
    // Get weekly visits (last 7 weeks)
    const weeklyQuery = `
      SELECT 
        DATE(DATE_SUB(created_at, INTERVAL WEEKDAY(created_at) DAY)) as week_start,
        COUNT(*) as visits
      FROM product_visits
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 WEEK)
      GROUP BY week_start
      ORDER BY week_start ASC
    `;

    // Get daily visits (current month)
    const dailyQuery = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as visits
      FROM product_visits
      WHERE created_at >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND created_at < DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)
      GROUP BY date
      ORDER BY date ASC
    `;

    const [weeklyStats] = await conn.query<WeeklyVisitStats[]>(weeklyQuery);
    const [dailyStats] = await conn.query<DailyVisitStats[]>(dailyQuery);

    // Format the data for the frontend
    const weeklyVisits = weeklyStats.map(stat => ({
      date: new Date(stat.week_start).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
      visits: stat.visits
    }));

    const dailyVisits = dailyStats.map(stat => ({
      date: new Date(stat.date).toLocaleDateString('id-ID', { day: 'numeric' }),
      visits: stat.visits
    }));

    return NextResponse.json({
      status: true,
      message: 'Visit statistics retrieved successfully',
      data: {
        weeklyVisits,
        dailyVisits
      }
    } as ApiResponse<{
      weeklyVisits: { date: string; visits: number; }[];
      dailyVisits: { date: string; visits: number; }[];
    }>);

  } catch (error) {
    console.error('Error retrieving visit statistics:', error);
    return NextResponse.json({
      status: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve visit statistics',
      data: null
    } as ApiResponse<null>, { status: 500 });
  }
} 