import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import HomeworkItem from "../components/HomeworkItem";
import useFetch from "../customHooks/useFetch";

const Homework = () => {
  const [data, error, loading] = useFetch("api/deals/");

  return (
    <Flex
      gap={4}
      wrap="wrap"
      justifyContent="space-around"
      alignItems="center"
      flexDirection="row"
      w="100%"
    >
      {loading ? <div>Loading</div> : 
      data.map((item, idx) => (
        <HomeworkItem key={idx} deal={item}/>
      ))
    }

    </Flex>
  );
};

export default Homework;
