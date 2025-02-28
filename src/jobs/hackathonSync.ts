import Bull from "bull";
import { DevfolioService } from "../services/devfolio.service";

const syncQueue = new Bull("hackathon-sync", process.env.REDIS_URL);
const devfolioService = new DevfolioService();

// Process jobs
syncQueue.process(async (job) => {
  try {
    await devfolioService.fetchHackathons();
    return { success: true };
  } catch (error) {
    console.error("Sync job failed:", error);
    throw error;
  }
});

// Add recurring job (every 15 minutes)
syncQueue.add(
  {},
  {
    repeat: {
      cron: "*/15 * * * *", // Every 15 minutes
    },
  }
);

// Handle failed jobs
syncQueue.on("failed", (job, error) => {
  console.error("Job failed:", error);
});

export default syncQueue;
