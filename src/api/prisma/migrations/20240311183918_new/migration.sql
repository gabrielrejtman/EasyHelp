/*
  Warnings:

  - You are about to drop the column `id_prob` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `id_supervisor` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `id_prob`,
    DROP COLUMN `id_supervisor`;
