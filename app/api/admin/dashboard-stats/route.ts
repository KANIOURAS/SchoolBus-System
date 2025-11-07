
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'SCHOOL_ADMIN') {
      return NextResponse.json(
        { error: 'Μη εξουσιοδοτημένη πρόσβαση' },
        { status: 401 }
      );
    }

    // Get counts
    const [
      totalBuses,
      activeBuses,
      totalDrivers,
      activeDrivers,
      totalStudents,
      todayEvents
    ] = await Promise.all([
      prisma.bus.count(),
      prisma.bus.count({ where: { status: 'ACTIVE' } }),
      prisma.driver.count(),
      prisma.driver.count({ where: { status: 'ACTIVE' } }),
      prisma.student.count(),
      prisma.event.count({
        where: {
          timestamp: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      })
    ]);

    // Calculate total distance today (mock calculation)
    const totalDistanceToday = activeBuses * 45.8; // Mock average km per bus

    const stats = {
      totalBuses,
      activeBuses,
      totalDrivers,
      activeDrivers,
      totalStudents,
      todayAlerts: todayEvents,
      totalDistanceToday
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Σφάλμα κατά την ανάκτηση στατιστικών' },
      { status: 500 }
    );
  }
}
