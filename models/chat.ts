import mongoose, { Schema, Document } from 'mongoose';

interface Chat extends Document {
  chat: string;
  user: {
    id: mongoose.Types.ObjectId;
    name: string;
  };
}

const chatSchema: Schema = new Schema(
  {
    chat: { type: String, required: true },
    user: {
      id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
    },
  },
  { timestamps: true } // 'timestamps'로 수정 (복수형)
);

export default mongoose.model<Chat>('Chat', chatSchema);
