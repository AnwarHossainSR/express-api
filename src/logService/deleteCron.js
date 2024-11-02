import cron from "node-cron";
import { deleteLogs } from "../repositories/logRepository.js";

export const deleteCronJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      await deleteLogs();
      console.log("successfully deleted the logs");
    } catch (error) {
      console.log("error in deleting the logs from cron job", error);
    }
  });
};
