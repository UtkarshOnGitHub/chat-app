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
  } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const setUser = async(data)=>{
    console.log(data)
    return await axios.post("https://chatappbackend-production-835b.up.railway.app/user/signup", data)
}
  
export default function Signup() {
    const [name , setName] = useState("")
    const [email ,setEmail] = useState("")
    const [password , setPassword] = useState("")
    const navigate = useNavigate()
    const toast = useToast()
    const initialForm ={
        username:name,
        email:email,
        password:password
    }

    const handleSignup = ()=>{
        setUser(initialForm).then((res)=>{
            if(res.data=="User Created Successfully"){
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                navigate("/login")
            }else{
                toast({
                    title: 'Something Went Wrong ',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }
        })
    }

    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://newevolutiondesigns.com/images/freebies/cool-4k-wallpaper-1.jpg'
            }
          />
        </Flex>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Create Your Account</Heading>
            <FormControl id="username">
              <FormLabel>UserName</FormLabel>
              <Input type="text" onChange={(e)=>setName(e.target.value)}/>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e)=>setPassword(e.target.value)}/>
            </FormControl>
            <Stack spacing={6}>
              <Button backgroundColor={'#64B5F6'} variant={'solid'} onClick={handleSignup}>
                Sign Up
              </Button>
              <Link href="/login" color={'#64B5F6'}>Already Have a Account</Link>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    );
  }

