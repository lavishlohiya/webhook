const pool = require("../config/db");

/**
 * Insert a target webhook URL for a user
 */
const createWebhook = async (userId, url) => {
    const query = `
        INSERT INTO webhooks
        (user_id, url)
        VALUES ($1, $2)
        RETURNING *
    `;

    const values = [userId, url];
    const result = await pool.query(query, values);

    return result.rows[0];
};

/**
 * Get all webhooks registered by a user
 */
const getWebhooks = async (userId) => {
    const query = `
        SELECT *
        FROM webhooks
        WHERE user_id = $1
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
};

/**
 * Get specific webhook by user ID and target URL
 */
const getWebhook = async (userId, url) => {
    const query = `
        SELECT *
        FROM webhooks
        WHERE user_id = $1
        AND url = $2
    `;

    const values = [userId, url];
    const result = await pool.query(query, values);

    return result.rows[0];
};

/**
 * Delete specific webhook for a user
 */
const deleteWebhook = async (userId, url) => {
    const query = `
        DELETE FROM webhooks
        WHERE user_id = $1
        AND url = $2
        RETURNING *
    `;

    const values = [userId, url];
    const result = await pool.query(query, values);

    return result.rows[0] || null;
};

module.exports = {
    createWebhook,
    getWebhooks,
    getWebhook,
    deleteWebhook
};

