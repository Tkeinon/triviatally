"use client"

import { useMutation } from "@tanstack/react-query"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"

import { UserTeam } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface UserInvitationsProps {
  invitations: UserTeam[]
}

export function UserInvitations({ invitations }: UserInvitationsProps) {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async ({
      teamId,
      memberId,
      action,
    }: {
      teamId: string
      memberId: string
      action: "accept" | "decline"
    }) => {
      const method = action === "accept" ? "PATCH" : "DELETE"
      const response = await fetch(
        `/api/teams/${teamId}/members/${memberId}`,
        { method }
      )

      if (!response.ok) {
        throw new Error("Failed to update invitation")
      }
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Your choice has been saved." })
      router.refresh()
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  if (invitations.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pending Invitations</h2>
      {invitations.map((invite) => (
        <Card key={invite.id}>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>{invite.team.name}</CardTitle>
              <CardDescription>
                You have been invited to join this team.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                isLoading={mutation.isPending}
                onClick={() =>
                  mutation.mutate({
                    teamId: invite.teamId,
                    memberId: invite.id,
                    action: "accept",
                  })
                }
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                isLoading={mutation.isPending}
                onClick={() =>
                  mutation.mutate({
                    teamId: invite.teamId,
                    memberId: invite.id,
                    action: "decline",
                  })
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
