// app.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const dbConnectionString = process.env.DB;

app.use(cors());

if (!dbConnectionString) {
  throw new Error('환경 변수 DB가 정의되어 있지 않습니다.');
}

mongoose
  .connect(dbConnectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: any) => console.error('MongoDB connection error:', err));

export default app;
