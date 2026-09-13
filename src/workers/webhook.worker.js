const { Worker } = require("bullmq");
const redis = require("../config/redis");

const worker = new Worker(
  "webhook-delivery",
  async (job) => {
    const { url, event_name, data } = job.data;

    console.log(`Processing job ${job.id}`);

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        event_name,
        data,
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }

    console.log(`Job ${job.id} completed`);
  },
  {
    connection: redis,
  },
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.log(`❌ Job ${job?.id} failed: ${error.message}`);
});
