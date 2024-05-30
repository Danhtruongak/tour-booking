const login = async (email, password) => {
  try {
    console.log("Login request received with email:", email);
    const result = await axios({
      method: "POST",
      url: "/users/login",
      data: {
        email,
        password,
      },
    });
    console.log(result);
  } catch (error) {
    console.log("Error:", error.response.data);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("Email:", email);
  console.log("Password:", password);
  login(email, password);
});
