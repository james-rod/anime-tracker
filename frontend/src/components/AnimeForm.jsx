import React from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";

function AnimeForm({
  title,
  setTitle,
  episodesWatched,
  setEpisodesWatched,
  totalEpisodes,
  setTotalEpisodes,
  status,
  setStatus,
  rating,
  setRating,
  notes,
  setNotes,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Anime Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Episodes Watched</FormLabel>
          <NumberInput
            min={0}
            value={episodesWatched}
            onChange={(val) => setEpisodesWatched(Number(val))}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Total Episodes</FormLabel>
          <NumberInput
            min={0}
            value={totalEpisodes}
            onChange={(val) => setTotalEpisodes(Number(val))}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Watching</option>
            <option>Completed</option>
            <option>On Hold</option>
            <option>Dropped</option>
            <option>Plan to Watch</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Rating (0 - 10)</FormLabel>
          <NumberInput
            min={0}
            max={10}
            value={rating}
            onChange={(val) => setRating(Number(val))}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Notes</FormLabel>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          Add Anime
        </Button>
      </VStack>
    </form>
  );
}

export default AnimeForm;
