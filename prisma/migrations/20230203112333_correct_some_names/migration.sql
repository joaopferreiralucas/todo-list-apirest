/*
  Warnings:

  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Board` DROP FOREIGN KEY `Board_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `Board` DROP FOREIGN KEY `Board_simple_id_fkey`;

-- DropTable
DROP TABLE `Board`;

-- DropTable
DROP TABLE `Cards`;

-- CreateTable
CREATE TABLE `boards` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `simple_id` VARCHAR(191) NOT NULL,
    `admin_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cards` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_simple_id_fkey` FOREIGN KEY (`simple_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
