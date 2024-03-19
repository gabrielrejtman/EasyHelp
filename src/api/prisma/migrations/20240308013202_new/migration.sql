/*
  Warnings:

  - You are about to drop the column `adminId` on the `specialists` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `supervisors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `specialists` DROP FOREIGN KEY `specialists_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `supervisors` DROP FOREIGN KEY `supervisors_adminId_fkey`;

-- AlterTable
ALTER TABLE `specialists` DROP COLUMN `adminId`;

-- AlterTable
ALTER TABLE `supervisors` DROP COLUMN `adminId`;
