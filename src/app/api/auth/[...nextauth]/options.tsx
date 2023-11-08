import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your password"
                }
            },
            async authorize(credentials){
                const res = await fetch("https://predictchain.onrender.com/api/login", {
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    },
                    body:JSON.stringify({
                        username:credentials?.username,
                        password:credentials?.password
                    })
                })
                
                const user = await res.json();
                console.log(user);
                if (credentials?.username === user.email)
                {
                    console.log("yeeey");
                    return user
                } else {
                    return null
                }
            
            }
        })
    ]

}
