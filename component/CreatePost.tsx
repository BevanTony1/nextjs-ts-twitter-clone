import { User, Post } from '@prisma/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSession } from 'next-auth/client'
import {
    Center,
    Stack,
    FormControl,
    Input,
    Button,
    useColorModeValue,
    Heading,
    useToast,
    Avatar,
    Container,
} from '@chakra-ui/react';




type FormData = {
    text: string
}


export default function CreatePost() {

    const [session] = useSession()
    const toast = useToast()
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const req = await fetch('api/post', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(data)

            })
            setValue('text', '')
            const res = await req.json();
            toast({
                title: "New Post",
                description: "Post has been successful",
                status: "info",
                duration: 9000,
                isClosable: true,
              })

        } catch (err) {
            console.log(err)
        }
    }
    return (
            
       <Container
            maxW={'lg'}
            bg={'white'}
            boxShadow={'xl'}
            marginInline={'0'}
            p={6}
            rounded={['none', 'md', 'md']}
            direction={'column'}>
            <Heading
                as={'h2'}
                fontSize={{ base: 'xl', sm: '2xl' }}
                textAlign={'center'}
                mb={5}>
                Create Post
                
            </Heading>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                as={'form'}
                spacing={'12px'}
                onSubmit={handleSubmit(onSubmit)}>
                    <Center>

                <Avatar
                src={session?.user.image}/>
                </Center>
                <FormControl>
                    <Input
                        variant={'solid'}
                        borderWidth={1}
                        color={'gray.800'}
                        _placeholder={{
                            color: 'gray.400',
                        }}
                        borderColor={useColorModeValue('gray.300', 'gray.700')}
                        id={'text'}
                        type={'text'}
                        required
                        placeholder={'Create Post'}
                        aria-label={'Create Post'}
                        {...register('text')}
                    />
                </FormControl>
                <FormControl w={{ base: '100%', md: '40%' }}>
                    <Button
                        colorScheme={'blue'}
                        w="100%"
                        type={'submit'}>
                        Submit
                    </Button>
                </FormControl>
            </Stack>
        </Container >

    );
}
