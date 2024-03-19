/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `problemId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `problemId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `problems` MODIFY `description` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `orders_userId_key` ON `orders`(`userId`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_problemId_fkey` FOREIGN KEY (`problemId`) REFERENCES `problems`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
