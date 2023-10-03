import prisma from "@/app/lib/prisma";


export async function insertGameHistory(userEmail: string, gameId: string, betAmount: number, betTime: Date, result: string) {
  try {
    const cryptoUser = await prisma.user.findUnique({
        where: {email: userEmail}
    })
    if(cryptoUser){
        const userId = cryptoUser.id;
        const gameHistory = await prisma.cryptoRush.create({
        data: {
            userId,
            gameId,
            betAmount,
            betTime,
            result,
        },
        });
        return gameHistory;  
    }
    
  } catch (error: any) {
    throw new Error(`Error inserting game history: ${error.message}`);
  } finally {
    await prisma.$disconnect(); // Close the Prisma client connection
  }
}
