// public/js/login.js

const login = async (email, password) => {
  try {
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
  } catch (err) {
    alert(err.response.data.message);
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

export { login, logout };
