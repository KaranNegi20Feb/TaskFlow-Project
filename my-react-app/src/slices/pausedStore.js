import { create } from "zustand";

const usepausedStore = create((set) => ({
    tasks: [],
    fetchTasks: async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/pausedtasks/ptasks");
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


    addptask: async (task) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/pausedtasks/ptasks", {
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
}));

export default usepausedStore;
