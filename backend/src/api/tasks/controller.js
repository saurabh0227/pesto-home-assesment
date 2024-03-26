const TaskModel = require('./model');

exports.addTask = async (req, res) => {
  try {
    const body = req.body;
    console.log('body', body);
    const task = await TaskModel.create(body);
    return res.status(201).send({
      status: true,
      success: {
        message: 'Task Added!',
        data: task
      }
    });
  } catch (error) {
    console.log('Add Task: ', error);
    return error;
  }
};

exports.fetchTasks = async (req, res) => {
  try {
    const query = req.query;
    query.isActive = true;
    if (query.status === 'undefined' || query.status === 'All') {
      delete query.status;
    }
    const tasks = await TaskModel.find(query);
    if (tasks.length === 0) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'No tasks found!'
        }
      });
    } else {
      res.status(200).send({
        status: true,
        success: {
          message: 'Tasks fetched successfully!',
          data: tasks
        },
        error: null
      });
    }
  } catch (error) {
    console.log('Get Tasks: ', error);
    return error;
  }
};

exports.updateTask = async (req, res) => {
  try {
    const body = req.body;
    const taskId = req.params.id;
    await TaskModel.updateOne({ _id: taskId }, body);
    const task = await TaskModel.findOne({ _id: taskId });
    res.status(201).send({
      status: true,
      success: {
        message: 'Tasks updated successfully!',
        data: task
      },
      error: null
    });
  } catch (error) {
    console.log('Update Task: ', error);
    return error;
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await TaskModel.updateOne({ _id: taskId }, { isActive: false });
    res.status(204).send({
      status: true,
      success: {
        message: 'Tasks updated successfully!'
      },
      error: null
    });
  } catch (error) {
    console.log('Delete Task: ', error);
    return error;
  }
};
