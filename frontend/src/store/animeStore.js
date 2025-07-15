import { create } from "zustand";
import axios from "axios";

const useAnimeStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null, // initialize from localStorage
  animeList: [],
  loading: false,
  fetchAnime: async () => {
    {
      /*Fetches all the data and displays it */
    }
    set({ loading: true });
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      const response = await axios.get("/api/anime", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      const response = await axios.post("/api/anime", newAnime, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        animeList: [...state.animeList, response.data],
      }));

      return { success: true }; //✅ Add return value
    } catch (err) {
      console.error("Failed to add anime:", err);
      return { success: false, error: err }; // ❌ Return error for toast logic
    }
  },
  removeAnime: async (id) => {
    {
      /*Deletes a data  */
    }
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.delete(`/api/anime/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      const response = await axios.put(`/api/anime/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        animeList: state.animeList.map((anime) =>
          anime._id === id ? response.data : anime
        ),
      }));
    } catch (err) {
      console.error("Failed to update anime:", err);
    }
  },
  /*When you log the user in */

  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },

  /*When you log the user out*/
  logout: () => {
    localStorage.removeItem("user"); // Clear token & user info
    set({
      animeList: [],
      user: null, // optional, depending on whether you track user in Zustand
    });
  },
}));
export default useAnimeStore;
