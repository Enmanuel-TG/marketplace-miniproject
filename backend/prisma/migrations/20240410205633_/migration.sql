/*
  Warnings:

  - You are about to drop the column `nameSeller` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `numberSeller` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "nameSeller",
DROP COLUMN "numberSeller";
