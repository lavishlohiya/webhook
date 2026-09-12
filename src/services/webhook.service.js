const webhookRepository = require("../repositories/urls.repository");

/**
 * Register a new target webhook URL for a user
 */
const registerWebhook = async (userId, url) => {
    const existingWebhook = await webhookRepository.getWebhook(userId, url);
    
    if (existingWebhook) {
        throw new Error("Webhook already exists in your DB");
    }

    return webhookRepository.createWebhook(userId, url);
};

/**
 * Retrieve all registered webhook URLs for a user
 */
const findWebhooks = async (userId) => {
    return webhookRepository.getWebhooks(userId);
};

/**
 * Remove a registered target webhook URL for a user
 */
const deleteWebhook = async (userId, url) => {
    return await webhookRepository.deleteWebhook(userId, url);
};

module.exports = { registerWebhook, findWebhooks, deleteWebhook };