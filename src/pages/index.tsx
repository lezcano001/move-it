import styles from '../styles/pages/Login.module.css';
import { LoginBox } from '../components/LoginBox';
import Head from 'next/head';
import { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { useRouter } from 'next/router';

export default function Login() {

    const router = useRouter();
    const { isSigned } = useContext(SessionContext);

    if (isSigned === true) {
        router.push('/home');
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | move.it</title>
            </Head>

            <img src="icons/simbolo.svg" alt="simbolo" />
            <LoginBox />
        </div>
    );
}