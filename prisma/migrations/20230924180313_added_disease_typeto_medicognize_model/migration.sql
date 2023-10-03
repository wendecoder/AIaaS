/*
  Warnings:

  - You are about to drop the column `diseaseType` on the `Medicognize` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medicognize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "diseaseImage" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    CONSTRAINT "Medicognize_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Medicognize" ("diseaseImage", "id", "result", "userId") SELECT "diseaseImage", "id", "result", "userId" FROM "Medicognize";
DROP TABLE "Medicognize";
ALTER TABLE "new_Medicognize" RENAME TO "Medicognize";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
