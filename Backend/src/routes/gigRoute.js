import express from "express";
import protect from "../middleware/auth.js";
import {
  createGig,
  getAllOpenGigs,
  getMyGigs,
  getGigById,
} from "../controllers/gigController.js";

const gigRouter = express.Router();

gigRouter.post("/create", protect, createGig);
gigRouter.get("/all", getAllOpenGigs);
gigRouter.get("/my-gigs", protect, getMyGigs);
gigRouter.get("/:gigId", getGigById);

export default gigRouter;
