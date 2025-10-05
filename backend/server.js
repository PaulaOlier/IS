const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.txt");

app.use(cors());
app.use(bodyParser.json());

// 🟢 Registrar usuario
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  // Leer archivo de usuarios (si existe)
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = fs.readFileSync(USERS_FILE, "utf8")
      .split("\n")
      .filter(Boolean)
      .map(line => {
        const [user, pass] = line.split(",");
        return { username: user, password: pass };
      });
  }

  // Verificar si el usuario ya existe
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  // Guardar usuario nuevo
  fs.appendFileSync(USERS_FILE, `${username},${password}\n`);
  res.json({ message: "✅ Usuario registrado con éxito" });
});

// 🟢 Login de usuario
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  // Verificar que exista el archivo de usuarios
  if (!fs.existsSync(USERS_FILE)) {
    return res.status(400).json({ message: "No hay usuarios registrados" });
  }

  // Leer y convertir a objetos
  const users = fs.readFileSync(USERS_FILE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map(line => {
      const [user, pass] = line.split(",");
      return { username: user, password: pass };
    });

  // Verificar credenciales
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: "El usuario no existe" });
  }

  if (user.password !== password) {
    return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
  }

  res.json({ success: true, message: `🎉 Bienvenido ${username}` });

});

// 🟢 Ruta por defecto (para que no aparezca "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀. Usa /login o /register con POST.");
});

// 🟢 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
