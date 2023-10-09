import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

interface RequestBody{
    email: string;
}

export async function POST(request:Request){
    const body:RequestBody = await request.json();
    const user = await prisma.user.findFirst({
        where:{
            email:body.email,
        }
    })
    if(user){
        const { password, ...userWithOutPass } = user;
        const result = {
            ...userWithOutPass,
            status: 'succes'
        }
        return new NextResponse(JSON.stringify(result))
    } else return new NextResponse(JSON.stringify(null));
}