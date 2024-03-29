import React from "react";
import { Box, Grid, GridItem, Text, Icon, HStack, VStack  } from "@chakra-ui/react";
import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill } from "react-icons/bs";

const suits = [
    {icon: BsSuitSpadeFill, color: "black"}, 
    {icon: BsSuitHeartFill, color: "red"},
    {icon: BsSuitDiamondFill, color: "red"}, 
    {icon: BsSuitClubFill, color: "black"}
]

const DealContainer = ({n_hand, s_hand, e_hand, w_hand, player, ...props}) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" templateRows='repeat(3, 1fr)' gap={1} {...props}>
      <GridItem  display ="flex" w="100%" aspectRatio="1/1" bg="green.200" textAlign="center" justifyContent="center" alignItems="center" fontSize="1.5em">
            <Text>{player}</Text>
            </GridItem>
      <GridItem w="100%" aspectRatio="1/1" bg="green.200" />
      <GridItem w="100%" aspectRatio="1/1" bg="green.200" />
      <GridItem w="100%" aspectRatio="1/1" bg="green.200">
      {w_hand ? w_hand.split(".").map((item, idx) => (
        <HStack key={idx} gap={1} px={1}>
            <Icon as={suits[idx].icon} color={suits[idx].color}/><Text>{item.replace("T", "10")}</Text>
        </HStack>
        )) : null} 
      </GridItem>
      <GridItem w="100%" aspectRatio="1/1" bg="green.200">
        <VStack h="100%" justifyContent="space-between" gap={0} p={1.5}>
            <Text borderWidth={2} borderColor="black" borderRadius="100%" w={7} aspectRatio="1/1" textAlign="center">
                N
            </Text>
            <HStack justifyContent="space-between" w="100%">
            <Text borderWidth={2} borderColor="black" borderRadius="100%" w={7} aspectRatio="1/1" textAlign="center">
                W
            </Text>
            <Text borderWidth={2} borderColor="black" borderRadius="100%" w={7} aspectRatio="1/1" textAlign="center">
                E
            </Text>
            </HStack>
            <Text borderWidth={2} borderColor="black" borderRadius="100%" w={7} aspectRatio="1/1" textAlign="center">
                S
            </Text>
        </VStack>

      </GridItem>
      <GridItem w="100%" aspectRatio="1/1" bg="green.200">
      {e_hand ? e_hand.split(".").map((item, idx) => (
        <HStack key={idx} gap={1} px={1}>
            <Icon as={suits[idx].icon} color={suits[idx].color}/><Text>{item.replace("T", "10")}</Text>
        </HStack>
        )): null} 
      </GridItem>
      <GridItem w="100%" aspectRatio="1/1" bg="green.200" />
      <GridItem w="100%" aspectRatio="1/1" bg="green.200"/>
      <GridItem w="100%" aspectRatio="1/1" bg="green.200" />
    </Grid>
  );
};

export default DealContainer;
