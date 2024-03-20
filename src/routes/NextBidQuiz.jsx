import { useState } from "react";
import {
    Flex,
    Button,
    VStack,
    HStack,
    Heading,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import DealContainer from "../components/DealContainer";
import { useDisclosure, useToast } from "@chakra-ui/react";
import ChooseBidModal from "../components/ChooseBidModal";
import BidTableQuiz from "../components/BidTableQuiz";
import { Spinner } from "@chakra-ui/react";
import QuizComment from "../components/QuizComment";
import { client } from "../customHooks/axiosClient";
import { useNavigate } from "react-router-dom";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import fetchData from "../customHooks/loaderFetch";

export async function loader() {
    const categories = await fetchData("api/deals/get_categories");
    return categories;
}

const NextBidQuiz = () => {
    const { categories } = useLoaderData();
    const [checkedItems, setCheckedItems] = useState(
        categories.map((item) => {
            return { value: item, state: true };
        })
    );
    console.log(checkedItems);
    const toast = useToast();

    const [isStart, setIsStart] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isValid, setIsValid] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            setIsStart(true);
            setLoading(true);
            let filtered = checkedItems
                .filter((item) => item.state)
                .map((item) => item.value);
            const query_param = filtered.join(",");
            const response = await client.get(
                `/api/deals/get_quiz_element/?category__in=${query_param}`
            );
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const checkAnswer = () => {
        const userAnswer = data.path[data.path.length - 1].bid;
        const answers = data.answer.map((item) => item.bid);
        if (answers.includes(userAnswer)) {
            setIsValid(true);
            toast({
                title: "Prawidłowa odpowiedź!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Nieprawidłowa odpowiedź!",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            setIsValid(false);
        }
        setShowAnswer(true);
    };

    const handleNext = async () => {
        setShowAnswer(false);
        setLoading(true);
        setIsValid(null);
        try {
            let filtered = checkedItems
                .filter((item) => item.state)
                .map((item) => item.value);
            const query_param = filtered.join(",");
            const response = await client.get(
                `/api/deals/get_quiz_element/?category__in=${query_param}`
            );
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleShowDeal = () => {
        setShowAnswer(false);
        navigate(`/homework/${data.deal.id}`);
    };

    const toShow = data?.path[data.path.length - 1].player;

    if (!isStart) {
        return (
            <Flex
                w="100%"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <VStack
                    gap={2}
                    mb={2}
                    maxW="xl"
                    borderWidth={3}
                    rounded="lg"
                    borderColor="green.500"
                    p={6}
                    bgColor="white"
                    boxShadow="xl"
                >
                    <Heading size="l" mb={2}>
                        Sprawdź, co pamiętasz!
                    </Heading>
                    <Text>
                        Po klinięciu "START", z puli wszystkich prac domowych
                        wybrane zostanie losowe rozdanie oraz fragment
                        licytacji. Twoim zadaniem jest wskazanie optymalnej
                        (czyli takiej, którą Edek uważa za najlepszą :)),
                        zgodnej z naszym systemem licytacyjnym odzywki.
                    </Text>
                    <Heading size="l" mb={2}>
                        Naciśnij start, aby rozpocząć
                    </Heading>
                    <Button
                        variant="solid"
                        colorScheme="green"
                        onClick={handleClick}
                    >
                        START
                    </Button>
                </VStack>

                <Flex
                    maxW="xl"
                    borderWidth={2}
                    borderColor="green.500"
                    rounded="xl"
                    p={4}
                    bgColor="white"
                    boxShadow="xl"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Heading size="sm" mb={6}>
                        Z których prac domowych?
                    </Heading>
                    <CheckboxGroup
                        colorScheme="green"
                        defaultValue={categories}
                    >
                        <SimpleGrid columns={2} spacing={4}>
                            {checkedItems.map((item, idx) => (
                                <Checkbox
                                    key={idx}
                                    value={item.value}
                                    isChecked={item.state}
                                    onChange={(e) => {
                                        setCheckedItems(
                                            checkedItems.map((i) =>
                                                i.value === item.value
                                                    ? { ...i, state: !i.state }
                                                    : i
                                            )
                                        );
                                    }}
                                >
                                    {item.value}
                                </Checkbox>
                            ))}
                        </SimpleGrid>
                    </CheckboxGroup>
                </Flex>
            </Flex>
        );
    }

    if (loading)
        return (
            <Flex w="100%" justifyContent="center" alignItems="center">
                <Spinner size="xl" />
            </Flex>
        );

    return (
        <Flex w="100%" justifyContent="center">
            <ChooseBidModal
                isOpen={isOpen}
                onClose={onClose}
                data={data}
                setData={setData}
            />
            <Flex
                gap={6}
                p={4}
                maxW="container.md"
                justifyContent="center"
                wrap="wrap"
                alignItems="flex-start"
                bgColor="white"
                boxShadow="xl"
            >
                <DealContainer
                    player={data.deal.player}
                    n_hand={""}
                    s_hand={""}
                    e_hand={showAnswer || toShow === "E" ? data.deal.e : ""}
                    w_hand={showAnswer || toShow === "W" ? data.deal.w : ""}
                    w="320px"
                />
                <VStack w="340px">
                    <BidTableQuiz
                        onOpen={onOpen}
                        path={data.path}
                        isActive={!showAnswer}
                    />
                    <Button
                        w="100px"
                        variant="solid"
                        colorScheme="green"
                        onClick={checkAnswer}
                        isDisabled={
                            data.path[data.path.length - 1].bid === "?" ||
                            showAnswer
                                ? true
                                : false
                        }
                    >
                        OK
                    </Button>
                    {showAnswer ? (
                        <>
                            <QuizComment
                                answer={data.answer}
                                isValid={isValid}
                            />
                            <HStack>
                                <Button
                                    variant="solid"
                                    colorScheme="green"
                                    onClick={handleShowDeal}
                                >
                                    Cała licytacja
                                </Button>
                                <Button
                                    variant="solid"
                                    colorScheme="green"
                                    onClick={handleNext}
                                >
                                    Kolejne zadanie
                                </Button>
                            </HStack>
                        </>
                    ) : null}
                </VStack>
            </Flex>
        </Flex>
    );
};

export default NextBidQuiz;
