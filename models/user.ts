import mongoose, { Schema, Document } from 'mongoose';

export interface UserInfo extends Document {
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

export default mongoose.model<UserInfo>('User', userSchema);
