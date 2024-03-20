import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

  const EditComment = ({ isOpen, onClose, handleSubmit, comment, setComment }) => {


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edytuj komentarz</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            as="textarea"
            value={comment}
            onChange={(e) => setComment(prev => e.target.value)}
            placeholder="Napisz swój komentarz"
          />
        </ModalBody>

        <ModalFooter display="flex" flexDir="row" justifyContent="space-between">
          <Button colorScheme="green" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditComment;
