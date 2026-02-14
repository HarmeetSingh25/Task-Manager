import React, { useState } from 'react'
import Header from './component/Header'
import Card from './component/Card'
import Tasklist from "./component/TakList";
import Createtask from './component/Createtask'
const App = () => {
  const [Tasklistt, setTasklistt] = useState([])

  const [runningIndex, setRunningIndex] = useState(null)
  const [seconds, setSeconds] = useState({})

  console.log(Tasklist);

  const [count, setcount] = useState(0)

  return (
    <div className='px-38 py-14  bg-gray-100 h-full'>
      <Header 
  count={count} 
  setcount={setcount}
  Tasklistt={Tasklistt}
  runningIndex={runningIndex}
/>

<Card Tasklistt={Tasklistt} seconds={seconds} />
      <Createtask Tasklistt={Tasklistt} setTasklistt={setTasklistt} />
      <Tasklist runningIndex={runningIndex} setRunningIndex={setRunningIndex} seconds={seconds} setSeconds={setSeconds} Tasklistt={Tasklistt} setTasklistt={setTasklistt} />
    </div>
  )
}

export default App