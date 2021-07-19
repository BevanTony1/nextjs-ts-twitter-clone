import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  useDisclosure,
  useToast,
  ModalCloseButton,
} from "@chakra-ui/react"
import { useForm } from 'react-hook-form'

export default function DeleteModal(props: any) {
  const { handleSubmit, formState } = useForm();
  const toast = useToast()
  const onSubmit = async () => {
    try {

      const res = await fetch('/api/post', {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
        body: JSON.stringify({
          id: props.posts.id
        })
      })

      toast({
        title: "Post has Been deleted",
        description: "Successfully deleted Post.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } catch (err) {
      console.log(err)
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Text w='100%' onClick={onOpen}>Delete</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete post?</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
            </Button>
              <Button type='submit' onClick={onClose} colorScheme="red">Delete</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}