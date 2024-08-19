import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import { TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/services/TaskService';
import toast from 'react-hot-toast';

const initialValues: TaskFormData = {
    name: '',
    description: ''
}

const AddTaskModel = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get('newTask');
    const showModal = !!modalTask;

    const projectId = location.pathname.split('/')[2]!

    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (data) => {
            toast.error(data.message)
        },
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ['projectId', projectId!] })
            reset()
            navigate(location.pathname, { replace: true })
        }
    })


    const handleForm = (formData: TaskFormData) => {
        const data = {
            task: formData,
            projectId
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

export default AddTaskModel