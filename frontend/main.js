const backendUrl = "http://localhost:3000";

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${backendUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  alert(data.message);
});

// Registro
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  const res = await fetch(`${backendUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: newUsername, password: newPassword }),
  });

  const data = await res.json();
  alert(data.message);
});
