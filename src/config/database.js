require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
require("node:process").loadEnvFile();
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;
