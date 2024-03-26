const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
  {
    isActive: { type: Boolean, default: true },
    title: { type: String },
    description: { type: String },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'] }
  },
  { timestamps: true }
);

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;
