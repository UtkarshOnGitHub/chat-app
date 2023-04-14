import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Chat from "../../Routes/Chat";
import Login from "../../Routes/Login"

const TabsSection = () => {
  return (
    <>
      <Tabs isFitted variant="enclosed" h="700pxvh">
        <TabList p="0">
          <Tab>SignUp</Tab>
          <Tab>Login</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0">
            Under Progress.
          </TabPanel>
          <TabPanel p="0">
            <Login/> 
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default TabsSection;
