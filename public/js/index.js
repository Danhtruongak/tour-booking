// public/js/index.js

import { login, logout, searchTours } from "./login";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const searchForm = document.getElementById("search-form");
  const loginForm = document.querySelector(".form--login");
  const userDataForm = document.querySelector(".form-user-data");
  const logOutBtn = document.querySelector(".nav__el--logout");

  if (logOutBtn)
    logOutBtn.addEventListener("click", () => {
      logout, console.log("locked out is here");
    });
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      login(email, password);
      return false;
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
      return false;
    });
  } else {
    console.log("User data form not found");
  }
  //////////////////////////////////
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      searchTours();
    });
  } else {
    console.log("Search form not found");
  }
});
