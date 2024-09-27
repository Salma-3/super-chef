/*
  Warnings:

  - The `servings` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "servings",
ADD COLUMN     "servings" INTEGER NOT NULL DEFAULT 4;
