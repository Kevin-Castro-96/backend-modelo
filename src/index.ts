import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import { register, login, me } from "./controllers/authController";
import { authMiddleware } from "./middleware/auth";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/me", authMiddleware, me);
app.use("/", (req, res) => {
  res.send("🚀 Bienvenido a mi backend, la API está corriendo correctamente!");
})

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error inicializando DataSource", err));
