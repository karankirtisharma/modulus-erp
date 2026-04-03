const User = require('../users/user.model');
const Task = require('../tasks/task.model');
const Leave = require('../leaves/leave.model');

class DashboardService {
  /**
   * Get dashboard stats — different aggregation per role per SRS §5.5
   */
  async getStats(requester) {
    if (requester.role === 'admin') {
      return this.getAdminStats();
    } else if (requester.role === 'manager') {
      return this.getManagerStats(requester.id);
    } else {
      return this.getEmployeeStats(requester.id);
    }
  }

  /**
   * Admin stats per SRS §5.5
   */
  async getAdminStats() {
    const [
      totalEmployees,
      activeTasks,
      pendingLeaves,
      completedTasks,
      departmentStats,
    ] = await Promise.all([
      User.countDocuments({ status: 'active' }),
      Task.countDocuments({ status: { $in: ['pending', 'in-progress'] } }),
      Leave.countDocuments({ status: 'pending' }),
      Task.countDocuments({ status: 'completed' }),
      User.aggregate([
        { $match: { status: 'active' } },
        {
          $group: {
            _id: '$department',
            employees: { $sum: 1 },
          },
        },
        { $sort: { employees: -1 } },
      ]),
    ]);

    // Get active tasks per department
    const deptTaskStats = await Task.aggregate([
      { $match: { status: { $in: ['pending', 'in-progress'] } } },
      { $group: { _id: '$department', activeTasks: { $sum: 1 } } },
    ]);

    const deptTaskMap = {};
    deptTaskStats.forEach((d) => {
      deptTaskMap[d._id] = d.activeTasks;
    });

    const formattedDeptStats = departmentStats.map((d) => ({
      dept: d._id,
      employees: d.employees,
      activeTasks: deptTaskMap[d._id] || 0,
    }));

    return {
      totalEmployees,
      activeTasks,
      pendingLeaves,
      completedTasks,
      departmentStats: formattedDeptStats,
    };
  }

  /**
   * Manager stats per SRS §5.5
   */
  async getManagerStats(managerId) {
    const managerUser = await User.findById(managerId);
    const department = managerUser.department;

    const teamMembers = await User.find({
      $or: [
        { managerId: managerId },
        { department, role: 'employee' },
      ],
    }).select('_id');
    const teamIds = teamMembers.map((m) => m._id);

    const [teamSize, teamActiveTasks, pendingLeaveApprovals, teamCompletedTasks] =
      await Promise.all([
        teamIds.length,
        Task.countDocuments({
          department,
          status: { $in: ['pending', 'in-progress'] },
        }),
        Leave.countDocuments({
          employeeId: { $in: teamIds },
          status: 'pending',
        }),
        Task.countDocuments({
          department,
          status: 'completed',
        }),
      ]);

    return {
      teamSize,
      teamActiveTasks,
      pendingLeaveApprovals,
      teamCompletedTasks,
    };
  }

  /**
   * Employee stats per SRS §5.5
   */
  async getEmployeeStats(employeeId) {
    const [myActiveTasks, myCompletedTasks, pendingLeaveRequest, totalLeaves] =
      await Promise.all([
        Task.countDocuments({
          assignedTo: employeeId,
          status: { $in: ['pending', 'in-progress'] },
        }),
        Task.countDocuments({
          assignedTo: employeeId,
          status: 'completed',
        }),
        Leave.countDocuments({
          employeeId,
          status: 'pending',
        }),
        Leave.countDocuments({
          employeeId,
          status: 'approved',
        }),
      ]);

    // Simple leave balance calculation (20 days annual - approved leaves)
    const leaveBalance = Math.max(0, 20 - totalLeaves);

    return {
      myActiveTasks,
      myCompletedTasks,
      leaveBalance,
      pendingLeaveRequest,
    };
  }
}

module.exports = new DashboardService();
