import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb+srv://contact_db_user:QL7z0tkGxA7Y60ri@ricr.wp5wt34.mongodb.net/RICR_DB?retryWrites=true&w=majority";

  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    console.error("MongoDB is not reachable. Start mongod or fix MONGO_URI in .env.");

  }
};  
export default connectDB;  