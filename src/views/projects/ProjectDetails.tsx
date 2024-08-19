import Spinner from "@/components/Spinner";
import AddTaskModel from "@/components/tasks/AddTaskModal";
import TaskEditData from "@/components/tasks/TaskEditData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetail from "@/components/tasks/TaskModalDetail";
import { getProjectById } from "@/services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom"

const ProjectDetails = () => {

    const navigate = useNavigate();
    const { projectId } = useParams();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['projectId', projectId],
        queryFn: () => getProjectById(projectId!)
    })

    if (isLoading) return <Spinner />
    if (isError) return <Navigate to='/404' />

    if (data) return (
        <>
            <h1 className="text-5xl font-black text-slate-600">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-600 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(`?newTask=true`)}
                >
                    Agregar Tarea
                </button>
            </nav>

            <AddTaskModel />

            <TaskList
                tasks={data.tasks}
            />
            <TaskEditData />
            <TaskModalDetail />
        </>
    )
}

export default ProjectDetails