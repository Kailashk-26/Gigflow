import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoute.js';
import gigRouter from './routes/gigRoute.js';
import bidRouter from './routes/bidRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  })
)

app.get('/',(req,res)=>res.send('server is live'))
app.listen(PORT,()=>console.log(`server is running on ${PORT}`))

app.use("/api/users", userRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/bids", bidRouter);
