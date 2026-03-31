import authService from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await authService.loginUser(email, password);

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

export const verify = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};


