-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_specialistId_fkey`;

-- AlterTable
ALTER TABLE `orders` MODIFY `specialistComment` VARCHAR(191) NULL,
    MODIFY `specialistId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_specialistId_fkey` FOREIGN KEY (`specialistId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
