import React from 'react'
import { Outlet } from "react-router-dom";
import { Container, Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Root = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();

return (
  <Box minH="100vh" bg="gray.100" size="100%">
      <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  )
}

export default Root