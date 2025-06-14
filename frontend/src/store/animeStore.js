import { create } from "zustand";
import axios from "axios";

const useAnimeStore = create((set) => ({
  animeList: [],
  loading: false,
  fetchAnime: async () => {
    {
      /*Fetches all the data and displays it */
    }
    set({ loading: true });
    try {
      const response = await axios.get("/api/anime");
      set({ animeList: response.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch anime:", err);
      set({ loading: false });
    }
  },
  addAnime: async (newAnime) => {
    {
      /*Creates a data  */
    }
    try {
      const response = await axios.post("/api/anime", newAnime);
      set((state) => ({
        animeList: [...state.animeList, response.data],
      }));
    } catch (err) {
      console.error("Failed to add anime:", err);
    }
  },
  removeAnime: async (id) => {
    {
      /*Deletes a data  */
    }
    try {
      await axios.delete(`/api/anime/${id}`);
      set((state) => ({
        animeList: state.animeList.filter((anime) => anime._id !== id),
      }));
    } catch (err) {
      console.error("Failed to remove anime:", err);
    }
  },
  updateAnime: async (id, updatedData) => {
    {
      /* Update (Edits) a data */
    }
    try {
      const response = await axios.put(`/api/anime/${id}`, updatedData);
      set((state) => ({
        animeList: state.animeList.map((anime) =>
          anime._id === id ? response.data : anime
        ),
      }));
    } catch (err) {
      console.error("Failed to update anime:", err);
    }
  },
}));
export default useAnimeStore;
