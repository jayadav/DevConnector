const express = require("express");
const connectDB = require("./config/db");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const corsOptions = {
  origin: process.env.FRONTENDORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  exposedHeaders: ["x-auth-token", "Content-Type", "Authorization"],
};


const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, API is running!!!");
});

// DEfine routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
