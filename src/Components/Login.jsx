import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useToast,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const setLogin = async (data) => {
  return await axios.post("http://localhost:8080/user/login", data);
};


let sessionToken = sessionStorage.getItem("token") || null;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();


  const initialForm = {
    email: email,
    password: password,
  };


  const handleLogin = () => {
    setLogin(initialForm).then((res) => {
      console.log(res);
      if (res.data.message == "Token Generated") {
        sessionStorage.setItem("token", res.data.token);
        toast({
          title: "LogIn SuccessFull",
          description: "We Have succefully Logged You In.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Invalid Credentials",
          description: "We Didin't Find these creds in our Database.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    });
  };




  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://newevolutiondesigns.com/images/freebies/cool-4k-wallpaper-1.jpg"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link
                  color={"#64B5F6"}
                  href="/forgetPassword"
                >
                  Forgot password?
                </Link>
              </Stack>
              <Button
                backgroundColor={"#64B5F6"}
                variant={"solid"}
                onClick={handleLogin}
              >
                Sign in
              </Button>
              <Link href="/signup" color={"#64B5F6"}>
                Not Have Any Account
              </Link>
            </Stack>
          </Stack>
      </Flex>
    </Stack>
  );
}
