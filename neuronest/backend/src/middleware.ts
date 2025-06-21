

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}



import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction):void => {
    const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({ message: "No token provided" });
    return 
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_PASSWORD);
    if (typeof decoded !== "string") {
      req.userId = (decoded as JwtPayload).id;
      next();
    } else {
      res.status(403).json({ message: "Invalid token" });
      return 
      
    }
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(403).json({ message: "Invalid or expired token" });
    return 
  }
}