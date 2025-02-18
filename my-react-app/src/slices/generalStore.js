import { create } from "zustand";

const useGeneralStore = create((set) => ({
    tasks: [],
    users: [],

    fetchTasks: async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/generaltasks/tasks");
            const data = await response.json();
            if (data.success) {
                set({ tasks: data.tasks }); // Updating the Zustand state
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    },

    fetchUsers: async () => {
        try {
          const response = await fetch("http://localhost:3000/api/v1/users/showusers");
          const data = await response.json();
          if (data.success && Array.isArray(data.user)) {
            set({ users: data.user });
          } else {
            console.error("Failed to fetch users");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },

    addGtask: async (task) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/generaltasks/generaltask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            const result = await response.json();
            if (result.success) {
                set((state) => ({ tasks: [...state.tasks, task] }));
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    },
    
    adduser: async (user) => {
        try {
          const response = await fetch("http://localhost:3000/api/v1/users/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
      
          if (!response.ok) {
            throw new Error("Failed to add user");
          }
      
          const data = await response.json();
          return { success: true, data };
        } catch (error) {
          console.error("Error in addUser:", error);
          return { success: false, message: error.message };
        }
      },
      
    
}));

export default useGeneralStore;
