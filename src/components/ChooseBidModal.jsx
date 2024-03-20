import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import BidSelector from "./BidSelector";

const ChooseBidModal = ({ isOpen, onClose, data, setData }) => {

    const toast = useToast();

    const [bidState, setBidState] = useState({
        level: "",
        suit: "",
        special: "",
    });

    const handleOk = () => {
        const validator1 =
            bidState.level.length === 0 &&
            bidState.suit.length === 0 &&
            bidState.special.length !== 0;
        const validator2 =
            bidState.level.length !== 0 &&
            bidState.suit.length !== 0 &&
            bidState.special.length === 0;

        if (validator1 || validator2) {
            const bid = Object.values(bidState).join("");
            let newData = { ...data };
            newData.path[newData.path.length - 1] = {...newData.path[newData.path.length - 1], bid: bid.toLowerCase()};
            setData(newData);
        } else {
            let newData = { ...data };
            newData.path[newData.path.length - 1] = {...newData.path[newData.path.length - 1],  bid: "?" };
            setData(newData);
            toast({
                title: "Nieprawidłowa odzywka",
                description:
                    "Została wprowadzona nieprawidłowa odzywka. spróbuj ponownie",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">Wybierz odzwykę</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" justifyContent="center">
                    <BidSelector
                        bidState={bidState}
                        setBidState={setBidState}
                    />
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Button
                        colorScheme="green"
                        variant="outline"
                        mr={3}
                        onClick={onClose}
                    >
                        Zamknij
                    </Button>
                    <Button
                        variant="outline"
                        colorScheme="green"
                        onClick={handleOk}
                    >
                        Potwierdź
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ChooseBidModal;
