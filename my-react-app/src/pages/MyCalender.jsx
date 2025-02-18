import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import useGeneralStore from "../slices/generalStore"; // Adjust path
import useBacklogStore from "../slices/backlogStore"; // Adjust path
import useinprogressStore from "../slices/inprogressStore"; // Adjust path
import usepausedStore from "../slices/pausedStore"; // Adjust path
import usereadyStore from "../slices/readyStore"; // Adjust path




const MyCalendar = () => {
  const [sortOption, setSortOption] = useState("name");

  // Fetch tasks from both stores
  const generalTasks = useGeneralStore((state) => state.tasks);
  const backlogTasks = useBacklogStore((state) => state.tasks);
  const inprogressTask=useinprogressStore((state)=>state.tasks);
  const pausedTask=usepausedStore((state)=>state.tasks);
  const readyTask=usereadyStore((state)=>state.tasks);



  const users = useGeneralStore((state) => state.users);

  // Fetch actions
  const fetchGeneralTasks = useGeneralStore((state) => state.fetchTasks);
  const fetchBacklogTasks = useBacklogStore((state) => state.fetchTasks);
  const fetchinprogressTasks = useinprogressStore((state) => state.fetchTasks);
  const fetchpausedTasks=usepausedStore((state) => state.fetchTasks);
  const fetchreadyTasks=usepausedStore((state) => state.fetchTasks);

  

  const fetchUsers = useGeneralStore((state) => state.fetchUsers);

  useEffect(() => {
    fetchGeneralTasks();
    fetchBacklogTasks();
    fetchinprogressTasks();
    fetchpausedTasks();
    fetchreadyTasks();
    fetchUsers();
  }, [fetchGeneralTasks, fetchBacklogTasks, fetchUsers,fetchreadyTasks,fetchpausedTasks,fetchinprogressTasks]);

  // Combine tasks from both stores
  const combinedTasks = [...generalTasks, ...backlogTasks,...inprogressTask,...pausedTask,...readyTask];

  if (!users || users.length === 0 || !combinedTasks || combinedTasks.length === 0) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  const startDate = dayjs(Math.min(...combinedTasks.map(task => new Date(task.startDate).getTime()))).format("YYYY-MM-DD");
  const endDate = dayjs(Math.max(...combinedTasks.map(task => new Date(task.endDate).getTime()))).format("YYYY-MM-DD");

  const generateDateRange = (start, end) => {
    let dates = [];
    let currentDate = dayjs(start);
    while (currentDate.isBefore(dayjs(end)) || currentDate.isSame(dayjs(end))) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }
    return dates;
  };

  const dates = generateDateRange(startDate, endDate);

  const getColSpan = (start, end) => {
    const startIndex = dates.indexOf(start);
    const endIndex = dates.indexOf(end);
    return endIndex - startIndex + 1;
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "taskCount") {
      const taskCountA = combinedTasks.filter(task => task.assignees.includes(a.name)).length;
      const taskCountB = combinedTasks.filter(task => task.assignees.includes(b.name)).length;
      return taskCountB - taskCountA;
    }
    return 0;
  });

  return (
    <div className="w-auto h-screen flex flex-col">
      <div className="w-screen flex justify-center items-center p-4 border-gray-300">
        <label className="mr-2 font-semibold text-gray-700">Sort by:</label>
        <select
          className="border rounded px-3 py-1 text-gray-700 bg-white"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">User Name (A-Z)</option>
          <option value="taskCount">Number of Tasks (High to Low)</option>
        </select>
      </div>

      <div className="min-w-[100vw] flex border-gray-300 bg-white border-t">
        <div className="w-[100px] p-2 font-bold text-gray-800 border-gray-300 text-left"></div>
        <div
          className="grid flex-grow border-b border-gray-300 min-w-[900px]"
          style={{ gridTemplateColumns: `repeat(${dates.length}, minmax(120px, 1fr))` }}
        >
          {dates.map((date, index) => (
            <div key={index} className="text-center font-semibold text-gray-700 border-gray-300 p-2">
              {dayjs(date).format("MMM DD")}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-white">
        {sortedUsers.map((user, userIndex) => (
          <div key={userIndex} className="flex items-center border-b border-gray-300">
            <div className="w-[100px] p-4 font-semibold text-gray-800 border-gray-300 text-left">{user.name}</div>
            <div
              className="grid flex-grow p-4 border-l border-gray-300 min-h-[60px] min-w-[900px]"
              style={{ gridTemplateColumns: `repeat(${dates.length}, minmax(120px, 1fr))` }}
            >
              {combinedTasks
                .filter(task => task.assignees.includes(user.name))
                .map((task, taskIndex) => {
                  const formattedStartDate = dayjs(task.startDate).format("YYYY-MM-DD");
                  const formattedEndDate = dayjs(task.endDate).format("YYYY-MM-DD");
                  const colSpan = getColSpan(formattedStartDate, formattedEndDate);
                  const startIndex = dates.indexOf(formattedStartDate);

                  return (
                    <div
                      key={taskIndex}
                      className="text-center text-white font-semibold p-3 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
                      style={{
                        gridColumn: `${startIndex + 1} / span ${colSpan}`,
                        backgroundColor: `hsl(${(userIndex * 70) % 360}, 70%, 60%)`,
                        marginBottom: "10px",
                      }}
                    >
                      {task.title}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCalendar;
