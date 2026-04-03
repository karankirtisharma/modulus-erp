const Task = require('./task.model');
const User = require('../users/user.model');

class TasksService {
  /**
   * Create task — Admin/Manager only per SRS §4
   */
  async createTask(data, creator) {
    const { title, description, assignedTo, department, priority, dueDate } = data;

    // Verify assignedTo user exists
    const assignee = await User.findById(assignedTo);
    if (!assignee) {
      const error = new Error('Assigned user not found');
      error.statusCode = 404;
      throw error;
    }

    const task = await Task.create({
      title,
      description: description || '',
      assignedTo,
      assignedBy: creator.id,
      department: department || assignee.department,
      status: 'pending',
      priority: priority || 'medium',
      dueDate,
    });

    return {
      message: 'Task created',
      task: {
        id: task._id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assignedTo,
        assignedBy: task.assignedBy,
        department: task.department,
        dueDate: task.dueDate,
      },
    };
  }

  /**
   * Get tasks with role-based filtering per SRS §5.3
   * Admin → ALL tasks
   * Manager → department tasks
   * Employee → own tasks only
   */
  async getTasks(query, requester) {
    const { page = 1, limit = 10, status, priority } = query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    let filter = {};

    // Role-based filtering — resolved in service layer per SRS
    if (requester.role === 'employee') {
      filter.assignedTo = requester.id;
    } else if (requester.role === 'manager') {
      const managerUser = await User.findById(requester.id);
      filter.department = managerUser.department;
    }
    // Admin → no filter (all tasks)

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const [data, total] = await Promise.all([
      Task.find(filter)
        .populate('assignedTo', 'name email department')
        .populate('assignedBy', 'name email')
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 }),
      Task.countDocuments(filter),
    ]);

    return {
      total,
      page: pageNum,
      limit: limitNum,
      data: data.map((t) => ({
        id: t._id,
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        assignedTo: t.assignedTo,
        assignedBy: t.assignedBy,
        department: t.department,
        dueDate: t.dueDate,
        createdAt: t.createdAt,
      })),
    };
  }

  /**
   * Update task status per SRS §5.3
   * Admin/Manager → any task
   * Employee → own task only
   */
  async updateTaskStatus(taskId, status, requester) {
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    // Employee can only update own tasks
    if (requester.role === 'employee' && task.assignedTo.toString() !== requester.id) {
      const error = new Error('Access denied. You can only update your own tasks.');
      error.statusCode = 403;
      throw error;
    }

    task.status = status;
    await task.save();

    return {
      message: 'Task status updated',
      task: {
        id: task._id,
        title: task.title,
        status: task.status,
      },
    };
  }

  /**
   * Reassign task — Admin/Manager only per SRS §4
   */
  async assignTask(taskId, assignedTo) {
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    const assignee = await User.findById(assignedTo);
    if (!assignee) {
      const error = new Error('Assigned user not found');
      error.statusCode = 404;
      throw error;
    }

    task.assignedTo = assignedTo;
    await task.save();

    return {
      message: 'Task reassigned',
      task: {
        id: task._id,
        title: task.title,
        assignedTo: task.assignedTo,
      },
    };
  }

  /**
   * Delete task — Admin/Manager only per SRS §4
   */
  async deleteTask(taskId) {
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }
    await Task.findByIdAndDelete(taskId);
    return { message: 'Task deleted successfully' };
  }
}

module.exports = new TasksService();
