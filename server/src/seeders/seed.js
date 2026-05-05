import connectDB from "../config/db.js";
import User from "../models/authModel.js";
import bcrypt from "bcrypt";

const seedUsers = async () => {
  try {
    await connectDB();

    console.log("✅ DB Connected");

    await User.deleteMany();
    console.log("🗑️ Old users removed");

    const users = [
      {
        name: "Vineet",
        password: await bcrypt.hash("123456", 10),
      },
      {
        name: "Rahul",
        password: await bcrypt.hash("password123", 10),
      },
    ];

    await User.insertMany(users);

    console.log("🌱 Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();