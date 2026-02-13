import React from 'react'
const Header = ({ count, setcount }) => {
    let counts = count

    console.log(count);
    let rendercounter = () => {
        counts++
         setcount(counts )
    }

    return (
        <div className='px-42 py-14 flex justify-between'>
            <div>
                <h1 className='text-3xl text-gray-800 font-bold'>Task Manager</h1>
            </div>
            <div className='flex gap-2'>
                <h1 className='text-xl' onClick={rendercounter}>🌙</h1>
                <h2 className='text-gray-500'>Render :{counts} </h2>
            </div>
        </div>
    )
}

export default Header