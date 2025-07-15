import express from "express"; // Go to the package.json
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import animeRoutes from "./routes/animeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Log NODE_ENV and the static folder path
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Static files path:", path.join(__dirname, "/frontend/dist"));

app.use(cors()); // Allow all origins (for development)

app.use(express.json()); // Allows us to accept JSON data in the req.body

app.use("/api/anime", animeRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/*splat", (req, res) => {
    console.log("Serving index.html for route:", req.originalUrl);
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
