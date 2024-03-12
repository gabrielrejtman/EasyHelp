/*
  Warnings:

  - Added the required column `priority` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `priority` VARCHAR(191) NOT NULL;
