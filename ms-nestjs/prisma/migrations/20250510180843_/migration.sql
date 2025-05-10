/*
  Warnings:

  - Added the required column `title` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationsType" AS ENUM ('Success', 'Error', 'Warning', 'Information', 'Confirmation', 'Progress', 'Alert', 'Request');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "NotificationsType" NOT NULL DEFAULT 'Information';
