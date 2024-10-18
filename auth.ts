import Credentials from "next-auth/providers/credentials"
import prisma from "@/app/lib/db"
import { AuthError } from "@/app/lib/definitions"
import { AuthOptions } from "next-auth"
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: 'Credenials',
            credentials: {
                email: {},
                password: {}
            },
            // @ts-ignore
            authorize: async (creds) => {
                const user = await prisma.user.findUnique({ 
                    where: {
                        email: creds?.email 
                    }, 
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        password: true,
                        avatar: true,
                        favorites: {
                            select: { recipeId: true }
                        }
                    },
                })

                if(!user) throw new AuthError('Invalid email or password', 'InvalidCreds')
                // @ts-ignore
                if(user && bcrypt.compareSync(creds.password, user.password)) {
                    return { 
                        id: user.id, 
                        email: user.email, 
                        username: user.username,
                        avatar: user.avatar,
                        favorites: user.favorites.map(fv => fv.recipeId)
                    }
                } else {
                    throw new AuthError('Invalid email or password', 'InvalidCreds');
                }

            }
        }),
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user, trigger, session }){
            if(user) {
                token.user = { 
                    id: Number(user.id), 
                    username: user.username, 
                    email: user.email, 
                    avatar: user.avatar,
                    favorites: user.favorites
                }
            }

            if(trigger === 'update') {
                if(session?.user?.favorites) {
                    console.log('FAVORTIES', session.user.favorites)
                    token.user.favorites = session.user.favorites;
                }
            }
            return Promise.resolve(token);
        },
        async session({ session, token }) {
            // console.log(token, session)
            if(token) {
                session.user = token.user
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            if(url.includes('signup')) {
                return `${baseUrl}/profile`
            } else {
                return url;
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}