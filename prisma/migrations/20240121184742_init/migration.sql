-- CreateTable
CREATE TABLE "Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text1" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "faceCard" BOOLEAN NOT NULL,
    "box" INTEGER NOT NULL,
    "nextView" DATETIME,
    "personId" INTEGER NOT NULL,
    CONSTRAINT "Word_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    CONSTRAINT "Sentence_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sentence_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SentenceMining" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text1" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    CONSTRAINT "SentenceMining_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
