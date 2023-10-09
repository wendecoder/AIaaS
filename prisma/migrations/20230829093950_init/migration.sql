-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "avatar" TEXT
);

-- CreateTable
CREATE TABLE "HomeFortune" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "numberOfRooms" INTEGER NOT NULL,
    "totalAreaCovered" REAL NOT NULL,
    "location" TEXT NOT NULL,
    "proximity" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    CONSTRAINT "HomeFortune_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Medicognize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "diseaseImage" TEXT NOT NULL,
    "diseaseType" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    CONSTRAINT "Medicognize_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AniClassify" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "animalImage" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    CONSTRAINT "AniClassify_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sentix" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "sentence" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    CONSTRAINT "Sentix_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CryptoRush" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "betAmount" REAL NOT NULL,
    "betTime" DATETIME NOT NULL,
    "result" TEXT NOT NULL,
    CONSTRAINT "CryptoRush_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AIsemanticSearch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "userQuery" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    CONSTRAINT "AIsemanticSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
