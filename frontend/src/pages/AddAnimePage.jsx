import React, { useState, useEffect } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAnimeStore from "../store/animeStore";
import AnimeForm from "../components/AnimeForm";

function AddAnimePage() {
  const [title, setTitle] = useState("");
  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [status, setStatus] = useState("Plan to Watch");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const addAnime = useAnimeStore((state) => state.addAnime);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please log in to add anime.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnime = {
      title,
      episodesWatched,
      totalEpisodes,
      status,
      rating,
      notes,
    };

    const result = await addAnime(newAnime);

    if (result.success) {
      toast({
        title: "Anime added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Reset form
      setTitle("");
      setEpisodesWatched(0);
      setTotalEpisodes(0);
      setStatus("Plan to Watch");
      setRating(0);
      setNotes("");

      navigate("/");
    } else {
      toast({
        title: "Failed to add anime.",
        description: "You must be logged in to add anime.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" textAlign="center" mb={8}>
          Add New Anime
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <AnimeForm
            title={title}
            setTitle={setTitle}
            episodesWatched={episodesWatched}
            setEpisodesWatched={setEpisodesWatched}
            totalEpisodes={totalEpisodes}
            setTotalEpisodes={setTotalEpisodes}
            status={status}
            setStatus={setStatus}
            rating={rating}
            setRating={setRating}
            notes={notes}
            setNotes={setNotes}
            handleSubmit={handleSubmit}
          />
        </Box>
      </VStack>
    </Container>
  );
}

export default AddAnimePage;
