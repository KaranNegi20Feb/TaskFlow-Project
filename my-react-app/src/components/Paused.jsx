import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import useGeneralStore from "../slices/pausedStore";
import { Calendar, Clock, Users, Plus, X, CheckCircle } from "lucide-react";
const TaskBoard = () => {
  const { tasks, fetchTasks, addptask } = useGeneralStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({
    title: "",
    status: "Backlog",
    startDate: "",
    endDate: "",
    assignees: [],
  });
  useEffect(() => {
    fetchTasks();
    fetch("http://localhost:3000/api/v1/users/showusers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.user)) {
          setUsers(data.user.map((user) => ({ value: user.name, label: user.name })));
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleAssigneesChange = (selectedOptions) => {
    setTask((prev) => ({
      ...prev,
      assignees: selectedOptions.map((option) => option.value),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await additask(task);
    setTask({ title: "", status: "Backlog", startDate: "", endDate: "", assignees: [] });
    setIsModalOpen(false);
  };
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-white/80 backdrop-blur-lg border border-gray-100 shadow-lg"
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Tasks</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm font-medium transition-all hover:bg-gray-800"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={16} className="mr-1" />
              Add Task
            </motion.button>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-2">{task.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    <span>{Array.isArray(task.assignees) ? task.assignees.join(", ") : "None"}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{task.startDate || "N/A"} - {task.endDate || "N/A"}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100">
                      {task.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 m-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">New Task</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="General">General</option>
                    <option value="Inprogress">In Progress</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={task.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={task.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignees</label>
                  <Select
                    isMulti
                    options={users}
                    value={users.filter((user) => task.assignees.includes(user.value))}
                    onChange={handleAssigneesChange}
                    className="text-sm"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#e5e7eb',
                        '&:hover': {
                          borderColor: '#d1d5db'
                        }
                      })
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-4 py-2 rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-all"
                  >
                    Create Task
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default TaskBoard;