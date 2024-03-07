import { Text, Card, CardBody, Heading, Divider, HStack, Button} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';

const QuizComment = ({answer, isValid}) => {
  const toast = useToast();

  isValid ? toast({
    title: "Prawidłowa odpowiedź!",
    status: "success",
    duration: 9000,
    isClosable: true,
  }):
  toast({
    title: "Nieprawidłowa odpowiedź!",
    status: "error",
    duration: 9000,
    isClosable: true,
  })

  return (
    <>
    <Tabs defaultIndex={0}>
      <TabList>
      {answer.map((item, idx) => (
        <Tab key={idx}>{idx + 1}</Tab>
      ))}
    </TabList>
  
    <TabPanels>
      {answer.map((item, idx) => (
        <TabPanel key={idx}>
          <Card w="320px" borderColor={isValid ? "green.500" : "red.500"} bgColor={isValid ? "green.100" : "red.100"} borderWidth={3}>
        <CardBody>
            <Heading size="sm" textAlign="center" mb={2}>
                Prawidłowa odzywka: {item.name}
            </Heading>
            <Divider borderColor={isValid ? "green.500" : "red.500"} borderWidth={1} mb={1}/>
            <Text>{item.comment? item.comment : "Brak komentarza do tej odzywki"}</Text>
        </CardBody>
    </Card>
      </TabPanel>
      ))}
    </TabPanels>
  </Tabs>

    
    </>
  )
}

export default QuizComment