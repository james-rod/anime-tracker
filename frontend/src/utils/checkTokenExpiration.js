import { jwtDecode } from "jwt-decode";
import useAnimeStore from "../store/animeStore";

const checkTokenExpiration = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = useAnimeStore.getState().logout;

  if (user?.token) {
    try {
      const decoded = jwtDecode(user.token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        logout(); // ⛔ Token expired
        console.warn("Token expired. User logged out.");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      logout(); // Fallback if decode fails
    }
  }
};

export default checkTokenExpiration;
