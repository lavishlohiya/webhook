const webhookRepository = require("../repositories/urls.repository");

const registerWebhook = async (userId, url) => {
    const existingWebhook = await webhookRepository.getWebhook(userId, url);
    
    if (existingWebhook) {
        throw new Error("Webhook already exists in your DB");
    }

    return webhookRepository.createWebhook(userId, url);
};

const findWebhooks = async (userId) => {
    return webhookRepository.getWebhooks(userId);
};

const deleteWebhook = async (userId, url) => {
    return await webhookRepository.deleteWebhook(userId, url);
};

module.exports = { registerWebhook, findWebhooks, deleteWebhook };