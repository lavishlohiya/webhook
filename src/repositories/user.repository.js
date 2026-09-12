const pool = require("../config/db");

/**
 * Insert a new user record into the database
 */
const createUser = async (username, password) => {
    const query = `
        INSERT INTO users
        (username, password)
        VALUES ($1, $2)
        RETURNING *
    `;

    const values = [username, password];
    const result = await pool.query(query, values);

    return result.rows[0];
};

/**
 * Retrieve user record by username
 */
const getUserByUsername = async (username) => {
    const query = `
        SELECT *
        FROM users
        WHERE username = $1
    `;

    const result = await pool.query(query, [username]);

    return result.rows[0];
};

/**
 * Retrieve user record by user ID
 */
const getUserById = async (id) => {
    const query = `
        SELECT *
        FROM users
        WHERE id = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};

/**
 * Delete user record by user ID
 */
const deleteUser = async (id) => {
    const query = `
        DELETE FROM users
        WHERE id = $1
        RETURNING *
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
};

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    deleteUser
};