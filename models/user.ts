import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  token?: string;
  online?: boolean;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User must type name'],
      unique: true,
    },
    token: String,
    online: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<User>('User', userSchema);
