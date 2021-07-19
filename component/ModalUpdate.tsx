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
    useDisclosure,
    useToast,
} from "@chakra-ui/react"
import { useForm } from 'react-hook-form'

interface ModalProps {
    data: any
    text: string
}



export default function ModalUpdate(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, reset, setValue, formState } = useForm();
    const toast = useToast()
    const onSubmit = async (data: ModalProps) => {
        try {

            const res = await fetch('api/post', {
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify({
                    id: props.posts.id,
                    text: data.text
                })
            })

            toast({
                title: "Post has been updated.",
                description: "Successfully updated Post",
                status: "info",
                duration: 9000,
                isClosable: true,
            })

        } catch (err) {
            console.log('Something went wrong')
        }

        // if (!res.ok) {
        //     throw new Error(res.statusText)
        // }
        // return await res.json()

    }
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
                            <Input id={'text'} type={'text'} defaultValue={props.posts.title} {...register('text')}></Input>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose} >
                                Close
                            </Button>
                            <Button type={'submit'} onClick={onClose} colorScheme='green'>
                                Update
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}