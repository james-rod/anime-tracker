import React, { useEffect } from "react";
import { Container, VStack, Text, Spinner, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAnimeStore from "../store/animeStore";
import AnimeCard from "../components/AnimeCard";

function HomePage() {
  const { animeList, fetchAnime, loading, removeAnime } = useAnimeStore();

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Anime List
        </Text>

        {loading ? (
          <Spinner size="xl" color="blue.500" />
        ) : animeList.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w={"full"}
          >
            {animeList.map((anime) => (
              <AnimeCard key={anime._id} anime={anime} onDelete={removeAnime} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No Anime List.{" "}
            <Link to={"/add"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Add New Anime
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
