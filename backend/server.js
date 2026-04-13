const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const role = require("./middleware/role");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/authDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ Fix added
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Routes
app.use("/api", authRoutes);

// Protected Route
app.get("/admin", auth, role("admin"), (req, res) => {
  res.json({ msg: "Welcome Admin" });
});

app.listen(5000, () => console.log("Server running on port 5000"));