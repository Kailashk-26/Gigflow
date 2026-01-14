import express from "express";
import protect from "../middleware/auth.js";
import {
  placeBid,
  getMyBids,
  getBidsForMyGig,
  hireBidder,
} from "../controllers/bidController.js";

const bidRouter = express.Router();

bidRouter.post("/:gigId/place", protect, placeBid);
bidRouter.get("/my-gigs", protect, getMyBids);
bidRouter.get("/gig/:gigId", protect, getBidsForMyGig);
bidRouter.post("/hire/:bidId", protect, hireBidder);

export default bidRouter;
