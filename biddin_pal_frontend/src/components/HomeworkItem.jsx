import React from "react";
import { Card, CardBody, Stack, Heading } from "@chakra-ui/react";
import DealContainer from "./DealContainer";
import { useNavigate } from "react-router-dom";

const HomeworkItem = ({ deal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/homework/${deal.id}`);
  };

  return (
    <Card
      minW="340px"
      cursor="pointer"
      boxShadow="xl"
      rounded="md"
      borderWidth={3}
      borderColor="white"
      _hover={{ borderColor: "green.500" }}
      onClick={handleClick}
    >
      <CardBody>
        <Stack mt="6" spacing="3">
          <DealContainer
            player={deal.player}
            n={deal.n}
            s={deal.s}
            e={deal.e}
            w={deal.w}
          />
          <Heading size="md" textAlign="center">
            {deal.comment}
          </Heading>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default HomeworkItem;
