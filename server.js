const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Server started sucessfully");
});

//Define Routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(PORT, () => {
  console.log(`Node server is running on ${PORT}`);
});
