/*
  Warnings:

  - You are about to drop the column `id_admin` on the `problemas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ocorrencias` DROP FOREIGN KEY `ocorrencias_id_prob_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencias` DROP FOREIGN KEY `ocorrencias_id_supervisor_fkey`;

-- DropForeignKey
ALTER TABLE `problemas` DROP FOREIGN KEY `problemas_id_admin_fkey`;

-- AlterTable
ALTER TABLE `problemas` DROP COLUMN `id_admin`;
