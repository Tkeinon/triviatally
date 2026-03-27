import { z } from 'zod';

export const TeamSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type Team = z.infer<typeof TeamSchema>;

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
})

export type CreateTeamInput = z.infer<typeof createTeamSchema>

export const inviteMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>
