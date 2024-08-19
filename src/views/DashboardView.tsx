import ProjectItem from "@/components/projects/ProjectItem"
import Spinner from "@/components/Spinner"
import { getProjects } from "@/services/ProjectService"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const DashboardView = () => {

    const { data, isPending } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    })

    return (
        <>
            <h1 className="text-5xl font-black">Mis Proyectos</h1>
            <p className="font-light text-xl text-gray-500 mt-5">Maneja y administra tus proyectos</p>


            <nav className="my-5 ">
                <Link
                    to={'/projects/create'}
                    className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                >
                    Nuevo Proyecto
                </Link>
            </nav>

            {
                isPending && <Spinner />
            }

            {
                data?.length ? (
                    <>
                        <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                            {data?.map(project => (
                                <ProjectItem
                                    key={project._id}
                                    project={project}
                                />
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className="text-center py-20">No hay proyectos aún {' '}
                        <Link
                            to='/projects/create'
                            className="text-fuchsia-600 font-bold underline"
                        >
                            Crear Proyecto
                        </Link>
                    </p>
                )
            }
        </>
    )
}

export default DashboardView