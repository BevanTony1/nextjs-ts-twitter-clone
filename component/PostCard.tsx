import { Box, Avatar, Flex, Text, Container, Spacer, Menu, MenuButton, MenuItem, MenuList, MenuGroup, Heading, Center } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import ModalUpdate from './ModalUpdate'
import ModalDelete from '../component/ModalDelete'
import { useSession } from 'next-auth/client'


interface Props {
    posts?: object | undefined | any

}



export const PostCard: React.FC<Props> = (props: Props) => {

    const [session] = useSession()
    return (
        <Container
            maxW={'lg'}
            bg={'white'}
            boxShadow={'xl'}
            rounded={'md'}
            marginTop={5}
            p={6}
            marginBottom={"15px"}
            direction={'column'}>

            <Flex>
                <Flex >
                    <Center>
                        <Link href={`/${props.posts.User.id}`} >
                            <Avatar
                                _hover={{ cursor: 'pointer' }}
                                src={props.posts.User.image} />
                        </Link>
                        <Text m='5px'>{props.posts.User.name} </Text>
                        <Text>{props.posts.updatedAt.toLocaleString()}</Text>
                    </Center>
                </Flex>
                <Spacer />
                {props.posts.User.id === session?.user.id ?
                    (
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
                    ) : (
                        <div></div>
                    )}

            </Flex>
            <Container padding={'10px'}>

                <h1>{props.posts.title}</h1>
            </Container>
        </Container >
    )
}