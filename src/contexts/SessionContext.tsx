// import { useCookies } from 'react-cookie';
import { ReactNode, createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

interface SessionProviderProps {
    children: ReactNode;
    // isSigned: boolean;
}

interface SessionContextData {
    isSigned: boolean;
    setIsSigned: (isSigned: boolean) => void;
}

export const SessionContext = createContext({} as SessionContextData);

export function SessionProvider({ children }: SessionProviderProps) {
    let cookies = Cookies.get('isSigned');

    // cookies = Boolean(cookies)

    // console.log("hola")

    //(Cookies.get("isSigned")) && 

    const [isSigned, setIsSigned] = useState((cookies === 'true') ?? false);

    useEffect(() => {
        Cookies.set('isSigned', String(isSigned));
    }, [isSigned])

    return (
        <SessionContext.Provider
            value={{
                isSigned,
                setIsSigned
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}