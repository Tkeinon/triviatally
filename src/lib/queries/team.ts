import "server-only"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function getTeamsForUser() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      acceptedTeams: [],
      pendingInvitations: [],
    }
  }

  const teamMemberships = await db.teamMember.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      team: true,
    },
    orderBy: {
      team: {
        name: "asc",
      },
    },
  })

  const acceptedTeams = teamMemberships.filter(
    (membership) => membership.status === "ACCEPTED"
  )
  const pendingInvitations = teamMemberships.filter(
    (membership) => membership.status === "PENDING"
  )

  return { acceptedTeams, pendingInvitations }
}
