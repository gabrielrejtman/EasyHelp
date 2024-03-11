/*
  Warnings:

  - Added the required column `adminId` to the `specialists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `supervisors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `specialists` ADD COLUMN `adminId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `supervisors` ADD COLUMN `adminId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `supervisors` ADD CONSTRAINT `supervisors_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `specialists` ADD CONSTRAINT `specialists_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
