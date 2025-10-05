import './style.css';

// Referencias al DOM
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("messageBox");

// Función para mostrar mensajes en pantalla
function showMessage(msg, success = false) {
  messageBox.textContent = msg;
  messageBox.style.color = success ? "green" : "red";
}

// 🟢 Evento de registro
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("regUser").value;
    const password = document.getElementById("regPass").value;

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      showMessage(data.message, data.success);
    } catch (err) {
      showMessage("⚠️ Error de conexión con el servidor");
    }
  });
}

// 🟢 Evento de login
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("logUser").value;
    const password = document.getElementById("logPass").value;

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      showMessage(data.message, data.success);
    } catch (err) {
      showMessage("⚠️ Error de conexión con el servidor");
    }
  });
}
