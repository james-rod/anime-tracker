import { Navigate } from "react-router-dom";
import useAnimeStore from "../store/animeStore";
import checkTokenExpiration from "../utils/checkTokenExpiration";

function PrivateRoute({ children }) {
  checkTokenExpiration(); // 🔐 Runs every time a protected route is accessed ex: /add
  const user = useAnimeStore((state) => state.user);

  return user ? children : <Navigate to="/login" />; // If the user exist, then it renders the protected component.
}

export default PrivateRoute;
