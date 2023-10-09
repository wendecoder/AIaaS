import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

type RequestBody = {
    email: string;
    balance: number;
}

export async function POST(request:Request){

    const body:RequestBody = await request.json();

    try{

        const user = await prisma.user.findUnique({
            where: {email: body.email},
            select: {balance: true},
        });

        if(!user){
            throw new Error('User not found');
        }

        const currentBalance = user.balance;

        // Check if the current balance is greater than or equal to the deduction amount
        if (currentBalance >= body.balance) {
          // Calculate the new balance after deduction
          const newBalance = currentBalance - body.balance;
    
          // Update the user's balance in the database
          const updatedUser = await prisma.user.update({
            where: { email: body.email },
            data: { balance: newBalance },
          });
        // console.log(updatedUser)
        const { balance } = updatedUser;
        console.log(balance);
        const ApiResponse = {
            userBalance: balance,
        }
          return new NextResponse(JSON.stringify(ApiResponse));
        } else {
          throw new Error('Insufficient balance');
        }
      } catch (error) {
        // Handle any errors, e.g., log the error
        console.error('Error deducting balance:', error);
        throw error;
      }
}