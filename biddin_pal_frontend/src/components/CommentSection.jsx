import { Text, Card, CardBody, Heading, Divider, HStack, Button} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import EditComment from './EditComment';
import { client } from '../customHooks/axiosClient';

const CommentSection = ({bid, deal_id, setPaths}) => {
  
  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenCommentEdit = async () => {
    const response = await client.get("/api/get_csrf_token/");
    onOpen();
  }

  useEffect(() => {
    setComment(bid.comment);
  }, [bid])

  const handleSubmit = async () => {
    const response = await client.patch(`/api/bids/${bid.id}/`, {"comment": comment});
    const response2 = await client.get(`/api/deals/${deal_id}/get_all_paths/`);
    const dealData = await response2.data;
    setPaths(dealData["paths"]);
    onClose();
  };

  return (
    <>
    {isOpen ? <EditComment 
      isOpen = {isOpen}
      onClose = {onClose}
      comment = {comment}
      setComment = {setComment}
      handleSubmit = {handleSubmit}
    /> : null}

    
    <Card w="360px" borderColor="green.500" borderWidth={3}>
        <CardBody>
            <Heading size="sm" textAlign="center" mb={2}>
                Komentarz do odzywki {bid.bid}
            </Heading>
            <Divider borderColor="green.500" borderWidth={1} mb={1}/>
            <Text>{bid.comment ? bid.comment : "Brak komentarza do odzywki"}</Text>
        </CardBody>
        <HStack w="100%" justifyContent="space-between" p={2}>
          <Button colorScheme="green" onClick={handleOpenCommentEdit}>Edytuj</Button>
          <Button colorScheme="green">System</Button>
        </HStack>
    </Card>
    </>
  )
}

export default CommentSection