/*
  Warnings:

  - You are about to drop the column `userId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `refresh_token` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specialistComment` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisorId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_userId_fkey`;

-- DropForeignKey
ALTER TABLE `refresh_token` DROP FOREIGN KEY `refresh_token_userId_fkey`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `userId`,
    ADD COLUMN `specialistComment` TEXT NOT NULL,
    ADD COLUMN `specialistId` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `supervisorId` VARCHAR(191) NOT NULL,
    MODIFY `description` TEXT NOT NULL;

-- DropTable
DROP TABLE `refresh_token`;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_specialistId_fkey` FOREIGN KEY (`specialistId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
