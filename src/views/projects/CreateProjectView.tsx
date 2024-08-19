import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"
import type { ProjectFormData } from "@/types/index";
import { createProject } from "@/services/ProjectService";

const CreateProjectView = () => {

    const navigate = useNavigate();
    const initialValues: ProjectFormData = {
        projectName: '',
        clientName: '',
        description: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (data) => {
            toast.success(data.message);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
        
    })

    const handleForm = (formData: ProjectFormData) => {
        mutate(formData)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black ">Crear Proyecto</h1>
                <p className="font-light text-xl text-gray-500 mt-5">Llena el siguiente formulario para agregar un proyecto.</p>


                <nav className="my-5 ">
                    <Link
                        to={'/'}
                        className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    >
                        Regresar al Inicio
                    </Link>
                </nav>

                <form
                    className="bg-white shadow-lg rounded-lg mt-10 p-10"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input
                        type="submit"
                        value='Crear Proyecto'
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors uppercase"
                    />

                </form>
            </div>
        </>
    )
}

export default CreateProjectView