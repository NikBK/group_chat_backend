import mongoose from 'mongoose';
import { hashPassword } from '../lib/utils.js';


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    this.password = await hashPassword(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

export const User = mongoose.model('User', UserSchema);
