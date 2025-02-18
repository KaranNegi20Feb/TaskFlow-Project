import React from 'react';
import General from '../components/General';
import Backlog from '../components/Backlog';
import Inprogress from '../components/Inprogress';
import Paused from '../components/Paused';
import Ready from '../components/Ready';
import AddUser from '../components/AddUser';

const TaskPage = () => {
  return (
    <div className="relative flex flex-col w-full min-h-full overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute rounded-full bg-blue-500 filter blur-2xl opacity-40 animate-pulse" style={{ top: '10%', left: '10%', width: '200px', height: '200px' }}></div>
        <div className="absolute rounded-full bg-purple-500 filter blur-3xl opacity-50 animate-pulse" style={{ top: '30%', right: '20%', width: '300px', height: '300px' }}></div>
        <div className="absolute rounded-full bg-teal-500 filter blur-xl opacity-30 animate-pulse" style={{ bottom: '20%', left: '30%', width: '150px', height: '150px' }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col w-full min-h-full">
        {/* Top section with Add User button */}
        <div className="flex justify-end w-full">
          <AddUser />
        </div>

        {/* Task Sections */}
        <div className="flex w-full min-h-full justify-center gap-4">
          <General />
          <Backlog />
          <Paused />
          <Inprogress />
          <Ready />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
