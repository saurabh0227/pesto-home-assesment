import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [titleError, setTitleError] = useState('');

  const statusOptions = ['To Do', 'In Progress', 'Done'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError('Title cannot be empty');
      return;
    }
    onSubmit({ title, description, status: status });
    setTitle('');
    setDescription('');
    setTitleError('');
  };

  return (
    <form className="flex flex-row items-center" onSubmit={handleSubmit}>
      <input
        className="flex items-center"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setTitleError('');
        }}
      />
      {titleError && <p className="text-red-500">{titleError}</p>}
      <textarea
        className="flex ml-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label className="flex ml-2">
        Status:
        <select
          className="ml-1"
          // onChange={(e) => setStatus(e.target.value)}
          value={status}
          disabled={true}
        >
          {statusOptions.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </label>
      <button className="flex ml-2" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
