const { Queue } = require("bullmq");
const redis = require("../config/redis");

const webhookQueue = new Queue("webhook-delivery", {
  connection: redis,

  defaultJobOptions: {
    attempts: 5,

    backoff: {
      type: "exponential",
      delay: 5000,
    },

    removeOnComplete: true,
    removeOnFail: false,
  },
});

module.exports = webhookQueue;
