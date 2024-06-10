// public/js/index.js

import { login, logout } from "./login";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".form--login");
  const logOutBtn = document.querySelector(".nav__el--logout");

  if (logOutBtn)
    logOutBtn.addEventListener("click", () => {
      logout();
    });

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      login(email, password);
    });
  }
});
