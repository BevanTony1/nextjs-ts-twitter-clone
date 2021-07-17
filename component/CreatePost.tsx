import { User, Post } from '@prisma/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSession } from 'next-auth/client'
import {
    Stack,
    FormControl,
    Input,
    Button,
    useColorModeValue,
    Heading,
    Container,
    Avatar,
} from '@chakra-ui/react';

interface CreatePostProps {
    onAddPosts: (post: Post & { user: User }) => void;
}


type FormData = {
    text: string
}


export default function CreatePost(props: CreatePostProps) {

    const [session] = useSession()

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
            props.onAddPosts(res);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Container
            maxW={'lg'}
            bg={useColorModeValue('white', 'whiteAlpha.100')}
            boxShadow={'xl'}
            rounded={'lg'}
            p={6}
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
                <Avatar src={session?.user.image}/>
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
