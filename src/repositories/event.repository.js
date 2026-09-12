const pool = require("../config/db");

/**
 * Create a new webhook event subscription record
 */
const createEvent = async (webhookId, event) => {
    const query = `
        INSERT INTO webhook_events
        (webhook_id, event_name)
        VALUES($1, $2)
        RETURNING *
    `;

    const values = [webhookId, event];
    const result = await pool.query(query, values);

    return result.rows[0];
};

/**
 * Fetch a specific event subscription by webhook ID and event topic name
 */
const getEvent = async (webhookId, event) => {
    const query = `
        SELECT *
        FROM webhook_events
        WHERE webhook_id = $1
        AND event_name = $2
    `;

    const values = [webhookId, event];
    const result = await pool.query(query, values);

    return result.rows[0];
};

/**
 * Fetch all event subscriptions associated with a webhook ID
 */
const getEvents = async (webhookId) => {
    const query = `
        SELECT *
        FROM webhook_events
        WHERE webhook_id = $1
    `;

    const result = await pool.query(query, [webhookId]);

    return result.rows;
};

/**
 * Delete a specific event subscription for a user's webhook
 */
const deleteEvent = async (userId, webhookId, event) => {
  const query = `
        DELETE FROM webhook_events we
        USING webhooks w
        WHERE we.webhook_id = w.id
        AND w.user_id = $1
        AND we.webhook_id = $2
        AND we.event_name = $3
        RETURNING we.*;
    `;

  const values = [userId, webhookId, event];
  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = {
    createEvent,
    getEvent,
    getEvents,
    deleteEvent
};