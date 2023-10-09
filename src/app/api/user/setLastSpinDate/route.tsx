import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

type RequestBody = {
  email: string;
//   lastSpinTime: Date;
};

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
    console.log(body);
  try {
    if (body.email) {
      const user = await prisma.user.findUnique({
        where: { email: body.email },
        select: { lastSpinnedTime: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

    //   const currentLastSpinTime = Date.now();

      // Calculate the remaining time until the next spin
      const remainingTime = Number(user.lastSpinnedTime) + 24 * 60 * 60 * 1000 - Date.now();

      if (remainingTime > 0) {
        const ApiResponse = {
            remainingTime: remainingTime,
        }
        return new NextResponse(JSON.stringify(ApiResponse));
      } else {
        const currentTime = Date.now();
        const updateLastSpinTime = await prisma.user.update({
          where: { email: body.email },
          data: { lastSpinnedTime: new Date(currentTime) },
        });

        const { lastSpinnedTime } = updateLastSpinTime;
        const ApiResponse = {
            lastSpinnedTime: lastSpinnedTime
        }
        return new NextResponse(JSON.stringify(ApiResponse));
      }
    }
  } catch (error) {
    console.log('Error while setting lastSpinTime:', error);
    throw error;
  }
}
