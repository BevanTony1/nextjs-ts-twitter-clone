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
  ModalCloseButton,
} from "@chakra-ui/react"
import { useForm } from 'react-hook-form'

export default function DeleteModal(props: any) {
  const { handleSubmit, formState } = useForm();
  const onSubmit = async () => {
    const res = await fetch('/api/post', {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify({
        id: props.posts.posts.id
      })
    })
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
              <Button type='submit' colorScheme="red">Delete</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}