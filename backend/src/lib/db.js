import mongoose from "mongoose";

export const connectDB = async (MONGODB_URI) => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    }
    catch (error) {
        console.log("error while connecting the mongo db", error);
        process.exit(1); // 1 means failure
    }
};