import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAnimeStore from "../store/animeStore";
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAnimeStore((state) => state.setUser);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/register", formData);
      const userData = response.data;

      setUser(userData); // ✅ Correct usage

      toast({
        title: "Account Created",
        description: "You are now logged in",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/"); // redirect to the homepage
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW={"md"}
      mx={"auto"}
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius={"lg"}
      boxShadow={"lg"}
    >
      <Heading mb={6} textAlign={"center"}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width={"full"}
            isLoading={isLoading}
          >
            Register
          </Button>
          <Text fontSize={"sm"}>
            Already have an account?{" "}
            <Text
              as={"span"}
              color={"blue.500"}
              cursor={"pointer"}
              onClick={() => navigate("/login")}
            >
              Login
            </Text>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}
export default RegisterPage;
