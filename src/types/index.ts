import { ProjectSchema } from '@/schemas/project-schema';
import { TaskSchema } from '@/schemas/task-schema';
import { z } from 'zod';

export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

export type Task = z.infer<typeof TaskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

export type MessageAPIResponse = {
    message: string
}

export type ProjectAPI = {
    project: ProjectFormData
    projectId: Project['_id']
}

export type TaskAPI = {
    taskId?: Project['_id']
    task?: TaskFormData,
    projectId: Project['_id']
}