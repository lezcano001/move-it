//import Cookies from 'cookies';
import '../styles/global.css';
import { UserContext, UserProvider } from '../contexts/UserContext';
import { SessionProvider } from '../contexts/SessionContext';

// import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps/*, props*/ }) {

  // console.log(props.isSigned);

  return (
    <SessionProvider
    /*isSigned={props.isSigned}*/
    >
      {/* <Provider session={pageProps.session}> */}
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
      {/* </Provider> */}
    </SessionProvider>
  )
}

/*
MyApp.getInitialProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);

  // const { isSigned } = ctx.req.cookies;
  const isSignedCookie = cookies.get('isSigned');

  return {
    props: {
          isSigned: Boolean(isSigned)
        }
    props: {
      isSigned: isSignedCookie
    }
  }
}

*/

/*
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { isSigned } = ctx.req.cookies;

  // rest.isSigned &&

  return {
    props: {
      isSigned: Boolean(isSigned)
    }
  }
}

*/

export default MyApp
