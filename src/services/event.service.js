const eventRepository = require("../repositories/event.repository");

const createEvent = async (webhookId, event) => {
    const existingEvent = await eventRepository.getEvent(webhookId, event);

    if (existingEvent) {
        throw new Error("Event already exists in the webhook");
    }

    return eventRepository.createEvent(webhookId, event);
};

const getEvents = async (webhookId) => {
    return eventRepository.getEvents(webhookId);
};

const deleteEvent = async (userId, webhookId, event) => {
    return eventRepository.deleteEvent(userId, webhookId, event);
};

module.exports = { createEvent, getEvents, deleteEvent };