import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI || process.env.MONGO_URI.includes("<username>")) {
            console.warn(
                "⚠️ [Database Warning]: MONGO_URI is not set or contains placeholders in backend/.env.\n" +
                "   Please provide your real MongoDB connection string in backend/.env to connect to the database."
            );
            return false;
        }
        if (mongoose.connection.readyState >= 1) {
            return true;
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Atlas connected successfully");
        return true;
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;