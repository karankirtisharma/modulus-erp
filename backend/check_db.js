const mongoose = require('mongoose');
const User = require('./src/modules/users/user.model');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    const users = await User.find({}).select('-password');
    console.log('--- USERS ---');
    console.log(JSON.stringify(users, null, 2));
    console.log('-------------');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
check();
