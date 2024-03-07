import { useState, useEffect } from "react";
import { Flex, Button, VStack, HStack } from "@chakra-ui/react";
import DealContainer from "../components/DealContainer";
import { useDisclosure, useToast } from "@chakra-ui/react";
import ChooseBidModal from "../components/ChooseBidModal";
import BidTableQuiz from "../components/BidTableQuiz";
import { Spinner } from "@chakra-ui/react";
import QuizComment from "../components/QuizComment";
import { client } from "../customHooks/axiosClient";
import { useNavigate } from "react-router-dom";

const NextBidQuiz = () => {
    const [isStart, setIsStart] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isValid, setIsValid] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false)

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            setIsStart(true);
            setLoading(true);
            const response = await client.get("/api/get_quiz_deal/");
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const checkAnswer = () => {
        const userAnswer = data.path[data.path.length - 1].name;
        const answers = data.answer.map((item) => item.name);
        if (answers.includes(userAnswer)) {
            console.log("Dobra odpowiedz");
            setIsValid(true);
        } else {
            console.log("Chuja tam");
            setIsValid(false);
        }
        setShowAnswer(true);
        console.log(userAnswer);
        console.log(answers);
    };

    const handleNext = async () => {
        setShowAnswer(false);
        setLoading(true);
        setIsValid(null);
        try {
            const response = await client.get("/api/get_quiz_deal/");
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const handleShowDeal = () =>{
        navigate(`/homework/${data.deal.id}`);
    }

    if (!isStart) {
        return <Button onClick={handleClick}>START GAME</Button>;
    }

    if (loading)
        return (
            <Flex w="100%" justifyContent="center" alignItems="center">
                <Spinner size="xl" />
            </Flex>
        );

    return (
        <>
            <ChooseBidModal
                isOpen={isOpen}
                onClose={onClose}
                data={data}
                setData={setData}
            />
            <Flex
                gap={6}
                w="100%"
                justifyContent="center"
                wrap="wrap"
                alignItems="flex-start"
            >
                <DealContainer
                    player={data.deal.player}
                    n_hand={""}
                    s_hand={""}
                    e_hand={data.deal.e}
                    w_hand={data.deal.w}
                    w="320px"
                />
                <VStack>
                    <BidTableQuiz onOpen={onOpen} path={data.path} />
                    <Button
                        w="100px"
                        variant="solid"
                        colorScheme="green"
                        onClick={checkAnswer}
                        isDisabled={
                            data.path[data.path.length - 1].name === "?" || showAnswer
                                ? true
                                : false
                        }
                    >
                        OK
                    </Button>
                    {showAnswer ? <>
                        <QuizComment answer={data.answer} isValid={isValid} />
                        <HStack>
                            <Button variant="solid" colorScheme="green" onClick={handleShowDeal}>Cała licytacja</Button>
                            <Button variant="solid" colorScheme="green" onClick={handleNext}>Kolejne zadanie</Button>
                        </HStack>
                    </>
                    : null}
                </VStack>
            </Flex>
        </>
    );
};

export default NextBidQuiz;
