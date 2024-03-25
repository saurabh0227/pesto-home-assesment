import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskWrapper = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    console.log('updatedTask', updateTask);
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

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
          <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
        </div>
      </div>
    </div>
  );
};

export default TaskWrapper;
