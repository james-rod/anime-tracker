import mongoose from "mongoose";

const animeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //references the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    episodesWatched: {
      type: Number,
      default: 0,
    },
    totalEpisodes: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"],
      default: "Plan to Watch",
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Anime = mongoose.model("Anime", animeSchema);
export default Anime;
