import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import catchAsync from "../utils/WrapAsync.js";

const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    }

    req.user = decoded;
    next();
  });
});

export default protect;
