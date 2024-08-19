import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { Project, Task, TaskFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/services/TaskService";
import toast from "react-hot-toast";


type TaskEditModalProps = {
    task: Task
    editTask: Task['_id']
    projectId: Project['_id']
}


const TaskEditModal = ({ task, editTask, projectId }: TaskEditModalProps) => {

    const navigate = useNavigate();
    const location = useLocation();
    const showModal = !!editTask;

    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: task.name,
            description: task.description
        }
    })

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (data) => {
            toast.error(data.message)
        },
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({ queryKey: ['projectId', projectId] })
        }
    })

    const handleForm = (formData: TaskFormData) => {
        const data = {
            projectId: projectId,
            taskId: editTask,
            task: formData
        }
        mutate(data)
    }

    return (
        <>

            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/70" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5 text-gray-600"
                                    >
                                        Nueva Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form
                                        onSubmit={handleSubmit(handleForm)}
                                        noValidate
                                        className='mt-10 space-y-4'
                                    >
                                        <TaskForm
                                            errors={errors}
                                            register={register}
                                        />
                                        <input
                                            type="submit"
                                            className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold cursor-pointer transition-colors uppercase'
                                            value='Agregar Tarea'
                                        />
                                    </form>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default TaskEditModal