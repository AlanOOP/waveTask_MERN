import api from "@/lib/axios";
import { DashboardProjectSchema, ProjectSchema } from "@/schemas/project-schema";
import { MessageAPIResponse, Project, ProjectFormData, ProjectAPI } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData): Promise<MessageAPIResponse> {
    try {

        const response = await api.post<MessageAPIResponse>('/project', formData);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error?.response.data.error);
        }
        throw new Error('Error desconocido al crear el proyecto');
    }
}

export async function getProjects(): Promise<Project[]> {
    try {

        const response = await api.get<Project[]>('/project');
        
        const result = DashboardProjectSchema.safeParse(response.data);
        console.log(result);
        
        if (result.success) {
            return result.data
        }

        return []

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error?.response.data.error);
        }
        throw new Error('Error desconocido al obtener los proyectos');
    }
}

export async function getProjectById(id: Project['_id']): Promise<Project> {
    try {
        const response = await api.get<Project>(`/project/${id}`);
        const result = ProjectSchema.safeParse(response.data);

        if (result.success) {
            return result.data
        } else {
            throw new Error('Error al parsear el proyecto');
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error?.response.data.error);
        }
        throw new Error('Error desconocido al obtener el proyecto');
    }
}

export async function updateProject({ project, projectId }: ProjectAPI): Promise<MessageAPIResponse> {
    try {
        const response = await api.put<MessageAPIResponse>(`/project/${projectId}`, project);
        return response.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error?.response.data.error);
        }
        throw new Error('Error desconocido al obtener el proyecto');
    }
}

export async function deleteProject(projectId: Project['_id']): Promise<MessageAPIResponse> {
    try {
        const response = await api.delete<MessageAPIResponse>(`/project/${projectId}`);
        return response.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error?.response.data.error);
        }
        throw new Error('Error desconocido al obtener el proyecto');
    }
}