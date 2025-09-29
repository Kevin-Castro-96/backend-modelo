"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepo = () => data_source_1.AppDataSource.getRepository(User_1.User);
const JWT_SECRET = process.env.JWT_SECRET || "change_this";
const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password)
            return res.status(400).json({ message: "Faltan datos" });
        const existing = await userRepo().findOneBy({ email });
        if (existing)
            return res.status(400).json({ message: "Email ya registrado" });
        const hashed = await bcrypt_1.default.hash(password, 10);
        const user = userRepo().create({ email, name, password: hashed });
        await userRepo().save(user);
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
    }
    catch (err) {
        return res.status(500).json({ message: "Error del servidor" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRepo().findOneBy({ email });
        if (!user)
            return res.status(401).json({ message: "Credenciales inválidas" });
        const ok = await bcrypt_1.default.compare(password, user.password);
        if (!ok)
            return res.status(401).json({ message: "Credenciales inválidas" });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    }
    catch (err) {
        return res.status(500).json({ message: "Error del servidor" });
    }
};
exports.login = login;
const me = async (req, res) => {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: "No autorizado" });
    const user = await userRepo().findOneBy({ id: userId });
    if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json({ id: user.id, email: user.email, name: user.name });
};
exports.me = me;
