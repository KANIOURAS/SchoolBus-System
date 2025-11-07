
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

    const buses = await prisma.bus.findMany({
      include: {
        driver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true
          }
        },
        route: {
          select: {
            name: true,
            description: true
          }
        },
        students: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(buses);
  } catch (error) {
    console.error('Error fetching fleet data:', error);
    return NextResponse.json(
      { error: 'Σφάλμα κατά την ανάκτηση δεδομένων στόλου' },
      { status: 500 }
    );
  }
}
