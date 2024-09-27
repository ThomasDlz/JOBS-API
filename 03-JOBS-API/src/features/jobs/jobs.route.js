import express from "express";
import { create, getAll, get, update, remove } from "./jobs.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, create).get(authMiddleware, getAll);

router
  .route("/:id")
  .get(authMiddleware, get)
  .delete(authMiddleware, remove)
  .put(authMiddleware, update);

export default router;
