import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepo = () => AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || "change_this";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) return res.status(400).json({ message: "Faltan datos" });

    const existing = await userRepo().findOneBy({ email });
    if (existing) return res.status(400).json({ message: "Email ya registrado" });

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepo().create({ email, name, password: hashed });
    await userRepo().save(user);

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor", err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepo().findOneBy({ email });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor", err });
  }
};

export const me = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  if (!userId) return res.status(401).json({ message: "No autorizado" });
  const user = await userRepo().findOneBy({ id: userId });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  return res.json({ id: user.id, email: user.email, name: user.name });
};
