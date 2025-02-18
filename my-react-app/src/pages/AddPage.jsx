import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const AddPage = () => {
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState({
        title: '',
        status: 'Backlog',
        startDate: '',
        endDate: '',
        assignees: [],
    });

    // Fetch Users on Component Mount
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/users/showusers')
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.user)) {
                    setUsers(data.user.map((user) => ({ value: user.name, label: user.name })));
                }
            })
            .catch((err) => console.error('Error fetching users:', err));
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    // Handle Assignees Change (Multi-Select)
    const handleAssigneesChange = (selectedOptions) => {
        setTask((prev) => ({
            ...prev,
            assignees: selectedOptions.map((option) => option.value),
        }));
    };

    

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v1/generaltasks/generaltask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            const result = await response.json();
            if (result.success) {
                alert('Task added successfully!');
                setTask({ title: '', status: 'Backlog', startDate: '', endDate: '', assignees: [] });
            } else {
                alert('Failed to add task.');
            }
        } catch (error) {
            console.error('Error submitting task:', error);
        }
    };

    return (
        <div className="flex w-full min-h-screen justify-center items-center bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Create New Task</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={task.title} 
                            onChange={handleChange} 
                            className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                            required 
                        />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Status</label>
                        <select 
                            name="status" 
                            value={task.status} 
                            onChange={handleChange} 
                            className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        >
                            <option value="Backlog">Backlog</option>
                            <option value="General">General</option>
                            <option value="Inprogress">In Progress</option>
                            <option value="Paused">Paused</option>
                        </select>
                    </div>

                    {/* Start Date */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Start Date</label>
                        <input 
                            type="date" 
                            name="startDate" 
                            value={task.startDate} 
                            onChange={handleChange} 
                            className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                            required 
                        />
                    </div>

                    {/* End Date */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">End Date</label>
                        <input 
                            type="date" 
                            name="endDate" 
                            value={task.endDate} 
                            onChange={handleChange} 
                            className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                            required 
                        />
                    </div>

                    {/* Assignees */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Assignees</label>
                        <Select
                            isMulti
                            options={users}
                            value={users.filter(user => task.assignees.includes(user.value))}
                            onChange={handleAssigneesChange}
                            className="border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Submit Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPage;
