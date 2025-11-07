
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

    const notifications = await prisma.notification.findMany({
      include: {
        bus: {
          select: {
            name: true
          }
        },
        event: {
          select: {
            type: true,
            location: true
          }
        }
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: 50
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    return NextResponse.json(
      { error: 'Σφάλμα κατά την ανάκτηση ειδοποιήσεων' },
      { status: 500 }
    );
  }
}
