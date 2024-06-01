// login.js

// Store the token in the browser's local storage
const storeToken = (token) => {
  localStorage.setItem("jwt", token);
};

// Retrieve the token from the local storage
const getToken = () => {
  return localStorage.getItem("jwt");
};

const logout = async () => {
  console.log("logout function called");
  try {
    const res = await fetch("/users/logout", {
      method: "GET",
    });

    const result = await res.json();

    console.log("Logout response:", result);

    if (result.status === "success") {
      localStorage.removeItem("jwt"); // Remove the token from local storage
      location.reload(true);
      alert(result.message); // Display the success message
    } else {
      alert("Logout failed. Please try again."); // Display an error message
    }
  } catch (err) {
    console.error("Error logging out:", err);
    alert("An error occurred while logging out. Please try again.");
  }
};

const redirectToLogin = () => {
  window.location.href = "/";
};

const logOutBtn = document.querySelector(".nav__el--logout");

if (logOutBtn) {
  logOutBtn.addEventListener("click", logout);
}

const login = async (email, password) => {
  try {
    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.status === "success") {
      storeToken(result.token); // Store the token in local storage
      alert("Login successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    } else {
      alert(result.message);
    }
  } catch (err) {
    alert(err.message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  login(email, password);
});
