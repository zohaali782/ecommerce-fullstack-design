const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const projectRoutes = require("./routes/projectRoutes");
const app = express();
const inquiryRoutes = require("./routes/inquiryRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/inquiries", inquiryRoutes);
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4,
  })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("Nexmart API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
