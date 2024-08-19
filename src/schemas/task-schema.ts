import { z } from 'zod';

export const TaskStatusSchema = z.enum(["pending", "on_hold", "in_progress", "under_review", "completed"])

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string()
})
