// login.js
var token = "";
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    console.log("Logout response:", result);

    if (result.status === "success") {
      console.log("Token before removal:", localStorage.getItem("jwt"));
      localStorage.removeItem("jwt"); // Remove the token from local storage
      console.log("Token after removal:", localStorage.getItem("jwt"));
      window.location.href = "/";
      // Update the UI to reflect the logged-out state
      const userNavEl = document.querySelector(".nav__el--user");
      if (userNavEl) {
        userNavEl.innerHTML = `
          <a class="nav__el" href="/login">Log in</a>
          <a class="nav__el nav__el--cta" href="#">Sign up</a>
        `;
        console.log("updated UI", userNavEl.innerHTML);
      }

      alert(result.message); // Display the success message
    } else {
      alert("Logout failed. Please try again."); // Display an error message
    }
  } catch (err) {
    console.error("Error logging out:", err);
    alert("An error occurred while logging out. Please try again.");
  }
};
const logOutBtn = document.querySelector(".nav__el--logout");

if (logOutBtn) {
  logOutBtn.addEventListener("click", logout);
  console.log("Logout button clicked");
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
