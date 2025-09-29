import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers["authorization"];
  if (!auth) return res.status(401).json({ message: "No autorizado" });
  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ message: "Formato inválido" });
  try {
    const payload: any = jwt.verify(parts[1], JWT_SECRET);
    (req as any).userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};
