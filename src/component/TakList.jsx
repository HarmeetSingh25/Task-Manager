import React, { useEffect, useState } from "react";

const TakList = ({
  Tasklistt,
  setTasklistt,
  runningIndex,
  setRunningIndex,
  seconds,
  setSeconds,
}) => {

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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



  // 🔥 FILTER LOGIC
  const filteredTasks = Tasklistt
    .filter((task) =>
      task.tasktittle.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });



  // 🔥 Check if any completed exists
  const hasCompleted = Tasklistt.some(task => task.completed);



  return (
    <div className="h-full flex flex-col gap-4 w-full">

      {/* 🔥 SEARCH + FILTER SECTION */}
      <div className="flex gap-4 items-center">

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-2 border-gray-200 bg-white px-4 py-3 rounded-xl"
        />

        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2 rounded-xl border 
            ${filter === "all" ? "bg-gray-200" : ""}`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-5 py-2 rounded-xl border 
            ${filter === "active" ? "bg-gray-200" : ""}`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-5 py-2 rounded-xl border 
            ${filter === "completed" ? "bg-gray-200" : ""}`}
        >
          Completed
        </button>

        {/* 🔥 Clear Completed Button */}
        {hasCompleted && (
          <button
            onClick={() => {
              const updated = Tasklistt.filter(task => !task.completed);
              setTasklistt(updated);
              setRunningIndex(null);
            }}
            className="px-5 py-2 rounded-xl border-2 border-red-400 text-red-500"
          >
            Clear Completed
          </button>
        )}

      </div>



      {/* 🔥 TASK LIST */}
      {filteredTasks.map((task, index) => {

        const realIndex = Tasklistt.indexOf(task);
        const isRunning = runningIndex === realIndex;
        const isCompleted = task.completed;

        return (
          <div
            key={realIndex}
            className="bg-gray-100 rounded-2xl p-6 border-l-4 border-yellow-400 shadow-sm"
          >
            <div className="flex gap-4 items-start">

              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => {
                  const updatedTasks = [...Tasklistt];
                  updatedTasks[realIndex].completed =
                    !updatedTasks[realIndex].completed;

                  setTasklistt(updatedTasks);

                  if (runningIndex === realIndex) {
                    setRunningIndex(null);
                  }
                }}
                className="mt-2 w-5 h-5 accent-green-500"
              />

              <div className="flex flex-col gap-2 w-full">

                <h3
                  className={`text-2xl font-bold ${
                    isCompleted
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.tasktittle}
                </h3>

                <p
                  className={`${
                    isCompleted
                      ? "line-through text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {task.TaskDesciption}
                </p>

                <div className="flex items-center gap-4 mt-2">

                  <span className="bg-orange-200 text-orange-700 px-4 py-1 rounded-full font-semibold text-sm">
                    {task.Priority}
                  </span>

                  <span className="bg-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-700">
                    {formatTime(seconds[realIndex] || 0)}
                  </span>

                </div>

                <div className="flex gap-4 mt-4">

                  <button
                    disabled={isCompleted}
                    onClick={() =>
                      setRunningIndex(isRunning ? null : realIndex)
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
                        (_, i) => i !== realIndex
                      );
                      setTasklistt(updated);

                      if (runningIndex === realIndex) {
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
