const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

/**
 * Register a new user with hashed password
 */
const registerUser = async (username, password) => {
    const existingUser = await userRepository.getUserByUsername(username);

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password with salt rounds = 10
    const hashPass = await bcrypt.hash(password, 10);

    return userRepository.createUser(username, hashPass);
};

/**
 * Authenticate user credentials and sign JWT token
 */
const loginUser = async (username, password) => {
    const existingUser = await userRepository.getUserByUsername(username);

    if (!existingUser) {
        throw new Error("User does not exists");
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
        throw new Error("Invalid username or password");
    }

    // Sign JWT token valid for 1 day
    const token = jwt.sign({
        id: existingUser.id
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return token;
};

/**
 * Delete a user account by user ID
 */
const deleteUser = async (id) => {
    const existingUser = await userRepository.getUserById(id);

    if (!existingUser) {
      throw new Error("User does not exists");
    }

    return await userRepository.deleteUser(existingUser.id);
};

module.exports = { registerUser, loginUser, deleteUser };