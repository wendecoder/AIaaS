/*
  Warnings:

  - Added the required column `gameId` to the `CryptoRush` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CryptoRush" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "gameId" TEXT NOT NULL,
    "betAmount" REAL NOT NULL,
    "betTime" DATETIME NOT NULL,
    "result" TEXT NOT NULL,
    CONSTRAINT "CryptoRush_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CryptoRush" ("betAmount", "betTime", "id", "result", "userId") SELECT "betAmount", "betTime", "id", "result", "userId" FROM "CryptoRush";
DROP TABLE "CryptoRush";
ALTER TABLE "new_CryptoRush" RENAME TO "CryptoRush";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
