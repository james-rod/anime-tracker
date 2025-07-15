import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddAnimePage from "./pages/AddAnimePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

import { useEffect } from "react";
import useAnimeStore from "./store/animeStore";
import checkTokenExpiration from "./utils/checkTokenExpiration";

function App() {
  const user = useAnimeStore((state) => state.user);
  const fetchAnime = useAnimeStore((state) => state.fetchAnime);

  // 🔐 Check token validity on app load
  useEffect(() => {
    checkTokenExpiration();
  }, []);

  // Fetch user's anime list if logged in
  useEffect(() => {
    if (user) {
      fetchAnime();
    }
  }, [user]);

  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddAnimePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Box>
  );
}

export default App;
