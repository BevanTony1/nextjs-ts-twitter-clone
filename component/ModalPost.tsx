import {
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    ModalCloseButton,
    Button,
    useDisclosure
} from "@chakra-ui/react"
import { useForm } from 'react-hook-form'

interface ModalProps {
    data: any
    text: string
}



export default function ModalPost(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, reset, formState } = useForm();
    const onSubmit = async (data: ModalProps) => {
        const res = await fetch('api/post', {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({
                id: props.posts.posts.id,
                text: data.text
            })
        })
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return await res.json()
        reset()
    };
    return (
        <>
            <Text w='100%' onClick={onOpen}>Edit</Text>
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input id={'text'} type={'text'} defaultValue={props.posts.title}  {...register('text')}></Input>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose} >
                                Close
              </Button>
                            {/* <Button onClick={async () => await updatePost(props)} colorScheme='green'>Update</Button> */}
                            <Button type={'submit'} colorScheme='green'>Update</Button>

                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}