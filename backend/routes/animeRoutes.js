import express from "express";
import Anime from "../Models/anime.js";

const router = express.Router();

// GETS ALL ANIME DATA
router.get("/", async (req, res) => {
  try {
    const animeList = await Anime.find();
    res.json(animeList);
  } catch (error) {
    res.status(505).json({ message: error.message });
  }
});

// ADDS anime
router.post("/", async (req, res) => {
  const newAnime = new Anime(req.body);

  try {
    const savedAnime = await newAnime.save(); // saves to the database
    res.status(201).json(savedAnime);
    console.log("Request body:", req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE anime by ID
router.put("/:id", async (req, res) => {
  try {
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
router.delete("/:id", async (req, res) => {
  console.log("DELETE request received for ID:", req.params.id);
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);

    if (!anime) {
      return res.status(404).json({ message: "Anime Not Found" });
    }

    res.json({ message: "Anime Has Been Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
