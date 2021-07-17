import Head from 'next/head'
// import styles from '../styles/Home.module.scss'
import { useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { Profile } from '../component/Profile'
import { Loading } from '../component/Loading'
import Landing from '../component/Landing'
import { PostCard } from '../component/PostCard'
import CreatePost from '../component/CreatePost'
import ModalPost from '../component/ModalPost'
import { Container, Grid } from '@chakra-ui/react'
import prisma from '../lib/prisma'
import { Post, User } from '@prisma/client'

export async function getServerSideProps() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        User: {
          select: {
            name: true,
            email: true,
            image: true
          },
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }

    });
    return {
      props: { posts }
    };
  } catch (err) {
    console.log(err);
  }

}

interface HomeProps {
  posts: Post & User
}



export default function Home(props: HomeProps) {
  const [posts, setPosts] = useState<any>(props.posts)


  const [session, loading] = useSession()


  if (loading) {
    return <Loading />
  }



  return (


    <div>
      <Head>
        <title>DemoApp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        session ? (
          <Container>
            <Grid gap={3}>

              <Profile name={session.user.name} email={session.user.email} image={session.user.image} />
              <CreatePost onAddPosts={(post: Post & { user: User }) => {
                setPosts([...posts, post]);
              }} />
              {posts.map((post: HomeProps, key: number) => (
                <PostCard posts={post} key={key} />
              ))}
            </Grid>
          </Container>
        ) : (
          <>
            <Landing />
          </>
        )
      }




    </div >
  )
}
