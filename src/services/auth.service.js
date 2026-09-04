const bcrypt = requrie("bcrypt");
const jwt = requrie("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

const registerUser = async (username, password) => {
    const existingUser = await userRepository.getUserByUsername(username);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashPass = await bcrypt.hash(password, 10);

    return userRepository.createUser(username, hashPass);
};

const loginUser = async (username, password) => {
    const existingUser = await userRepository.getUserByUsername(username);

    if (!existingUser) {
        throw new Error("User does not exists");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
        throw new Error("Invalid username or password");
    }

    const token = jwt.sign({
        id: existingUser.id
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return token;
};

module.exports = { registerUser, loginUser };