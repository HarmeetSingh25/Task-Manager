import React from 'react'

const Card = ({ Tasklistt, seconds }) => {

  // ✅ Total Tasks
  const totalTasks = Tasklistt.length;

  // ✅ Completed Tasks
  const completedTasks = Tasklistt.filter(task => task.completed).length;

  // ✅ Active Tasks
  const activeTasks = totalTasks - completedTasks;

  // ✅ Total Time (sum of all seconds)
  const totalSeconds = Object.values(seconds).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // ✅ Format Time
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // ✅ Average Time per Task
  const avgTime =
    totalTasks > 0 ? Math.floor(totalSeconds / totalTasks) : 0;

  // ✅ Completion %
  const completionPercent =
    totalTasks > 0
      ? Math.floor((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <div className='py-10 flex gap-6 flex-wrap'>

      <div className='rounded-md flex flex-col items-center justify-center w-1/6 border px-8 py-6'>
        <h1 className='text-2xl font-bold'>{totalTasks}</h1>
        <h1>Total Task</h1>
      </div>

      <div className='rounded-md flex flex-col items-center justify-center w-1/6 border px-8 py-6'>
        <h1 className='text-2xl font-bold'>{activeTasks}</h1>
        <h1>Active</h1>
      </div>

      <div className='rounded-md flex flex-col items-center justify-center w-1/6 border px-8 py-6'>
        <h1 className='text-2xl font-bold'>{completedTasks}</h1>
        <h1>Completed</h1>
      </div>

      <div className='rounded-md flex flex-col items-center justify-center w-1/6 border px-8 py-6'>
        <h1 className='text-2xl font-bold'>{formatTime(totalSeconds)}</h1>
        <h1>Total Time</h1>
      </div>

      <div className='rounded-md flex flex-col items-center justify-center w-1/6 border px-8 py-6'>
        <h1 className='text-2xl font-bold'>
          {formatTime(avgTime)}
        </h1>
        <h1>Avg / Task</h1>
      </div>

      <div className='rounded-md flex flex-col items-center justify-center w-1/6 border px-8 py-6'>
        <h1 className='text-2xl font-bold'>
          {completionPercent}%
        </h1>
        <h1>Completion</h1>
      </div>

    </div>
  )
}

export default Card
