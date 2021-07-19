import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    Spinner
} from '@chakra-ui/react';
import useSWR from 'swr';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
export default function User() {

    const router = useRouter()
    const [session, loading] = useSession()
    const userId = router.query.userId
    const { data, error } = useSWR(`/api/user/${userId}`)

    const handleFollow = async () => {
        const req = await fetch('api/follow', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                userId,
                ownerId: session?.user.id
            })

        })
        const res = await req.json();

    }

    const handleUnfollow = async () => {

    }
    if (loading || !data) {
        return (
            <Center>
                <Spinner />
            </Center>
        )
    }
    console.log(data)


    return (
        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    alt={'Profile Image'}
                    src={
                        data.user.image
                    }
                    mb={4}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {data.user.name}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {data.user.email}
                </Text>
                <Text
                    textAlign={'center'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}>
                    This is a sample about me 🤯{' '}
                    <Link href={'#'} color={'blue.400'}>
                        #tag
            </Link>{' '}
            me in your posts
          </Text>

                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        #Web Dev
            </Badge>
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        #Python
            </Badge>
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        #Javascript
            </Badge>
                </Stack>

                <Stack mt={8} direction={'row'} spacing={4}>
                    {(session?.user.id === data.user.id) ? (
                        <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            _hover={{
                                bg: 'blue.500',
                            }}
                            _focus={{
                                bg: 'blue.500',
                            }}>
                            Your Profile
                        </Button>
                    ) :
                        (
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                bg={'blue.400'}
                                color={'white'}
                                onClick={() => handleFollow()}
                                boxShadow={
                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                }
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                _focus={{
                                    bg: 'blue.500',
                                }}>
                                Follow
                            </Button>
                        )}

                </Stack>
            </Box>
        </Center>
    );
}
