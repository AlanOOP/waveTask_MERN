import ProjectEditForm from "@/components/projects/ProjectEditForm";
import Spinner from "@/components/Spinner";
import { getProjectById } from "@/services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";

const EditProjectView = () => {

    const { projectId } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectId', projectId],
        queryFn: () => getProjectById(projectId!)
    });

    if (isLoading) return <Spinner />
    if (isError) return <Navigate to='/404' />

    if (data) return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black ">Actualizar Proyecto</h1>
                <p className="font-light text-xl text-gray-500 mt-5">Llena el siguiente formulario para actualizar un proyecto.</p>


                <nav className="my-5 ">
                    <Link
                        to={'/'}
                        className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    >
                        Regresar al Inicio
                    </Link>
                </nav>

                <ProjectEditForm
                    project={data}
                    projectId={projectId!}
                />

            </div>
        </>
    )
}

export default EditProjectView