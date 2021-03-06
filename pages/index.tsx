import Head from 'next/head'
import useSWR from 'swr'
// import styles from '../styles/Home.module.scss'
import { useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { Profile } from '../component/Profile'
import { Loading } from '../component/Loading'
import Landing from '../component/Landing'
import { PostCard } from '../component/PostCard'
import CreatePost from '../component/CreatePost'
import { Container, Center, Grid, Spinner, Flex, Box, Stack, SimpleGrid, Divider } from '@chakra-ui/react'
import { Post, User } from '@prisma/client'



interface HomeProps {
  posts: Post & User
}



export default function Home(props: HomeProps) {
  const [session, loading] = useSession()
  if (!session) {
    return (
      <Landing />
    )
  }

  const { data, error } = useSWR('/api/posts', { refreshInterval: 1 })




  if (error) {
    return (
      <div>An Error occured!</div>
    )
  }


  if (loading || !data) {
    return <Loading />
  }



  return (


    <div style={{ backgroundColor: '#f3f2ef' }}>
      <Head>
        <title>DemoApp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={'100%'} py={10}>
        <SimpleGrid templateColumns={{ sm: '.5fr', md: '.5fr 1fr' }} spacing={['0', '13']}>
          <Profile name={session.user.name} email={session.user.email} image={session.user.image} />
          <Stack>
            <CreatePost />

            {data.posts.map((post: HomeProps, key: number) => (
              <PostCard posts={post} key={key} />
            ))}
          </Stack>
        </SimpleGrid>
      </Container>




    </div >
  )
}
