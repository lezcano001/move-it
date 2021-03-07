//En este archivo creamo un elemento context API

import { createContext, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// interface APIResponse {
//     name: string;
//     avatar_url: string;
// }

interface UserContextData {
    userName: string;
    avatarUrl: string;
    setUserName: (userName: string) => void;
    setAvatarUrl: (avatarUrl: string) => void;
    // userData: ;
}


interface UserProviderProps {
    // Cuando el children de un componente es un componente React podemos utilizar el tipo ReactNode que podemos importar de react
    children: ReactNode;
    // name?: string;
    // avatarUrl?: string;
    // userData: object;

}


// Creamos el context e importamos para usar en los componentes
export const UserContext = createContext({} as UserContextData);
// Cuando creamos nuestro Contexto vamos a especificar que el valor de las llaves es del tipo UserContextData a pesar de no tener ese formato específicamos que nuestro contexto sigue el formato de UserContextData.


// Para poder utilizar este context tenemos que importar este archivo y envolver una página con el componente del componente creado UserContext, ese componente va a ser <UserContext.Provider> cuando ponemos un punto por delante de un componente como es el caso del componente UserContext podemos acceder a los componente que tiene dentro o componentes hijos, como es el caso del componente Provider.

// El componente <UserContext.Provider> debe tener como propiedad value={} que va a guardar los datos que van a ser visibles para los componentes que estan dentro de la página envuelta.

// Para acceder a los datos compartidos por el Context API necesitamos usar el hook useContext() en el cuál como parámetro vamos a poner el nombre de nuestro componente Context API UserContext, para que nos devuelva(retorne) todo el contenido de la propiedad value={} de nuestro componente Provider hijo de nuestro componente UserContext.

// Un ejemplo recomendable para la captura de los datos es el siguiente:
// const contextUserData = useContext(UserContext);

// Podemos exportar una función dentro de nuestro archivo ChallengeContext al que le podemos llamar UserProvider y que básicamente va a retornar el componente <UserContext.Provider> con su prop value={}



// Podiamos desestructurar la propiedad children desde los parametros
// También las es recomendable que las props tengan un solo tipo por lo que vamos a usar el interface de typescript para lograr eso.

export function UserProvider({ children, /*...rest*/ }: UserProviderProps) {

    let userNameCookie = Cookies.get('userName');
    let avatarUrlCookie = Cookies.get('avatarUrl');

    // const [userName, setUserName] = useState("" || rest.name);
    // const [avatarUrl, setAvatarUrl] = useState("" || rest.avatarUrl);

    const [userName, setUserName] = useState(userNameCookie ?? "");
    const [avatarUrl, setAvatarUrl] = useState(avatarUrlCookie ?? "");

    // const [userData, setUserData] = useState(rest.userData);

    useEffect(() => {
        Cookies.set('userName', userName);
        Cookies.set('avatarUrl', avatarUrl);
    }, [userName, avatarUrl])

    return (

        // También las es recomendable que los datos de la prop value={} tengan un solo tipo por lo que vamos a usar el interface de typescript para lograr eso.
        <UserContext.Provider
            value={{
                userName,
                setUserName,
                avatarUrl,
                setAvatarUrl
                // userData
            }}>
            {children}
        </UserContext.Provider>
    )
}