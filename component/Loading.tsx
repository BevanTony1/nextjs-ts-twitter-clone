import { Stack, Skeleton } from '@chakra-ui/react'

export const Loading = () => {
    return (
        <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Stack>
    )
}