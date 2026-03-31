import bcrypt from "bcrypt";
import User from "./models/User.js";

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.PASSWORD;

  if (!email || !password) {
    throw new Error("❌ ADMIN_EMAIL or PASSWORD is not set in .env");
  }

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    console.log("✅ Admin already exists");
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await new User({
    name: "Admin",
    email,
    password: hashPassword,
    role: "admin",
  }).save();

  console.log(`✅ Admin user created with email: ${email}`);
};
