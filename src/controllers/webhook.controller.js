const webhookService = require("../services/webhook.service");

const register = async (req, res) => {
  try {
    const { url } = req.body;
    const userId = req.user.id;

    const webhook = await webhookService.registerWebhook(userId, url);

    return res.status(201).json(webhook);
  } catch (err) {
    console.error(err);

    return res.status(404).json({
      message: err.message || "Something went wrong",
    });
  }
};

const getWebhooks = async (req, res) => {
  try {
    const userId = req.user.id;

    const webhooks = await webhookService.findWebhooks(userId);

    return res.status(200).json(webhooks);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message || "Something went wrong",
    });
  }
};

const deleteWebhook = async (req, res) => {
  try {
    const { url } = req.body;
    const userId = req.user.id;

    const webhook = await webhookService.deleteWebhook(userId, url);

    return res.status(200).json(webhook);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message || "Something went wrong",
    });
  }
};

module.exports = {
  register,
  getWebhooks,
  deleteWebhook,
};
