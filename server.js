import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import dns from "dns";
import itemRoutes from "./routes/itemRoutes.js";

// Set Google DNS servers for better resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

console.log("Environment variables loaded:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Item Manager API is running..." });
});

app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    console.error("Full error:", error);
    console.error("\nTroubleshooting steps:");
    console.error("1. Check your internet connection");
    console.error("2. Disable VPN/proxy if active");
    console.error("3. Check Windows Firewall/Antivirus");
    console.error("4. Try pinging 8.8.8.8 to test DNS");
    process.exit(1);
  });