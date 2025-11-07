
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

    const drivers = await prisma.driver.findMany({
      include: {
        bus: {
          select: {
            id: true,
            name: true,
            plateNumber: true
          }
        }
      },
      orderBy: {
        firstName: 'asc'
      }
    });

    return NextResponse.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers data:', error);
    return NextResponse.json(
      { error: 'Σφάλμα κατά την ανάκτηση δεδομένων οδηγών' },
      { status: 500 }
    );
  }
}
