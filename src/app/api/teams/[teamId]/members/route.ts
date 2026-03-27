import { NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { inviteMemberSchema } from "@/lib/validations/team"

const routeContextSchema = z.object({
  params: z.object({
    teamId: z.string(),
  }),
})

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const session = await auth()

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const member = await db.teamMember.findFirst({
      where: {
        teamId: params.teamId,
        userId: session.user.id,
        status: "ACCEPTED",
      },
    })

    if (!member || !["OWNER", "ADMIN"].includes(member.role)) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const body = await req.json()
    const validatedData = inviteMemberSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { email } = validatedData.data

    const userToInvite = await db.user.findUnique({
      where: { email },
    })

    if (!userToInvite) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const existingMember = await db.teamMember.findFirst({
      where: {
        teamId: params.teamId,
        userId: userToInvite.id,
      },
    })

    if (existingMember) {
      return NextResponse.json(
        { message: "User is already a member or has a pending invitation" },
        { status: 409 }
      )
    }

    const newMember = await db.teamMember.create({
      data: {
        teamId: params.teamId,
        userId: userToInvite.id,
        role: "MEMBER",
      },
    })

    return NextResponse.json(newMember, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
    console.error("[TEAM_MEMBERS_POST]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
