const authService = require("../services/auth.service");

/**
 * Handle user registration requests
 */
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await authService.registerUser(username, password);

    // Sanitize user object before returning in response
    delete user.password;

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
};

/**
 * Handle user login and JWT cookie issuance
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const token = await authService.loginUser(username, password);
    const isProd = process.env.NODE_ENV === "production";

    // Set HTTP-only session cookie containing JWT
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
};

/**
 * Handle user logout and clear authentication cookie
 */
const logout = async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
    });

    return res.status(200).json({
      message: "Logout successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
};

/**
 * Handle authenticated user account deletion
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await authService.deleteUser(userId);

    return res.status(204).json(user);
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message || "Something went wrong",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  deleteUser,
};

