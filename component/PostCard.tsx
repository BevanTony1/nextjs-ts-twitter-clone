import { Box, Avatar, Flex, Text, Container, Spacer, Menu, MenuButton, MenuItem, MenuList, MenuGroup } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import ModalPost from '../component/ModalPost'
import ModalDelete from '../component/ModalDelete'


interface Props {
    posts?: object | undefined | any

}



export const PostCard: React.FC<Props> = (props: Props) => {



    return (
        <Box p={4} bg={'gray.200'}>
            <Flex>
                <Avatar src={props.posts.User.image} />
                <Text>{props.posts.User.name}</Text>
                {/* <Text>{props.posts.updatedAt.toLocaleDateString()}</Text> */}
                <Spacer />
                <Menu>
                    <MenuButton>
                        <EditIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title='Options'>
                            <MenuItem><ModalPost posts={props} /></MenuItem>
                            <MenuItem><ModalDelete posts={props} /></MenuItem>
                        </MenuGroup>
                    </MenuList>

                </Menu>
            </Flex>
            <Container>

                <h1>{props.posts.title}</h1>
            </Container>
        </Box>
    )
}