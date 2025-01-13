"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FaEdit, FaTrash, FaCheckCircle, FaUndo, FaPlus } from "react-icons/fa";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch tasks.", "error");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTask = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Create a new task",
      html: `
        <input type="text" id="title" class="swal2-input" placeholder="Task title" required>
        <input type="text" id="description" class="swal2-input" placeholder="Task description">
        <input type="datetime-local" id="dueDate" class="swal2-input" required>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Create",
      preConfirm: () => {
        const title = Swal.getPopup().querySelector("#title").value.trim();
        const description = Swal.getPopup().querySelector("#description").value.trim();
        const dueDateInput = Swal.getPopup().querySelector("#dueDate").value;

        if (!title || !dueDateInput) {
          Swal.showValidationMessage("All fields are required.");
          return null;
        }

        return { title, description, dueDate: dueDateInput };
      },
    });

    if (!formValues) return;

    try {
      const newTask = {
        title: formValues.title,
        description: formValues.description,
        dueDate: new Date(formValues.dueDate).toISOString(),
        status: "Pending", // Default status
      };

      const response = await axios.post("http://127.0.0.1:4000/tasks", newTask);
      setTasks([...tasks, response.data]);
      Swal.fire("Success", "Task added successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to add task.", "error");
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const updatedStatus = task.status === "Pending" ? "Completed" : "Pending";
      const updatedTask = { ...task, status: updatedStatus };
      await axios.patch(`http://127.0.0.1:4000/tasks/${task.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, status: updatedStatus } : t
        )
      );
      Swal.fire(
        "Success",
        `Task marked as ${updatedStatus === "Completed" ? "Completed" : "Pending"}!`,
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "Failed to update task status.", "error");
    }
  };

  const handleDeleteTask = async (task) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmed.isConfirmed) return;

    try {
      await axios.delete(`http://127.0.0.1:4000/tasks/${task.id}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      Swal.fire("Deleted!", "Task has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to delete task.", "error");
    }
  };

  const incompleteTasks = filteredTasks.filter((task) => task.status === "Pending");
  const completedTasks = filteredTasks.filter((task) => task.status === "Completed");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">Taski</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">Mee Solutions</span>
          <img
            src="https://ui-avatars.com/api/?name=Mee+Solutions&background=random"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-blue-600">Mee Solutions</span>.
          </h2>
          <p className="text-gray-500 text-lg mt-2">
            You've got {tasks.length} tasks to do.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <FaPlus /> Add Task
          </button>

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Task Sections */}
        <div>
          {/* Incomplete Tasks */}
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Pending Tasks</h3>
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-4 mb-4 bg-gray-100 rounded-lg shadow"
              >
                <div>
                  <h4 className="text-xl text-gray-500">{task.title}</h4>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <FaCheckCircle
                    className="text-green-500 cursor-pointer hover:text-green-700"
                    onClick={() => handleToggleStatus(task)}
                    title="Mark as Completed"
                  />
                  <FaEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    title="Edit Task"
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDeleteTask(task)}
                    title="Delete Task"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No pending tasks available.</p>
          )}

          {/* Completed Tasks */}
          <h3 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Completed Tasks</h3>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-4 mb-4 bg-gray-200 rounded-lg shadow"
              >
                <div>
                  <h4 className="text-xl text-gray-500">{task.title}</h4>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <FaUndo
                    className="text-yellow-500 cursor-pointer hover:text-yellow-700"
                    onClick={() => handleToggleStatus(task)}
                    title="Mark as Pending"
                  />
                  <FaEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    title="Edit Task"
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDeleteTask(task)}
                    title="Delete Task"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No completed tasks available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
