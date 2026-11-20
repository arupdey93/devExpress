require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
};

module.exports = connectDB;
