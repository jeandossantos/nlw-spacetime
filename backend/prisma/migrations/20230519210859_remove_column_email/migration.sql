/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "githubId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL
);
INSERT INTO "new_users" ("avatarUrl", "githubId", "id", "login", "name") SELECT "avatarUrl", "githubId", "id", "login", "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_githubId_key" ON "users"("githubId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
