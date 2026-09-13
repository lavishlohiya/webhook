const pool = require("../config/db");
const webhookQueue = require("../queues/webhook.queue");
const eventService = require("../services/event.service");

/**
 * Bind an event topic/name to a specific webhook ID
 */
const createEvent = async (req, res) => {
  try {
    const { id, event } = req.body;
    const webhook_event = await eventService.createEvent(id, event);

    return res.status(201).json(webhook_event);
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message || "Something went wrong",
    });
  }
};

/**
 * Fetch all events bound to a specific webhook ID
 */
const getEvents = async (req, res) => {
  try {
    const { id } = req.body;
    const webhook_event = await eventService.getEvents(id);

    return res.status(200).json(webhook_event);
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message || "Something went wrong",
    });
  }
};

/**
 * Delete a specific event binding from a webhook
 */
const deleteEvent = async (req, res) => {
  try {
    const { id, event } = req.body;
    const userId = req.user.id;
    const webhook_event = await eventService.deleteEvent(userId, id, event);

    return res.status(204).json(webhook_event);
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message || "Something went wrong",
    });
  }
};

/**
 * Dispatch event payload to all target webhook endpoints registered for the event_name
 */
const sendEvent = async (req, res) => {
  try {
    const { event_name, data } = req.body;

    if (!event_name || !data) {
      return res.status(400).json({
        message: "event_name and data are required",
      });
    }

    // Retrieve target webhook URLs associated with the specified event topic
    const result = await pool.query(
      `SELECT w.url
         FROM webhooks w
         JOIN webhook_events we
         ON w.id = we.webhook_id
         WHERE we.event_name = $1`,
      [event_name],
    );

    // Send HTTP POST requests to each subscribed webhook endpoint
    for (const webhook of result.rows) {
      await webhookQueue.add("deliver-webhook", {
        url: webhook.url,
        event_name,
        data,
      });
    }

    res.status(200).json({
      message: "Event sent",
    });
    
  } catch (err) {
    console.error(error);

    res.status(500).json({
      message: "Failed to queue event",
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
  sendEvent,
};
