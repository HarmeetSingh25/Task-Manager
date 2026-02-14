import React, { useState, useEffect } from 'react'
import Header from './component/Header'
import Card from './component/Card'
import Tasklist from "./component/TakList";
import Createtask from './component/Createtask'

const App = () => {

  // ✅ Load Tasks From localStorage
  const [Tasklistt, setTasklistt] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [darkMode, setDarkMode] = useState(false);

  // ✅ Load Timer Seconds From localStorage
  const [seconds, setSeconds] = useState(() => {
    const savedSeconds = localStorage.getItem("seconds");
    return savedSeconds ? JSON.parse(savedSeconds) : {};
  });

  const [runningIndex, setRunningIndex] = useState(null);
  const [count, setcount] = useState(0);

  // ✅ Save Tasks Whenever They Change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(Tasklistt));
  }, [Tasklistt]);

  // ✅ Save Seconds Whenever They Change
  useEffect(() => {
    localStorage.setItem("seconds", JSON.stringify(seconds));
  }, [seconds]);


  return (
    
    <div className='px-38 py-14 bg-gray-100 min-h-screen'>

      <Header 
        count={count} 
        setcount={setcount}
        Tasklistt={Tasklistt}
        runningIndex={runningIndex}
      />

      <Card 
        Tasklistt={Tasklistt} 
        seconds={seconds} 
      />

      <Createtask 
        Tasklistt={Tasklistt} 
        setTasklistt={setTasklistt} 
      />

      <Tasklist 
        runningIndex={runningIndex} 
        setRunningIndex={setRunningIndex} 
        seconds={seconds} 
        setSeconds={setSeconds} 
        Tasklistt={Tasklistt} 
        setTasklistt={setTasklistt} 
      />

    </div>
  )
}

export default App
