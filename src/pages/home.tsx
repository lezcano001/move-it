import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { SideBar } from '../components/SideBar';
import { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { useRouter } from 'next/router';

// import { signIn, signOut, useSession } from 'next-auth/client';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  // name: string;
  // avatar_url: string;
}

// const { userName, avatarUrl } = useContext(UserContext);

export default function Home(props: HomeProps) {

  const router = useRouter();

  // const [session, loading] = useSession();
  const { isSigned } = useContext(SessionContext);
  // console.log(isSigned)

  // if (isSigned === false) {
  //   router.push('/leaderboard');
  // }
  return (
    <>
      {!isSigned && <>
        <h1>Not signed</h1>
        {/* <button onClick={() => signIn()}>Sign in</button> */}
      </>
      }
      {isSigned && <>
        <ChallengesProvider
          level={props.level}
          currentExperience={props.currentExperience}
          challengesCompleted={props.challengesCompleted}
        >
          <div className={styles.container}>
            <SideBar page="Home" />
            <div className={styles.sectionsContainer}>
              <Head>
                <title>Inicio | move.it</title>
              </Head>
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
        </ChallengesProvider>
        {/* <button onClick={() => signOut()}>Sign out</button> */}
      </>}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  // Los hookes solo se pueden usar dentro del cuerpo de la función de un componente
  // const { avatarUrl, userName } = useContext(UserContext);

  // const res = await axios.get(`https://api.github.com/users/lezcano001`);
  // const { name, avatar_url } = res.data;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      // name: avatarUrl,
      // avatar_url: userName,
    }
  }
}