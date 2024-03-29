import React from 'react'
import {HamburgerIcon} from '@chakra-ui/icons'
import { IconButton, Flex, Text } from '@chakra-ui/react';
import HeaderRight from './HeaderRight';


const Header = ({onOpen}) => {
  return (
    <Flex
    ml={{ base: 0, md: 60 }}
    px="4"
    position="sticky"
    top="0"
    height="20"
    zIndex="1"
    alignItems="center"
    bg="white"
    borderBottomWidth="1px"
    borderBottomColor="gray.200"
    justifyContent={{ base: "space-between", md: "flex-end" }}
  >
    <IconButton
      display={{ base: "flex", md: "none" }}
      onClick={onOpen}
      variant="outline"
      aria-label="open menu"
      icon={<HamburgerIcon />}
    />
    <Text
      display={{ base: "flex", md: "none" }}
      fontSize="2xl"
      fontFamily="monospace"
      fontWeight="bold"
    >
      Deals Library
    </Text>
    <HeaderRight />
  </Flex>
  )
}

export default Header