/*
  Warnings:

  - Added the required column `diseaseType` to the `Medicognize` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medicognize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "diseaseType" TEXT NOT NULL,
    "diseaseImage" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    CONSTRAINT "Medicognize_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Medicognize" ("diseaseImage", "id", "result", "userId") SELECT "diseaseImage", "id", "result", "userId" FROM "Medicognize";
DROP TABLE "Medicognize";
ALTER TABLE "new_Medicognize" RENAME TO "Medicognize";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
