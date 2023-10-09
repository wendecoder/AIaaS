import prisma from "@/app/lib/prisma";

type Game = {
    gameId: string;
    amount: number;
    time: string;
    Result: string; // You can set this based on your logic
  };
  type RequestBody = {
    userEmail: string,
    lastGame: Game,
}
export async function POST(request: Request){
    const body: RequestBody = await request.json();
    console.log(body);
    const User = await prisma.user.findUnique({
        where: {email: body.userEmail}
    })
    if(User){
        const userId = User.id;
        const game = body.lastGame;
        const isoFormattedTime = new Date().toISOString();
        const response = await prisma.cryptoRush.create({
            data: {
                userId: Number(userId),
                gameId: game.gameId,
                betAmount: game.amount,
                betTime: isoFormattedTime,
                result: game.Result,
            }
        })
    }
    

}