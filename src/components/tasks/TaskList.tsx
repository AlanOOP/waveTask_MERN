import { Task } from "@/types/index"
import TaskCard from "./TaskCard";

type TaskListProps = {
    tasks: Task[]
}

type GroupedTasks = {
    [keyof: string]: Task[]
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    on_hold: [],
    in_progress: [],
    under_review: [],
    completed: []
}

const statusTranslations: { [keyof: string]: string } = {
    pending: 'pendiente',
    on_hold: 'En Espera',
    in_progress: 'En Progreso',
    under_review: 'En Revisión',
    completed: 'Completado'
}

const statusStyles: { [keyof: string]: string } = {
    pending: 'border-t-slate-500',
    on_hold: 'border-t-red-500',
    in_progress: 'border-t-blue-500',
    under_review: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}

const TaskList = ({ tasks }: TaskListProps) => {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);



    return (
        <>
            <h2 className="text-5xl font-black my-10 bg-gradient-to-tr from-blue-600 to-sky-600 bg-clip-text text-transparent">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                        <h3
                            className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}>
                            {statusTranslations[status]}
                        </h3>

                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TaskList