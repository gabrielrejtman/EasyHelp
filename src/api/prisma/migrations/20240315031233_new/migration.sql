/*
  Warnings:

  - You are about to alter the column `searchCounter` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `searchCounter` on the `problems` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `searchCounter` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `problems` MODIFY `searchCounter` INTEGER NOT NULL DEFAULT 0;
