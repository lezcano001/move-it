import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';


// export default NextAuth({
//     providers: [
//       Providers.GitHub({
//         clientId: process.env.GITHUB_ID,
//         clientSecret: process.env.GITHUB_SECRET
//       }),
//     ],

//     database: process.env.DATABASE_URL,
//   })

const options = {
    providers: [
        Providers.Auth0({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            domain: process.env.AUTH0_DOMAIN
        })
    ],

    // A database is optional, but required to persist accounts in database
    /* 
        Practicamente solo seria necesario si usabamos autenticación de email pero como usamos
        autenticación Auth0 no necesitamos.
    */
    // database: process.env.DATABASE_URL
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    NextAuth(req, res, options);