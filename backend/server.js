require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const path=require('path')
const incomeRoutes=require("./routes/incomeRoutes")
const expenseRoutes=require("./routes/expenseRoutes")
const dashboardRoutes=require("./routes/dashboardRoutes")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDb();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income",incomeRoutes)
app.use("/api/v1/expense",expenseRoutes)
app.use("/api/v1/dashboard",dashboardRoutes)

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
