import { Avatar, Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

export default function WithLargeQuote() {
    return (
        <Stack
            bg={'white'}
            py={16}
            px={8}
            spacing={{ base: 8, md: 10 }}
            align={'center'}
            direction={'column'}>
            <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                textAlign={'center'}
                maxW={'3xl'}>
                CRUD Demo Application using NextJS as the frontend framework and PosgresSQL as the database.
      </Text>
            <Box textAlign={'center'}>
                <Avatar
                    src={
                        'https://lh3.googleusercontent.com/a-/AOh14GhFP-e2nxhVcGiN4iOiuCZVh5qh_aKnShzmYX3qMg=s96-c'}
                    alt={'Bevan Tony Medrano'}
                    mb={2}
                />

                <Text fontWeight={600}>Bevan Tony Medrano</Text>
                <Text fontSize={'sm'} color={useColorModeValue('gray.400', 'gray.400')}>
                    Web Developer
        </Text>
            </Box>
        </Stack>
    );
}
