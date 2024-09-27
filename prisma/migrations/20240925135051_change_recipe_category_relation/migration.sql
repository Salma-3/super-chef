/*
  Warnings:

  - You are about to drop the `_CategoryToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToRecipe";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
