/*
  Warnings:

  - You are about to drop the column `timesSearched` on the `problems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `problems` DROP COLUMN `timesSearched`,
    ADD COLUMN `searchCounter` INTEGER NOT NULL DEFAULT 0;
