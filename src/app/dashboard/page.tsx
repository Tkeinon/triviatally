import Link from "next/link"
import { Plus } from "lucide-react"

import { getTeamsForUser } from "@/lib/queries/team"
import { UserInvitations } from "@/components/team/UserInvitations"
import { UserTeams } from "@/components/team/UserTeams"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const { acceptedTeams, pendingInvitations } = await getTeamsForUser()

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/team/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Team
          </Link>
        </Button>
      </header>
      <main className="space-y-12">
        <UserInvitations invitations={pendingInvitations} />
        <UserTeams teams={acceptedTeams} />
      </main>
    </div>
  )
}
