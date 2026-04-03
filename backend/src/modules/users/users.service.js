const User = require('./user.model');
const { hashPassword } = require('../../utils/bcrypt.utils');

class UsersService {
  /**
   * Create user with role-based restrictions per SRS §4
   * Admin → can create manager
   * Manager → can create employee
   * Employee → cannot create any user
   */
  async createUser(data, creator) {
    const { name, email, password, role, department, managerId } = data;

    // Enforce creation hierarchy
    if (creator.role === 'manager' && role !== 'employee') {
      const error = new Error('Managers can only create employee accounts');
      error.statusCode = 403;
      throw error;
    }

    if (creator.role === 'admin' && !['manager', 'employee'].includes(role)) {
      const error = new Error('Invalid role specified');
      error.statusCode = 400;
      throw error;
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      const error = new Error('Email already exists');
      error.statusCode = 409;
      throw error;
    }

    // Require managerId for employees
    if (role === 'employee' && !managerId) {
      const error = new Error('Manager ID is required for employee accounts');
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      department,
      managerId: role === 'employee' ? (managerId || creator.id) : null,
      organizationId: 'org_modulus_default',
      status: 'active',
    });

    return {
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        department: user.department,
      },
    };
  }

  /**
   * Get users with role-based filtering per SRS §5.2
   * Admin → all users
   * Manager → own team (employees whose managerId === requester.id OR same department)
   */
  async getUsers(query, requester) {
    const { page = 1, limit = 10, department, search } = query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    let filter = {};

    if (requester.role === 'manager') {
      // Manager sees own team members
      const managerUser = await User.findById(requester.id);
      filter.$or = [
        { managerId: requester.id },
        { department: managerUser.department, role: 'employee' },
      ];
    }

    if (department) {
      filter.department = department;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = filter.$or || [];
      const searchConditions = [
        { name: searchRegex },
        { email: searchRegex },
      ];
      if (filter.$or.length > 0) {
        // Combine existing $or with search
        filter = {
          $and: [
            { $or: filter.$or },
            { $or: searchConditions },
          ],
        };
      } else {
        filter.$or = searchConditions;
      }
    }

    const [data, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 }),
      User.countDocuments(filter),
    ]);

    return {
      total,
      page: pageNum,
      limit: limitNum,
      data: data.map((u) => ({
        id: u._id,
        name: u.name,
        role: u.role,
        email: u.email,
        department: u.department,
        status: u.status,
        managerId: u.managerId,
        createdAt: u.createdAt,
      })),
    };
  }

  /**
   * Get user by ID with role-based access per SRS §5.2
   */
  async getUserById(userId, requester) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // Employee can only view own profile
    if (requester.role === 'employee' && user._id.toString() !== requester.id) {
      const error = new Error('Access denied');
      error.statusCode = 403;
      throw error;
    }

    // Manager can only view own team
    if (requester.role === 'manager') {
      const managerUser = await User.findById(requester.id);
      if (
        user._id.toString() !== requester.id &&
        user.managerId?.toString() !== requester.id &&
        user.department !== managerUser.department
      ) {
        const error = new Error('Access denied');
        error.statusCode = 403;
        throw error;
      }
    }

    return {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      department: user.department,
      status: user.status,
      managerId: user.managerId,
      createdAt: user.createdAt,
    };
  }

  /**
   * Delete user — Admin only per SRS §4
   */
  async deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    await User.findByIdAndDelete(userId);
    return { message: 'User deleted successfully' };
  }

  /**
   * Get own profile per SRS §5.2
   */
  async getProfile(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      department: user.department,
      status: user.status,
      managerId: user.managerId,
      createdAt: user.createdAt,
    };
  }
}

module.exports = new UsersService();
