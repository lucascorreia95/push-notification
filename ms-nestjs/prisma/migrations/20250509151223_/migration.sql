/*
  Warnings:

  - You are about to drop the column `publicKey` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `queueName` on the `Users` table. All the data in the column will be lost.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_queueName_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "publicKey",
DROP COLUMN "queueName",
ADD COLUMN     "password" TEXT NOT NULL;
