// public/js/login.js

const login = async (email, password) => {
  console.log(email, password);
  try {
    console.log("Logging in...");
    console.log("Email:", email, password);
    const result = await axios({
      method: "POST",
      url: "http://localhost:8000/users/login",
      data: {
        email,
        password,
      },
    });
    if (result.data.status === "success") {
      alert("Logged in successfully");
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
    console.log(result);
  } catch (err) {
    alert(err.response.data.message);
    console.log(err.response.data);
  }
};

const logout = async () => {
  try {
    const result = await axios({
      method: "GET",
      url: "http://localhost:8000/users/logout",
    });

    if (result.data.status === "success") {
      alert("You are logged out");
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
const searchTours = async () => {
  const searchQuery = searchInput.value;
  console.log("Search query:", searchQuery);

  try {
    const response = await fetch(
      `/tours/search?query=${encodeURIComponent(searchQuery)}`
    );
    const data = await response.json();

    if (response.ok) {
      // Handle the search response data
      console.log("Search response:", data);
      // Update the UI with the search results
    } else {
      console.error("Search request failed:", data);
      // Handle the error case
    }
  } catch (error) {
    console.error("Error during search:", error);
    // Handle any network or other errors
  }
};
export { login, logout, searchTours };
