/*
  Warnings:

  - You are about to drop the column `photo` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "photo",
ADD COLUMN     "photos" TEXT[];
