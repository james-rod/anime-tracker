import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  HStack,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import AnimeForm from "./AnimeForm";
import useAnimeStore from "../store/animeStore";

function AnimeCard({ anime, onDelete }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.700");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateAnime = useAnimeStore((state) => state.updateAnime);

  const [title, setTitle] = useState(anime.title);
  const [episodesWatched, setEpisodesWatched] = useState(anime.episodesWatched);
  const [totalEpisodes, setTotalEpisodes] = useState(anime.totalEpisodes);
  const [status, setStatus] = useState(anime.status);
  const [rating, setRating] = useState(anime.rating);
  const [notes, setNotes] = useState(anime.notes || "");

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      title,
      episodesWatched,
      totalEpisodes,
      status,
      rating,
      notes,
    };
    await updateAnime(anime._id, updatedData);
    onClose();
  };

  return (
    <Box
      p={5}
      shadow="1g"
      rounded={"1g"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      borderRadius="md"
      _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
      bg={bg}
    >
      <Heading fontSize="xl">{anime.title}</Heading>
      <Text mt={2}>
        Episodes: {anime.episodesWatched}/{anime.totalEpisodes}
      </Text>
      <Badge mt={2} colorScheme="purple">
        {anime.status}
      </Badge>
      <Text mt={2}>Rating: {anime.rating}/10</Text>
      {anime.notes && (
        <Text mt={2} fontStyle="italic" color={textColor}>
          Notes: {anime.notes}
        </Text>
      )}

      <HStack spacing={2} mt={2}>
        <IconButton
          icon={<EditIcon />}
          colorScheme="blue"
          variant="outline"
          onClick={onOpen}
          aria-label="Edit Anime"
        />
        <IconButton
          icon={<DeleteIcon />}
          colorScheme="red"
          onClick={() => onDelete(anime._id)}
        />
      </HStack>

      {/* 🟡 Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Anime</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
              handleSubmit={handleEditSubmit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AnimeCard;
