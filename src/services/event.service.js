const eventRepository = require("../repositories/event.repository");

/**
 * Create a new event binding for a specific webhook ID
 */
const createEvent = async (webhookId, event) => {
    const existingEvent = await eventRepository.getEvent(webhookId, event);

    if (existingEvent) {
        throw new Error("Event already exists in the webhook");
    }

    return eventRepository.createEvent(webhookId, event);
};

/**
 * Retrieve all events associated with a specific webhook ID
 */
const getEvents = async (webhookId) => {
    return eventRepository.getEvents(webhookId);
};

/**
 * Remove an event binding from a webhook
 */
const deleteEvent = async (userId, webhookId, event) => {
    return eventRepository.deleteEvent(userId, webhookId, event);
};

module.exports = { createEvent, getEvents, deleteEvent };