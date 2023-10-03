import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
interface RequestBody{
    username: String;
    password: String;
}
export async function POST(request: Request) {
    const body:RequestBody = await request.json();
    console.log(body);
    const user = await prisma.user.findFirst({
        where:{
            email:body.username as string,
        }
    })
    console.log(user);
    if (user && (await bcrypt.compare(body.password as string, user.password))){
        console.log("the user passwords match");
        const { password, ...userWithoutPass } = user;
        return new NextResponse(JSON.stringify(userWithoutPass));
    } else return new NextResponse(JSON.stringify(null));
}