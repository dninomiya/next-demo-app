/*
  Warnings:

  - You are about to alter the column `name` on the `Pet` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(240)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(240)`.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "health" INTEGER NOT NULL DEFAULT 100,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(240);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(240);
