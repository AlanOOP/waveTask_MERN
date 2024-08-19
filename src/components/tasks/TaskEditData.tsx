import { Navigate, useParams } from "react-router-dom"
import TaskEditModal from "./TaskEditModal"
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/services/TaskService";


const TaskEditData = () => {

    const { projectId } = useParams();
    const queryParams = new URLSearchParams(location.search);
    const editTask = queryParams.get('editTask');

    const datAPI = {
        projectId: projectId!,
        taskId: editTask!
    }

    const { data, isError } = useQuery({
        queryKey: ['editTask', editTask],
        queryFn: () => getTaskById(datAPI),
        enabled: !!editTask
    })

    if (isError) return <Navigate to='/404' />
    if (data) return (
        <>
            <TaskEditModal
                task={data}
                editTask={editTask!}
                projectId={projectId!}
            />
        </>
    )
}

export default TaskEditData