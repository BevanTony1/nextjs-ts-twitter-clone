import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';


interface User {
    name?: string
    email?: string
    image?: string
}


export const Profile: React.FC<User> = ({ name, email, image }) => {
    return (

        <Box
            maxW={['450px', '450px', '250px']}
            maxH={['450px', '450px', '300px']}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            marginLeft={[0, 0, 5]}
            marginRight={[0, 0, 5]}
            rounded={['none', 'md', 'md']}
            overflow={'hidden'}>
            <Image
                h={'120px'}
                w={'full'}
                src={
                    'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
                objectFit={'cover'}
            />
            <Flex justify={'center'} mt={-12}>
                <Avatar
                    size={'xl'}
                    src={image}
                    alt={'Author'}
                    css={{
                        border: '2px solid white',
                    }}
                />
            </Flex>

            <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                    <Heading textAlign='center' fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                        {name}
                    </Heading>
                    <Text color={'gray.500'}>{email}</Text>
                </Stack>




            </Box>
        </Box>
    );
}
