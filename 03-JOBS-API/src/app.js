import "express-async-errors";
import express from "express";
const app = express();
import notFound from "./middlewares/not-found.middleware.js";
import errorHandler from "./middlewares/error-handler.js";
import connectDB from "./config/db.config.js";
import { auth } from "./features/auth/index.js";
import jobsRoutes from "./features/jobs/jobs.route.js";

connectDB();

app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/jobs", jobsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
