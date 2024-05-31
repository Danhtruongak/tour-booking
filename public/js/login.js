const login = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/users/login",
      data: {
        email,
        password,
      },
    });
    if (result.data.status === "success") {
      alert("Login successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  login(email, password);
});
