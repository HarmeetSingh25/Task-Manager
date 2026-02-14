import React, { useEffect } from "react";

const Header = ({ count, setcount, Tasklistt, runningIndex }) => {

  useEffect(() => {
    setcount(prev => prev + 1);
  }, [Tasklistt, runningIndex]);

  return (
    <div className='px-4 items-center flex justify-between'>
      
      <div>
        <h1 className='text-3xl text-gray-800 font-bold'>
          Task Manager
        </h1>
      </div>

      <div className='flex gap-2'>
        <h2 className='text-gray-500'>
          Render : {count}
        </h2>
      </div>

    </div>
  );
};

export default Header;
