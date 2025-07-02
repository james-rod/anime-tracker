import React, { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
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
  const addAnime = useAnimeStore((state) => state.addAnime);

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

    try {
      await addAnime(newAnime);
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
    } catch (error) {
      console.error("Failed to add anime:", error);
      toast({
        title: "Failed to add anime.",
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
