import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dns from "dns";

import router from "./routes/index.js";
import notificationRoutes from "./routes/notification.js";
import Task from "./models/task.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));

dns.setServers(["8.8.8.8", "1.1.1.1"]);

// DB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`DB Connected successfuly`);
  })
  .catch((err) => console.log(`Failed to connect to DB:`, err));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Remove archived tasks older than 30 days
const cleanupArchivedTasks = async () => {
  try {
    const thirtyDaysAgo = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    );

    const result = await Task.deleteMany({
      isArchived: true,
      archivedAt: {
        $ne: null,
        $lte: thirtyDaysAgo,
      },
    });

    if (result.deletedCount > 0) {
      console.log(
        `Deleted ${result.deletedCount} archived task(s) older than 30 days`
      );
    }
  } catch (error) {
    console.log("Failed to cleanup archived tasks:", error);
  }
};

// Run cleanup once when the server starts
mongoose.connection.once("open", async () => {
  await cleanupArchivedTasks();
});

// Run cleanup every 24 hours
setInterval(cleanupArchivedTasks, 24 * 60 * 60 * 1000);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to FlowDesk Api",
  });
});

// http://localhost:5000/api-v1/
app.use("/api-v1", router);

app.use("/api-v1/notifications", notificationRoutes);

// Error middleware
app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(500).json({
    message: "Internal server error",
  });
});

// Not found
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});