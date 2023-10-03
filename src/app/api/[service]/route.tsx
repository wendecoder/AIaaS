// pages/api/[service].ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma'; // Import your Prisma client
import { useRouter } from 'next/router'

type ServiceToModel = {
  [key: string]: any; // You can define more specific types for your Prisma models
}
type RequestBody = {
    UserEmail: string;
}

export async function POST(request: Request, { params }: { params: { service: string } }) {
    try{
        
        const service: string = params.service;
        const body: RequestBody = await request.json();
        const serviceToModel: ServiceToModel = {
          medicognize: prisma.medicognize,
          aniclassify: prisma.aniClassify,
          sentix: prisma.sentix,
          cryptorush: prisma.cryptoRush,
          aisemanticsearch: prisma.aIsemanticSearch,
        };
        const user = await prisma.user.findUnique({
            where: {email: body.UserEmail},
        })
    
        const history = await serviceToModel[service as string].findMany({
          where: { userId: user?.id },
        });
        console.log("History from history page:", history);
        return new NextResponse(JSON.stringify(history))
    } catch (error){
        console.log('Error while fetching history:', error);
        throw error;
    }

}
