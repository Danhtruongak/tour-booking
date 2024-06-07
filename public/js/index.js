// public/js/index.js

import { login, logout, searchTours } from "./login";

document.addEventListener("DOMContentLoaded", () => {
  const showFiltersBtn = document.querySelector(".show-filters-btn");
  const filtersForm = document.querySelector("#filters-form"); //selector work because css result
  const loginForm = document.querySelector(".form--login");
  const logOutBtn = document.querySelector(".nav__el--logout");

  if (logOutBtn) logOutBtn.addEventListener("click", logout); //why nothing in here
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      login(email, password);
      return false;
    });
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
  }
  //////////////////////////////////
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      searchTours();
    });
  }
});
