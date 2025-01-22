import express, { Request, Response } from 'express';
import userRouter from './routers/user';
import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoURI = process.env.DATABASE_MONGODB_URL


if (!mongoURI) {
  throw new Error('DATABASE_MONGODB_URL is not defined');
}

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


// Middleware
app.use(express.json());
app.use("/api/user",userRouter);


// Routes
app.get('/api/hello', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
