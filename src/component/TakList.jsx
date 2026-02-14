import React, { useEffect } from "react";

const TakList = ({
  Tasklistt,
  setTasklistt,
  runningIndex,
  setRunningIndex,
  seconds,
  setSeconds,
}) => {

  // 🔥 TIMER EFFECT
  useEffect(() => {
    let interval;

    if (runningIndex !== null) {
      interval = setInterval(() => {
        setSeconds((prev) => ({
          ...prev,
          [runningIndex]: (prev[runningIndex] || 0) + 1,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [runningIndex, setSeconds]);



  // 🔥 FORMAT TIME
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };



  return (
    <div className="h-full flex flex-col gap-4 w-full">

      {Tasklistt?.map((task, index) => {

        const isRunning = runningIndex === index;
        const isCompleted = task.completed;

        return (
          <div
            key={index}
            className="bg-gray-100 rounded-2xl p-6 border-l-4 border-yellow-400 shadow-sm"
          >
            <div className="flex gap-4 items-start">

              {/* ✅ CHECKBOX */}
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => {
                  const updatedTasks = [...Tasklistt];
                  updatedTasks[index].completed =
                    !updatedTasks[index].completed;

                  setTasklistt(updatedTasks);

                  // 🔥 Auto Stop Timer if completed
                  if (runningIndex === index) {
                    setRunningIndex(null);
                  }
                }}
                className="mt-2 w-5 h-5 accent-green-500"
              />

              <div className="flex flex-col gap-2 w-full">

                {/* ✅ TITLE */}
                <h3
                  className={`text-2xl font-bold ${
                    isCompleted
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.tasktittle}
                </h3>

                {/* ✅ DESCRIPTION */}
                <p
                  className={`${
                    isCompleted
                      ? "line-through text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {task.TaskDesciption}
                </p>

                {/* ✅ PRIORITY + TIMER */}
                <div className="flex items-center gap-4 mt-2">

                  <span className="bg-orange-200 text-orange-700 px-4 py-1 rounded-full font-semibold text-sm">
                    {task.Priority}
                  </span>

                  <span className="bg-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-700">
                    {formatTime(seconds[index] || 0)}
                  </span>

                </div>

                {/* ✅ BUTTONS */}
                <div className="flex gap-4 mt-4">

                  <button
                    disabled={isCompleted}
                    onClick={() =>
                      setRunningIndex(isRunning ? null : index)
                    }
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl transition
                      ${
                        isCompleted
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                      }
                    `}
                  >
                    {isRunning ? "⏸ Stop" : "▶ Start"}
                  </button>

                  <button
                    onClick={() => {
                      const updated = Tasklistt.filter(
                        (_, i) => i !== index
                      );
                      setTasklistt(updated);

                      if (runningIndex === index) {
                        setRunningIndex(null);
                      }
                    }}
                    className="border-2 border-red-300 text-red-400 hover:bg-red-50 px-5 py-2 rounded-xl transition"
                  >
                    🗑
                  </button>

                </div>

              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default TakList;
