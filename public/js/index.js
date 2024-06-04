// public/js/index.js

import { login, logout } from "./login";

const loginForm = document.querySelector(".form--login ");
const userDataForm = document.querySelector(".form-user-data");
const logOutBtn = document.querySelector(".nav__el--logout");

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
} else {
  console.log("Login form not found");
}

if (userDataForm) {
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    console.log("User data form submitted");
    console.log("Name:", name);
    console.log("Email:", email);
    // Add your logic for updating user data here
  });
} else {
  console.log("User data form not found");
}
