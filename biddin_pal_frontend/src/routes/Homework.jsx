import React from "react";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import HomeworkItem from "../components/HomeworkItem";
import fetchData from "../customHooks/loaderFetch";
import { useLoaderData, useNavigation } from "react-router-dom";

export async function loader() {
  const dealsData = await fetchData(`api/deals/`);
  return dealsData;
}

const Homework = () => {
  const dealsData = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Flex w="100%" justifyContent="center"><Spinner size="xl" color="green.600"/></Flex>;
  }

  return (
    <Flex
      gap={4}
      wrap="wrap"
      justifyContent="space-around"
      alignItems="center"
      flexDirection="row"
      w="100%"
    >
      {dealsData.map((item, idx) => (
        <HomeworkItem key={idx} deal={item}/>
      ))
    }
    </Flex>
  );
};

export default Homework;
