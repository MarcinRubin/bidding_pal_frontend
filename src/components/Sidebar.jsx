import React from 'react'
import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import { MoonIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';
import { TbCards } from "react-icons/tb";

// const LinkItems = [
//     { label: "System licytacyjny", icon: MoonIcon, href: "/" },
//     { label: "Prace domowe", icon: MoonIcon, href: "/homework" },
//     { label: "Inne ciekawe rozdania", icon: MoonIcon, href: "/" },
//     { label: "Quiz - cała licytacja", icon: MoonIcon, href: "/" },
//     { label: "Quiz - kolejna odzywka", icon: MoonIcon, href: "/bid_quiz" },
//   ];

  const LinkItems = [
    { label: "Prace domowe", icon: TbCards, href: "/homework" },
    { label: "Quiz - kolejna odzywka", icon: QuestionOutlineIcon, href: "/bid_quiz" },
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
          Deals library
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, i) => (
        <NavLink key={i} link={link} onClick={onClose}/>
      ))}
    </Box>
  );
}

export default Sidebar