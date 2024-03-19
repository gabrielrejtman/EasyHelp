/*
  Warnings:

  - You are about to drop the column `role` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `specialists` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `supervisors` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sector` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `specialists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `supervisors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `priority`,
    ADD COLUMN `sector` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `specialists` DROP COLUMN `role`,
    ADD COLUMN `adminId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `supervisors` DROP COLUMN `sector`,
    ADD COLUMN `adminId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `users`;

-- AddForeignKey
ALTER TABLE `supervisors` ADD CONSTRAINT `supervisors_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `specialists` ADD CONSTRAINT `specialists_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
