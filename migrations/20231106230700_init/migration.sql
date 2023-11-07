/*
  Warnings:

  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "name",
ADD COLUMN     "thumbnailURL" TEXT,
ADD COLUMN     "title" VARCHAR(240) NOT NULL;
