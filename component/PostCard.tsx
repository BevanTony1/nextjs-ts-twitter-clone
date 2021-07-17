import { Box, Avatar, Flex, Text, Container, Spacer, Menu, MenuButton, MenuItem, MenuList, MenuGroup, Heading } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import ModalUpdate from './ModalUpdate'
import ModalDelete from '../component/ModalDelete'


interface Props {
    posts?: object | undefined | any

}



export const PostCard: React.FC<Props> = (props: Props) => {

    console.log(props.posts)

    return (
        <Container
            maxW={'lg'}
            bg={'whiteAlpha.100'}
            boxShadow={'xl'}
            rounded={'lg'}
            p={6}
            marginBottom={"15px"}
            direction={'column'}>

            <Flex>
                <Avatar src={props.posts.User.image} />
                <Text>{props.posts.User.name}</Text>
                <Spacer />
                <Menu>
                    <MenuButton>
                        <EditIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title='Settings'>
                            <MenuItem><ModalUpdate posts={props.posts} /></MenuItem>
                            <MenuItem><ModalDelete posts={props.posts} /></MenuItem>
                        </MenuGroup>
                    </MenuList>

                </Menu>
            </Flex>
            <Container>

                <h1>{props.posts.title}</h1>
            </Container>
        </Container >
    )
}