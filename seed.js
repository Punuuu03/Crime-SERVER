// seed.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/Login.js'; // adjust path if needed

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const hashedPassword = await bcrypt.hash('1234', 10);
    await User.create({
      
      username: 'police',
      password: hashedPassword,
    });
    console.log('✅ User created successfully!');
  } catch (err) {
    console.error('❌ Error seeding user:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

seed();
