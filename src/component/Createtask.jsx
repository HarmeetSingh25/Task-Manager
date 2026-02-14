import React, { useState } from 'react'
import { useForm } from "react-hook-form";
const Createtask = ({ Tasklistt, setTasklistt }) => {
    let { register, handleSubmit, formState: { errors }, reset } = useForm()
    let tasklist = Tasklistt

    let onSubmit = (data) => {
        setTasklistt([...tasklist, data])
        reset()
    }
    console.log(errors);

    return (
        <div className=' flex flex-col w-1/1 py-1 rounded-xl p-5 border gap-4 items-start'>
            <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col w-full py-2rounded-xl p-5  gap-7 items-start'>
                <h1 className='text-2xl font-bold'>Add New Task </h1>
                <div className='w-full flex flex-col gap-2'>

                    <input {...register("tasktittle", { required: "Task tittle is required" })} className='shadow-gray-400 shadow p-2 py-3 w-full rounded' placeholder='Task Tittle' type="text" />
                    {errors.tasktittle && (
                        <span className="text-red-500 text-xs">
                            {errors.tasktittle.message}
                        </span>
                    )}
                </div>
                <div className='w-full flex flex-col gap-2'>

                    <textarea {...register("TaskDesciption", { required: "Task desciption is required" })} className='shadow-gray-400 shadow p-2 py-3  w-full rounded' placeholder='Task Description'></textarea>
                    {errors.TaskDesciption && (
                        <span className="text-red-500 text-xs">
                            {errors.TaskDesciption.message}
                        </span>
                    )}
                </div>
                <div className='w-full flex flex-col gap-2' >
                    <select {...register("Priority", { required: "Priority is required" })} className='shadow-gray-400 shadow p-2 py-3 w-full rounded' defaultValue={"Medium Priority"}>
                        <option value="Low ">Low Priority</option>
                        <option value="Medium ">Medium Priority</option>
                        <option value="High ">High Priority</option>
                    </select>
                    {errors.Priority && (
                        <span className="text-red-500 text-xs">
                            {errors.Priority.message}
                        </span>
                    )}
                </div>
                <button className=' px-7 font-bold py-2.5 rounded-xl text-white bg-green-600 '>Add Task</button>
            </form>
        </div>
    )
}
export default Createtask
