import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

interface RequestBody{
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export async function POST(request:Request){

        const body:RequestBody = await request.json();

        const user = await prisma.user.create({
            data:{
                username:body.name,
                email:body.email,
                password: await bcrypt.hash(body.password, 10) || "",
                balance: 10000,
                avatar: body.avatar || ""
            },
        });

        const { password, ...res } = user;
        const result = {
            ...res,
            status: "success"
        }
        console.log(result);
        return new Response(JSON.stringify(result))
        // {
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        //         "Access-Control-Allow-Headers": "Content-Type"
        //     }
        // }
        ;
}