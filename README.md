# Backend Modelo

API REST construida con **Node.js**, **Express**, **TypeORM** y **PostgreSQL**, documentada con **Swagger**.  
El objetivo de este proyecto es servir como base para autenticar usuarios y manejar endpoints protegidos con JWT.

---

## 🚀 Tecnologías

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/) (documentación de la API)
- [Helmet](https://helmetjs.github.io/) (seguridad HTTP)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## 📂 Estructura del proyecto

```
src/
├── config/
│   ├── data-source.ts   # Configuración de TypeORM
│   └── swagger.ts       # Configuración de Swagger
├── controllers/
│   └── authController.ts
├── middleware/
│   └── auth.ts          # Middleware para validar JWT
├── routes/
│   └── auth.ts          # Rutas de autenticación
└── index.ts             # Punto de entrada de la app
```

---

## ⚙️ Configuración

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Kevin-Castro-96/backend-modelo.git
   cd backend-modelo
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear archivo `.env` en la raíz con tus variables de entorno:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=tu_password
   DB_NAME=backend_modelo
   JWT_SECRET=supersecreto
   ```

4. Ejecutar migraciones (si aplica):

   ```bash
   npm run typeorm migration:run
   ```

---

## ▶️ Scripts disponibles

- **Desarrollo:**

  ```bash
  npm run dev
  ```

- **Producción (compilado a JS):**

  ```bash
  npm run build
  npm start
  ```

---

## 📖 Endpoints principales

### 🔹 Registrar usuario
**POST** `/auth/register`

**Request:**
```json
{
  "email": "usuario@test.com",
  "password": "123456",
  "name":"tu-nombre"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "email": "usuario@test.com"
  }
}
```

---

### 🔹 Iniciar sesión
**POST** `/auth/login`

**Request:**
```json
{
  "email": "usuario@test.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

**Response (401 - credenciales inválidas):**
```json
{
  "message": "Credenciales inválidas"
}
```

---

### 🔹 Obtener usuario autenticado
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response (200):**
```json
{
  "id": 1,
  "email": "usuario@test.com"
}
```

**Response (401 - no autenticado):**
```json
{
  "message": "No autorizado"
}
```

---

## 📑 Documentación Swagger

Una vez corriendo el servidor:

- Local: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)  
- Producción (Render): `https://backend-modelo.onrender.com/api-docs`

---

## 🛠 Deploy en Render

Este proyecto está desplegado en [Render](https://render.com/).  
Cada push a la rama `main` en GitHub dispara un nuevo build automáticamente.

---

## 📜 Licencia

Este proyecto se publica bajo la licencia MIT.
