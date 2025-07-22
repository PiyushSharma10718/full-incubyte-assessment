const app = require("./app");

const connectDB = require("./db");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend Running Successfully, Welcome to the Sweet Shop API");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
