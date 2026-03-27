import { Team, TeamMember } from "@prisma/client"

export type TeamWithMembers = Team & {
  members: TeamMember[]
}

export type UserTeam = TeamMember & {
  team: Team
}
