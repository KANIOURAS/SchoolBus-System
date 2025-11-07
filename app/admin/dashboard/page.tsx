
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/admin-dashboard';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'SCHOOL_ADMIN') {
    redirect('/');
  }

  return <AdminDashboard />;
}
