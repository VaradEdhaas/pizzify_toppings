import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminDashboardPage() {
  const cookieStore = cookies()
  const role = cookieStore.get('role')?.value

  if (role !== 'admin') {
    redirect('/unauthorized')
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Welcome Admin — This is your Admin Dashboard
    </div>
  )
}
