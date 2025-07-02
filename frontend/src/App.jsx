import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddAnimePage from "./pages/AddAnimePage";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddAnimePage />} />
      </Routes>
    </Box>
  );
}

export default App;
