import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { MessageAPIResponse, Task, TaskAPI } from "@/types/index";
import { TaskSchema } from "@/schemas/task-schema";


export async function createTask({ projectId, task }: TaskAPI): Promise<MessageAPIResponse> {
    try {
        const response = await api.post<MessageAPIResponse>(`/projects/${projectId}/tasks`, task);

        return response.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data?.error ?? 'Hubo un error')
        }
        throw new Error('Hubo un Error')
    }
}

export async function getTaskById({ projectId, taskId }: TaskAPI) {
    try {

        const response = await api.get<Task>(`/projects/${projectId}/tasks/${taskId}`);
        const result = TaskSchema.safeParse(response.data)
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener la tarea');
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data?.error ?? 'Hubo un error')
        }
        throw new Error('Hubo un Error')
    }
}

export async function updateTask({ projectId, taskId, task }: TaskAPI): Promise<MessageAPIResponse> {
    try {
        const response = await api.put<MessageAPIResponse>(`/projects/${projectId}/tasks/${taskId}`, task);

        return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data?.error ?? 'Hubo un error')
        }
        throw new Error('Hubo un Error')
    }
}

export async function deleteTask({ projectId, taskId }: TaskAPI): Promise<MessageAPIResponse> {
    try {
        const response = await api.delete(`/projects/${projectId}/tasks/${taskId}`);

        return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data?.error ?? 'Hubo un error')
        }
        throw new Error('Hubo un Error')
    }
}