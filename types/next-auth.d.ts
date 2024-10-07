import NextAuth, { User, type DefaultSession } from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            username: string;
            email: string;
            avatar: string;
        }
    }

    interface User {
        id: number;
        username: string;
        email: string;
        avatar: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: number;
            username: string;
            email: string;
            avatar: string;
        }
    }
}