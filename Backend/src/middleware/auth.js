import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Not authorized, user not found",
      });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

export default protect;
