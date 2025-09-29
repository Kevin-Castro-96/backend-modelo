"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "change_this";
const authMiddleware = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth)
        return res.status(401).json({ message: "No autorizado" });
    const parts = auth.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
        return res.status(401).json({ message: "Formato inválido" });
    try {
        const payload = jsonwebtoken_1.default.verify(parts[1], JWT_SECRET);
        req.userId = payload.id;
        next();
    }
    catch {
        return res.status(401).json({ message: "Token inválido" });
    }
};
exports.authMiddleware = authMiddleware;
