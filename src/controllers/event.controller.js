const pool = require("../config/db");
const eventService = require("../services/event.service");

const createEvent = async (req, res) => {
    try {
        const { id, event } = req.body;
        const webhook_event = await eventService.createEvent(id, event);

        return res.status(201).json(webhook_event);

    } catch (err) {
        console.error(err);
        return res.status(404).json({
            message: err.message || "Something went wrong"
        })
    }
};

const getEvents = async (req, res) => {
    try {
        const { id } = req.body;
        const webhook_event = await eventService.getEvents(id);

        return res.status(200).json(webhook_event);

    } catch (err) {
        console.error(err);
        return res.status(404).json({
            message: err.message || "Something went wrong"
        })
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id, event } = req.body;
        const userId = req.user.id;
        const webhook_event = await eventService.deleteEvent(userId, id, event);

        return res.status(204).json(webhook_event);

    } catch (err) {
        console.error(err);
        return res.status(404).json({
            message: err.message || "Something went wrong"
        })
    }
};

const sendEvent = async (req, res) => {
  const { event_name, data } = req.body;

  if (!event_name || !data) {
    return res.status(400).json({
      message: "event_name and data are required",
    });
  }

  const result = await pool.query(
    `SELECT w.url
         FROM webhooks w
         JOIN webhook_events we
         ON w.id = we.webhook_id
         WHERE we.event_name = $1`,
    [event_name],
  );

  for (const webhook of result.rows) {
    await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name,
        data,
      }),
    });
  }

  res.status(200).json({
    message: "Event sent",
  });
};

module.exports = {
    createEvent, getEvents,
    deleteEvent, sendEvent
};