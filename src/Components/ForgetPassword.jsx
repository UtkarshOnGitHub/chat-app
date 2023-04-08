import React, { useState } from 'react'
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
  useStatStyles,
} from "@chakra-ui/react";
import axios from 'axios';


const sendOTP = async (data) => {
  return await axios.post("http://localhost:8080/user/forgetPassword", {
    email: data,
  });
};


const ForgetPassword = () => {

  const [email ,setEmail] = useState("")


  return (
    <>
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
            <Heading fontSize={"2xl"}>Reset Your Password</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"  />
            </FormControl>
            <Stack spacing={6}>
                <Button
                  backgroundColor={"#64B5F6"}
                  variant={"solid"}
                >
                  Send OTP
                </Button>
            </Stack>
          </Stack>
      </Flex>
    </Stack>
    </>
  )
}

export default ForgetPassword
