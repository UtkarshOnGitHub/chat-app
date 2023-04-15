import { Box, Button, Text, Textarea, useStatStyles } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import SingleMessage from "../SingleMessage/SingleMessage";
import axios from "axios";
import style from "./Message.module.css";
import Allchats from "../AllChats/Allchats";
import LoadingScreen from "react-loading-screen";

const Message = ({ chat = [], currUser, handleSocketSend, loading }) => {
  const [message, setMessage] = useState("");
  const [state, setState] = useState(false);
  const scrollref = useRef();

  const initalState = {
    conversationId: chat[0]?.conversationId,
    senderId: currUser,
    text: message,
  };
  const handleSendMessage = async () => {
    handleSocketSend(initalState);
    try {
      setMessage("");
      await axios.post(
        "https://chatappbackend-production-2ce5.up.railway.app/message",
        initalState
      );
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chat]);

  console.log(chat)
  if(loading){
    return(
      <>
      <Box h="100vh" display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <LoadingScreen
          loading={true}
          bgColor="rgba(255,255,255,0.8)"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          logoSrc=""
          text=""
        >
          {" "}
        </LoadingScreen>
        </Box> 
      </>
    )
  }

  return (
    <>
      <Box marginTop={["0", "50px"]} height={"77vh"} position={"relative"}>
        <Box
          h={"88%"}
          w="100%"
          overflow={"scroll"}
          padding={"5px 10px"}
          className={style.messageScroll}
          backgroundImage={
            "https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png"
          }
        >
          <Box textAlign={"center"}>
            <Text color={"grey"} fontSize={"17px"}>
              This Chat Is End To End Encrypted
            </Text>
          </Box>
          {chat?.map((e) => {
            return (
              <Box ref={scrollref}>
                <SingleMessage
                  key={e._id}
                  text={e.text}
                  createdAt={e.createdAt}
                  own={e.senderId === currUser ? true : false}
                />
              </Box>
            );
          })}
        </Box>

        <Box
          position={"absolute"}
          w="100%"
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Textarea
            bg={"white"}
            w="100%"
            borderRadius={0}
            placeholder="Type Your Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></Textarea>
          <Button
            variant={"outline"}
            borderRadius={0}
            bg="green.600"
            color={"white"}
            _hover={{ bg: "green.900" }}
            w="100px"
            h="81px"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Message;
