const app = require("./app");

app.get("/api/tours", (req, res) => {
  res.send("tours");
});
const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
