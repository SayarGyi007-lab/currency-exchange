import { Job, Worker } from "bullmq";
import { bulRedis } from "../config/message-redis";
import { Resend } from "resend";
import { transactionEmailTemplate } from "../template/email-template";
import { statusConfig, TxStatus } from "../template/email-status";
import { config } from "../config/config";

const resend = new Resend(config.RESEND_KEY);

interface EmailJobData {
  to: string;
  transactionId: string;
  status: TxStatus
}

export const emailWorker = new Worker(
  "email-queue",
  async (job: Job<EmailJobData>) => {
    const { to, transactionId, status } = job.data;

    const statusUrl = `http://localhost:5173/status/${transactionId}`;

    if (!job.data.transactionId || !job.data.status) {
  console.log("Skipping invalid job:", job.data);
  return;
}

    const html = transactionEmailTemplate({
      transactionId,
      statusUrl,
      status,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: statusConfig[status].title,
      html,
    });

    console.log(`Email sent to ${to}`);
  },
  {
    connection: bulRedis,
  }
);

emailWorker.on("ready", () => {
  console.log("Email worker is ready and waiting for jobs...");
});

emailWorker.on("completed", (job) => {
  console.log("Job completed:", job.id);
});

emailWorker.on("failed", (job, err) => {
  console.error("Job failed:", err.message);
});

emailWorker.on("error", (err) => {
  console.error("Worker error:", err);
});

emailWorker.on("active", (job) => {
  console.log("Job data:", job.data);
});