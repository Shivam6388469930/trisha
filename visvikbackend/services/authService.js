import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid credentials pass");
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken({ _id: user._id, role: user.role });

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
  };
};

export default { loginUser };
