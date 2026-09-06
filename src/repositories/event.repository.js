const pool = require("../config/db");

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
}

const getEvents = async (webhookId) => {
    const query = `
        SELECT *
        FROM webhook_events
        WHERE webhook_id = $1
    `;

    const result = await pool.query(query, [webhookId]);

    return result.rows;
};

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
    createEvent, getEvent, getEvents,
    deleteEvent
};