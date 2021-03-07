import { useContext, useState } from 'react';
import styles from '../styles/components/LoginBox.module.css';

import { useRouter } from 'next/router';

import axios from 'axios';
import { UserContext, UserProvider } from '../contexts/UserContext';
import { SessionContext } from '../contexts/SessionContext';


interface DataFormat {
    name: string;
    avatar_url: string;
}

export function LoginBox() {

    const { setIsSigned } = useContext(SessionContext);

    const { setUserName, setAvatarUrl } = useContext(UserContext);

    const router = useRouter();

    const [loginButtonStyle, setLoginButtonStyle] = useState(styles.loginButton);
    const [text, setText] = useState("");
    // const [name, setName] = useState("");
    const [buttonState, setButtonState] = useState(true);
    // const [avatarUrl, setAvatarUrl] = useState("");

    async function test() {
        // setUserData(res.data);

        //res.status
        let isAuthenticated = true;
        let data: DataFormat;

        try {
            const res = await axios.get(`https://api.github.com/users/${text}`);
            data = res.data;
        } catch (err) {
            // nameRes = "Usuario no encontrado";

            alert("Usuario no encontrado");
            isAuthenticated = false;

            setLoginButtonStyle(styles.loginButton);
            setButtonState(true);
            setText("");
        } finally {
            // alert(nameRes);
            if (isAuthenticated) {
                // console.log(data);
                setUserName(data.name);
                setAvatarUrl(data.avatar_url);
                setIsSigned(true);
                router.push('/home');
            }


            // Aca hay que hacer un proceso
        }

        // if (res.status === 200) {
        //     console.log(res.data);
        //     alert(res.data.name);
        // } else {
        //     alert("Usuario no encontrado");
        // }
    }

    function handleUserName(event) {
        setText(event.target.value);
        // console.log(event.target.value.length);
        if (event.target.value.length > 0) {
            setLoginButtonStyle(styles.loginButtonActive);
            setButtonState(false);
        } else {
            setLoginButtonStyle(styles.loginButton);
            setButtonState(true);
        }
    }

    function loginUser(event) {
        event.preventDefault();
        test();

        // El problema de las dos acciones de abajo es que se ejecutan antes de recibir la respuesta
        // console.log(userData.name);
        // alert(userData.name);
    }

    return (
        <UserProvider>
            <div className={styles.loginBoxContainer}>
                <img src="/logo-full-white.svg" alt="Logo Full" />

                <div>
                    <h1>Bem-vindo</h1>

                    <div>
                        <img src="/icons/github-logo.svg" alt="Github Logo" />
                        <p>
                            Faça login com seu Github
                        <br />
                        para começar
                    </p>
                    </div>

                    <form onSubmit={loginUser}>
                        <input id="name" type="text" placeholder="Digite seu username" value={text} onChange={handleUserName} />
                        <button type="submit" className={loginButtonStyle} disabled={buttonState}><img src="icons/next.svg" alt="Next" /></button>
                    </form>
                </div>
            </div>
        </UserProvider>
    );
}