import { NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/auth"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    teamId: z.string(),
    memberId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const session = await auth()

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const memberToUpdate = await db.teamMember.findFirst({
      where: {
        id: params.memberId,
        teamId: params.teamId,
      },
    })

    if (!memberToUpdate) {
      return new NextResponse("Member not found", { status: 404 })
    }

    // A user can only accept their own invitation
    if (memberToUpdate.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    if (memberToUpdate.status !== "PENDING") {
      return new NextResponse("Invitation already accepted or invalid.", {
        status: 400,
      })
    }

    const updatedMember = await db.teamMember.update({
      where: {
        id: params.memberId,
      },
      data: {
        status: "ACCEPTED",
      },
    })

    return NextResponse.json(updatedMember)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
    console.error("[TEAM_MEMBER_PATCH]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const session = await auth()

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const memberToDelete = await db.teamMember.findFirst({
      where: {
        id: params.memberId,
        teamId: params.teamId,
      },
    })

    if (!memberToDelete) {
      return new NextResponse("Member not found", { status: 404 })
    }

    const currentUserMember = await db.teamMember.findFirst({
      where: {
        teamId: params.teamId,
        userId: session.user.id,
        status: "ACCEPTED",
      },
    })

    // Authorize: user can delete themselves, or an OWNER/ADMIN can delete others
    const isDeletingSelf = memberToDelete.userId === session.user.id
    const isAdminOrOwner =
      currentUserMember && ["OWNER", "ADMIN"].includes(currentUserMember.role)

    if (!isDeletingSelf && !isAdminOrOwner) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    // Business rule: Prevent the last owner from leaving/being removed
    if (memberToDelete.role === "OWNER") {
      const ownerCount = await db.teamMember.count({
        where: {
          teamId: params.teamId,
          role: "OWNER",
          status: "ACCEPTED",
        },
      })
      if (ownerCount <= 1) {
        return new NextResponse(
          "Cannot remove the only owner of the team.",
          { status: 400 }
        )
      }
    }

    await db.teamMember.delete({
      where: {
        id: params.memberId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
    console.error("[TEAM_MEMBER_DELETE]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
