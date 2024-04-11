/*
  Warnings:

  - Added the required column `idSeller` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameSeller` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberSeller` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "idSeller" INTEGER NOT NULL,
ADD COLUMN     "nameSeller" TEXT NOT NULL,
ADD COLUMN     "numberSeller" TEXT NOT NULL;
