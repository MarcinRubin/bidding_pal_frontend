import { useState, useEffect } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import fetchData from "../customHooks/loaderFetch";
import { Card, CardBody, Stack, Heading, Flex, VStack, HStack, Text, Button } from "@chakra-ui/react";
import DealContainer from "../components/DealContainer";
import BidTabTable from "../components/BidTabTable";
import CommentSection from "../components/CommentSection";

export async function loader({ params }) {
  const dealData = await fetchData(`api/deals/${params.dealId}/get_all_paths/`);
  return dealData;
}

const HomeworkDeal = () => {
  const dealData = useLoaderData();
  const navigation = useNavigation();
  const [paths, setPaths] = useState(dealData["paths"]);
  const [bidArray, setBidArray] = useState([0, 0]);

  const handleChangeActiveComment = (pathNumber, idx) => {
    const newBidArray = [pathNumber, idx];
    setBidArray(newBidArray);
  }

  if (navigation.state === "loading") {
    return <h1>Loading!</h1>;
  }

  return (
    <Flex gap={4} w="100%" justifyContent="center" wrap="wrap">
      <Card
      w="340px"
      cursor="pointer"
      boxShadow="xl"
      rounded="md"
      borderWidth={3}
      borderColor="white"
    >
      <CardBody>
        <Stack mt="6" spacing="3">
          <DealContainer
            player={dealData["player"]}
            n={dealData["n"]}
            s={dealData["s"]}
            e={dealData["e"]}
            w={dealData["w"]}
          />
          <Heading size="md" textAlign="center">
            {dealData["comment"]}
          </Heading>
        </Stack>
      </CardBody>
    </Card>

    <VStack gap={4} justifyContent="space-around" bg="white" p={4} boxShadow="xl"rounded="md">
    <BidTabTable
        paths = {paths}
        handleChangeActiveComment = {handleChangeActiveComment}
    />
    <CommentSection
      bid = {paths[bidArray[0]][bidArray[1]]} 
      setPaths = {setPaths}
      paths = {paths} 
    />
    </VStack>
    
    </Flex>
  );
};

export default HomeworkDeal;
