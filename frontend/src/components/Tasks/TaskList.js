import React, { useState } from 'react';
import Task from './Task';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  const [filter, setFilter] = useState('All');
  const statusOptions = ['All', 'To Do', 'In Progress', 'Done'];

  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="flex">
        Filter by Status:
        <select className="ml-1" value={filter} onChange={handleChangeFilter}>
          {statusOptions.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </label>
      {filteredTasks.length === 0 && (
        <div className="flex mt-4">No Task found</div>
      )}
      {filteredTasks.map((task) => (
        <div className="bg-white mt-3 w-96">
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
