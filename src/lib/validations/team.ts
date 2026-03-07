import { z } from 'zod';

export const TeamSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type Team = z.infer<typeof TeamSchema>;
