import { AdminDashboard } from "@/components/admin-dashboard"
import { AdminAuth } from "@/components/admin-auth"
import { Suspense } from "react"

export const metadata = {
  title: "Admin Dashboard - Random Generator",
  description: "Admin panel for managing facts, questions, and jokes",
  robots: "noindex, nofollow",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <AdminAuth>
          <AdminDashboard />
        </AdminAuth>
      </Suspense>
    </div>
  )
}
