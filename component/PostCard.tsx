import { Box, Avatar } from '@chakra-ui/react'


interface Props {
    posts?: object | undefined | any

}

export const PostCard: React.FC<Props> = (props: Props) => {
    console.log(props.posts.User.image)
    return (
        <Box p={4} bg={'gray.200'}>
            <Avatar src={props.posts.User.image} />

        </Box>
    )
}