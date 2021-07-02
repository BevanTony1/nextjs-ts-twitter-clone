import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useSession } from 'next-auth/client'
import { Profile } from '../component/Profile'
export default function Home() {

  const [session, loading] = useSession()


  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session ? (
        <Profile name={session.user.name} email={session.user.email} image={session.user.image} />

      ) : (
        <div>Tseting</div>
      )}




    </div >
  )
}
