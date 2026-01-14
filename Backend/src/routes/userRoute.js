import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  auth,
} from "../controllers/userController.js";
import protect from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/auth", protect, auth);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", protect, logoutUser);

export default userRouter;
