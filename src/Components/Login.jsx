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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../store/users/action";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleToken , setHandleToken] = useState(false)
  const toast = useToast();
  const dispatch = useDispatch()
  const initialForm = {
    email: email,
    password: password,
  };




  const token = useSelector((store)=>store.user)

  console.log(token)
  const redirect = useNavigate();

  useEffect(()=>{
    if (token?.data?.message ==="Token Generated") {
      sessionStorage.setItem("token", token?.data?.token);
      toast({
        title: "LogIn SuccessFull",
        description: "We Have succefully Logged You In.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      redirect("/chat")
    } else if(token?.data == "Sorry We Couldnt Find Any Regeistered Email") {
      toast({
        title: "Invalid Email",
        description: "We Didin't Find This Email in our Database.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }else if(token?.data == "Invalid Credentials"){
      toast({
        title: "Invalid Credentials",
        description: "Enter Valid Credentials!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  },[token])
  
  const handleLogin = () => {
    dispatch(LoginUser(initialForm));
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
