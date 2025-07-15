import express from "express";
import Anime from "../Models/anime.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GETS ALL ANIME DATA
router.get("/", protect, async (req, res) => {
  try {
    const animeList = await Anime.find({ user: req.user._id }); // Only their anime
    res.json(animeList);
  } catch (error) {
    res.status(505).json({ message: error.message });
  }
});

// ADDS anime
router.post("/", protect, async (req, res) => {
  try {
    const newAnime = new Anime({
      ...req.body,
      user: req.user._id, // Attach user ID from JWT
    });

    const savedAnime = await newAnime.save(); // saves to the database
    res.status(201).json(savedAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE anime by ID
router.put("/:id", protect, async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ message: "Anime not found" });

    // Check ownership
    if (anime.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedAnime = await Anime.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAnime) {
      return res.status(404).json({ message: "Anime not found" });
    }

    res.json(updatedAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE anime by ID
router.delete("/:id", protect, async (req, res) => {
  console.log("DELETE request received for ID:", req.params.id);
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ message: "Anime Not Found" });

    // Check ownership before deleting
    if (anime.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await anime.deleteOne();
    res.json({ message: "Anime Has Been Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
