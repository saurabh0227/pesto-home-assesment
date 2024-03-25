import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TaskEditModal } from './TaskEditModal';

const Task = ({ task, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const statusOptions = ['To Do', 'In Progress', 'Done'];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteButton = () => {
    onDelete(task.id);
  };

  const handleEditButton = () => {
    openModal();
  };

  const handleUpdate = () => {
    onUpdate({ ...task, title, description, status });
    closeModal();
  };

  return (
    <div className="flex flex-col text-gray-700">
      <div className="flex flex-col">
        <div>Title: {task.title}</div>
        <div className="mt-1">Description: {task.description}</div>
        <div className="mt-1">Status: {task.status}</div>
      </div>
      <div className="flex mt-1">
        <FontAwesomeIcon
          className="edit-icon cursor-pointer"
          icon={faPenToSquare}
          onClick={handleEditButton}
        />
        <FontAwesomeIcon
          className="delete-icon ml-1 cursor-pointer"
          icon={faTrash}
          onClick={handleDeleteButton}
        />
        <TaskEditModal isOpen={isModalOpen} onClose={closeModal}>
          {/* Edit modal content */}
          <div className="flex flex-col">
            <div className="flex text-lg font-bold">{`Edit task ${task.title}`}</div>
            <form
              className="flex flex-row items-center mt-2"
              onSubmit={() => handleUpdate()}
            >
              <input
                className="flex items-center bg-gray-200 rounded-sm"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="flex ml-2 bg-gray-200 rounded-sm"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label className="flex ml-2 bg-gray-200 rounded-sm">
                Status:
                <select
                  className="ml-1"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statusOptions.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
              </label>
              <button
                className="flex ml-2 bg-gray-200 rounded-sm"
                type="submit"
              >
                Update Task
              </button>
            </form>
          </div>
        </TaskEditModal>
      </div>
    </div>
  );
};

export default Task;
