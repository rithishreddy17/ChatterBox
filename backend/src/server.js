import express from "express";
import "dotenv/config";
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/user.route.js';
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT;


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,   // allow frontend to send the cookie
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB(MONGODB_URI);
});