import { Project, ProjectFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@/services/ProjectService"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

type ProjectEditFormProps = {
    project: ProjectFormData
    projectId: Project['_id']
}

const ProjectEditForm = ({ project, projectId }: ProjectEditFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
        defaultValues: {
            projectName: project.projectName,
            clientName: project.clientName,
            description: project.description
        }
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (data) => {
            toast.error(data.message);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['projectId', projectId] })
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            project: formData,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <form
                className="bg-white shadow-lg rounded-lg mt-10 p-10"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >

                <div className="mb-5 space-y-3">
                    <label htmlFor="projectName" className="text-sm uppercase font-bold">
                        Nombre del Proyecto
                    </label>
                    <input
                        id="projectName"
                        className="w-full p-3  border border-gray-200"
                        type="text"
                        placeholder="Nombre del Proyecto"
                        {...register("projectName", {
                            required: "El Titulo del Proyecto es obligatorio",
                        })}
                    />

                    {errors.projectName && (
                        <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                    )}
                </div>

                <div className="mb-5 space-y-3">
                    <label htmlFor="clientName" className="text-sm uppercase font-bold">
                        Nombre Cliente
                    </label>
                    <input
                        id="clientName"
                        className="w-full p-3  border border-gray-200"
                        type="text"
                        placeholder="Nombre del Cliente"
                        {...register("clientName", {
                            required: "El Nombre del Cliente es obligatorio",
                        })}
                    />

                    {errors.clientName && (
                        <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                    )}
                </div>

                <div className="mb-5 space-y-3">
                    <label htmlFor="description" className="text-sm uppercase font-bold">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        className="w-full p-3  border border-gray-200"
                        placeholder="Descripción del Proyecto"
                        {...register("description", {
                            required: "Una descripción del proyecto es obligatoria"
                        })}
                    />

                    {errors.description && (
                        <ErrorMessage>{errors.description.message}</ErrorMessage>
                    )}
                </div>
                <input
                    type="submit"
                    value='Guardar Cambios'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors uppercase"
                />

            </form>

        </>
    )
}

export default ProjectEditForm