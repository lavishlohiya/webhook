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

module.exports = { createEvent, getEvents, deleteEvent };