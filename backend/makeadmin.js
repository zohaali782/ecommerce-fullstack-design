// Run this once: node makeAdmin.js your-email@example.com
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const email = process.argv[2];
if (!email) {
  console.log("Usage: node makeAdmin.js your-email@example.com");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4,
  })
  .then(async () => {
    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true },
    );
    if (!user) {
      console.log(
        "No user found with that email. Register first, then run this.",
      );
    } else {
      console.log(`✅ ${user.email} is now an admin.`);
    }
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
    process.exit(1);
  });
