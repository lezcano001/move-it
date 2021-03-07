import Head from 'next/head';
import { useRouter } from 'next/router';

import { useContext } from 'react';

import { SideBar } from '../components/SideBar';
import { UsersRanking } from '../components/UsersRanking';
import { SessionContext } from '../contexts/SessionContext';
import styles from '../styles/pages/Leaderboard.module.css';

// import { signIn, signOut, useSession } from 'next-auth/client';

// interface HomeProps {
//     isSigned: boolean;
// }

export default function Leaderboard(/*props: HomeProps*/) {

    // const [session, loading] = useSession();
    const router = useRouter();

    const { isSigned } = useContext(SessionContext);

    // if (!isSigned) {
    //     router.push('/index');
    // }

    return (
        <>
            {!isSigned && <>
                <h1>Not signed</h1>
            </>
            }
            { isSigned && <>
                <div className={styles.container}>
                    <SideBar page="Leaderboard" />
                    <div className={styles.containerContent}>
                        <Head>
                            <title>Leaderboard | move.it</title>
                        </Head>
                        <h1>Leaderboard</h1>
                        <UsersRanking />
                    </div >
                </div >
            </>}
        </>
    );
}