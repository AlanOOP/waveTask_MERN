import { z } from 'zod';
import { TaskSchema } from './task-schema';

export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(TaskSchema)
})


export const DashboardProjectSchema = z.array(
    ProjectSchema
)