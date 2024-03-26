import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';

const TaskWrapper = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (filter) => {
    try {
      const data = await axios.get(`/tasks/fetch?status=${filter}`);
      const tasks = data.data.success.data;
      setTasks(tasks);
    } catch (error) {
      console.log('FetchTasksError', error);
    }
  };

  const addTask = async (newTask) => {
    await axios.post('/tasks/add', newTask);
    setTasks([...tasks, { ...newTask }]);
  };

  const deleteTask = async (id) => {
    await axios.put(`/tasks/delete/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const updateTask = async (updatedTask) => {
    await axios.put(`/tasks/update/${updatedTask._id}`, updatedTask);
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mt-4 text-base text-gray-700 rounded-sm bg-gray-200 px-8 py-8 items-center">
        <h1 className="text-lg">Task Manager</h1>
        <div className="flex mt-4">
          <TaskForm onSubmit={addTask} />
        </div>
      </div>
      <div className="flex flex-col mt-4 text-base text-gray-700 rounded-sm bg-gray-200 px-8 py-8 items-center">
        <h1 className="text-lg">Task List</h1>
        <div className="flex mt-2">
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onFilter={fetchTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskWrapper;
