/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specialists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supervisors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `specialists` DROP FOREIGN KEY `specialists_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `supervisors` DROP FOREIGN KEY `supervisors_adminId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('ADMIN', 'SUPERVISOR', 'SPECIALIST') NOT NULL;

-- DropTable
DROP TABLE `Permission`;

-- DropTable
DROP TABLE `Role`;

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `specialists`;

-- DropTable
DROP TABLE `supervisors`;
