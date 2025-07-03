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
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await axios.post("/api/auth/register", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

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
      <form>
        <VStack>
          <FormControl isRequired>
            <FormLabel></FormLabel>
            <Input />
          </FormControl>
        </VStack>
      </form>
    </Box>
  );
}
