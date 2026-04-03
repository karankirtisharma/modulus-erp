/**
 * Admin seed script per SRS §2.1
 * Seeds the initial admin user into the database.
 * Run: npm run seed
 */
const mongoose = require('mongoose');
const env = require('./config/env');
const User = require('./modules/users/user.model');
const { hashPassword } = require('./utils/bcrypt.utils');

const seedAdmin = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const usersToSeed = [
      {
        name: 'System Admin',
        email: 'admin@modulus.com',
        role: 'admin',
        password: 'Admin@123456',
        department: 'Administration'
      },
      {
        name: 'John Manager',
        email: 'manager@modulus.com',
        role: 'manager',
        password: 'Manager@123456',
        department: 'Engineering'
      },
      {
        name: 'Jane Employee',
        email: 'employee@modulus.com',
        role: 'employee',
        password: 'Employee@123456',
        department: 'Engineering'
      }
    ];

    for (const u of usersToSeed) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        const hashedPassword = await hashPassword(u.password);
        await User.create({
          ...u,
          password: hashedPassword,
          organizationId: 'org_modulus_default',
          status: 'active',
        });
        console.log(`✅ Seeded ${u.role}: ${u.email} / ${u.password}`);
      } else {
        console.log(`ℹ️  User already exists: ${u.email}`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();
