import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { options } from '../../auth/[...nextauth]/options';
import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
}

export async function POST(request: Request) {
  
    const body = await request.json();
    console.log(body.email);

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      select: { balance: true },
    });
    // console.log(user);
    if (user) {
      return new NextResponse(JSON.stringify(user.balance));
    } else {
      return new NextResponse(JSON.stringify(null));
    }
  } 


// Note: The code structure remains similar to the first example, with some minor adjustments.
