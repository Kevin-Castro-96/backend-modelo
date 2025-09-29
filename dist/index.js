"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./config/data-source");
const authController_1 = require("./controllers/authController");
const auth_1 = require("./middleware/auth");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/auth/register", authController_1.register);
app.post("/auth/login", authController_1.login);
app.get("/me", auth_1.authMiddleware, authController_1.me);
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
})
    .catch((err) => console.error("Error inicializando DataSource", err));
