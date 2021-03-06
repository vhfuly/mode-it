import Head from 'next/head'
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { SideBar } from '../components/Sidebar';
import { useSession, getSession } from 'next-auth/client';
import Login from '../components/Login';
import { Loader } from '../components/Loader';
import { signOut } from 'next-auth/client'
interface HomeProps {
  session: object,
}

//As props são acessadas da função getServerSideProps
export default function Home(props: HomeProps) {
  const [ session, loading ] = useSession()
  return (
   
    <ChallengesProvider
    session={props.session}
    >
      {!props.session && !loading &&
        <Login />
      }
      {loading && 
        <Loader />
      }
      {props.session  && !loading &&
      <div className={styles.overlay}>
      <SideBar
        home = {true}
        award = {false}
        />
      <div className={styles.container}>

        <Head>
          <title>Início | move.it</title>
        </Head>
        <div className={styles.signout}>
            <button onClick={() => signOut()}> <img src="/icons/out.svg" alt="out"/> </button>
        </div>
        <ExperienceBar />
         
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
      </div>
      }
    </ChallengesProvider>
  )
}

//todas as chamadas no getServerSideProps serão feitas antes de finalizar a tela
//utilizado para dados de SEO que estão no banco de dados.
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return {
    props: {
      session,
    }
  }
}
