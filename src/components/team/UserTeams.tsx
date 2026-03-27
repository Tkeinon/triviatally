import Link from "next/link"

import { UserTeam } from "@/types"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface UserTeamsProps {
  teams: UserTeam[]
}

export function UserTeams({ teams }: UserTeamsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted-foreground">You are not part of any team yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map(({ team }) => (
            <Link key={team.id} href={`/dashboard/team/${team.id}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>View and manage team.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
