import React, { useState } from 'react'
import Header from './component/Header'

const App = () => {
  const [count, setcount] = useState(0)
  return (
    <div className='bg-gray-50 h-screen'>
      <Header  count={count} setcount={setcount} />
    </div>
  )
}

export default App