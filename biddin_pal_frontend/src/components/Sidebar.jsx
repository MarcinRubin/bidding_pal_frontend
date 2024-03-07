import React from 'react'
import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import { MoonIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';

const LinkItems = [
    { label: "System licytacyjny", icon: MoonIcon, href: "/" },
    { label: "Prace domowe", icon: MoonIcon, href: "/homework" },
    { label: "Inne ciekawe rozdania", icon: MoonIcon, href: "/" },
    { label: "Quiz - cała licytacja", icon: MoonIcon, href: "/" },
    { label: "Quiz - kolejna odzywka", icon: MoonIcon, href: "/bid_quiz" },
  ];

const Sidebar = ({onClose, ...rest}) => {
  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, i) => (
        <NavLink key={i} link={link} />
      ))}
    </Box>
  );
}

export default Sidebar