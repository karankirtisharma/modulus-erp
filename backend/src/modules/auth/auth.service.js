const User = require('../users/user.model');
const { comparePassword } = require('../../utils/bcrypt.utils');
const { generateToken } = require('../../utils/jwt.utils');

class AuthService {
  async login(email, password) {
    // Find user with password field included
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Generate JWT per SRS §2.3
    const token = generateToken({
      id: user._id,
      role: user.role,
      organizationId: user.organizationId,
    });

    // Return token + user metadata (never password)
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        department: user.department,
      },
    };
  }
}

module.exports = new AuthService();
