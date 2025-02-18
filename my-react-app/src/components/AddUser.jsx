import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for navigation
import useGeneralStore from "../slices/generalStore";

const AddUser = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [userName, setUserName] = useState("");

  const addUser = useGeneralStore((state) => state.adduser);
  const fetchUsers = useGeneralStore((state) => state.fetchUsers);

  const handleAddUser = async () => {
    const trimmedName = userName.trim();
    if (!trimmedName) {
      alert("User name cannot be empty!");
      return;
    }

    try {
      const response = await addUser({ name: trimmedName });

      console.log("Add user response:", response); // Debugging

      if (response && response.success) {
        await fetchUsers(); // Refresh user list
        setUserName(""); // Clear input
        setIsAdding(false); // Hide input field
      } else {
        console.error("Failed to add user:", response);
        alert(response?.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the user.");
    }
  };

  return (
    <div className="flex justify-end pt-4 pr-4 gap-3">
      {!isAdding ? (
        <>
          <motion.button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add User
          </motion.button>
          <Link to="/calendar">
            <motion.button
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📅 Go to Calendar
            </motion.button>
          </Link>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter user name"
          />
          <motion.button
            onClick={handleAddUser}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✔
          </motion.button>
          <motion.button
            onClick={() => setIsAdding(false)}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✕
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
