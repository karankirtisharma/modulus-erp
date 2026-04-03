const Leave = require('./leave.model');
const User = require('../users/user.model');

class LeavesService {
  /**
   * Apply for leave — Employee only per SRS §4
   */
  async applyLeave(data, employeeId) {
    const { leaveType, startDate, endDate, reason } = data;

    // Validate endDate >= startDate
    if (new Date(endDate) < new Date(startDate)) {
      const error = new Error('End date must be on or after start date');
      error.statusCode = 400;
      throw error;
    }

    const leave = await Leave.create({
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
      status: 'pending',
    });

    return {
      message: 'Leave applied',
      leave: {
        id: leave._id,
        status: leave.status,
        employeeId: leave.employeeId,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
      },
    };
  }

  /**
   * Approve/Reject leave — Admin/Manager only per SRS §5.4
   */
  async approveLeave(leaveId, status, remarks, approverId) {
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      const error = new Error('Leave request not found');
      error.statusCode = 404;
      throw error;
    }

    if (leave.status !== 'pending') {
      const error = new Error('This leave request has already been processed');
      error.statusCode = 400;
      throw error;
    }

    leave.status = status;
    leave.approvedBy = approverId;
    leave.remarks = remarks || '';
    await leave.save();

    return {
      message: `Leave ${status}`,
      leave: {
        id: leave._id,
        status: leave.status,
        approvedBy: leave.approvedBy,
      },
    };
  }

  /**
   * Get leaves with role-based filtering per SRS §5.4
   * Admin → all leaves
   * Manager → team leaves
   * Employee → own leaves
   */
  async getLeaves(query, requester) {
    const { page = 1, limit = 10, status } = query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    let filter = {};

    if (requester.role === 'employee') {
      filter.employeeId = requester.id;
    } else if (requester.role === 'manager') {
      // Get all employees managed by this manager
      const teamMembers = await User.find({
        $or: [
          { managerId: requester.id },
          { _id: requester.id },
        ],
      }).select('_id');
      const teamIds = teamMembers.map((m) => m._id);
      filter.employeeId = { $in: teamIds };
    }
    // Admin → no filter

    if (status) filter.status = status;

    const [data, total] = await Promise.all([
      Leave.find(filter)
        .populate('employeeId', 'name email department')
        .populate('approvedBy', 'name email')
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 }),
      Leave.countDocuments(filter),
    ]);

    return {
      total,
      page: pageNum,
      limit: limitNum,
      data: data.map((l) => ({
        id: l._id,
        employeeId: l.employeeId,
        leaveType: l.leaveType,
        startDate: l.startDate,
        endDate: l.endDate,
        reason: l.reason,
        status: l.status,
        approvedBy: l.approvedBy,
        remarks: l.remarks,
        createdAt: l.createdAt,
      })),
    };
  }
}

module.exports = new LeavesService();
