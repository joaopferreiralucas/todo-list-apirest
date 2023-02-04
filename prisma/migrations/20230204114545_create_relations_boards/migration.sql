/*
  Warnings:

  - You are about to drop the column `admin_id` on the `boards` table. All the data in the column will be lost.
  - You are about to drop the column `simple_id` on the `boards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `boards` DROP FOREIGN KEY `boards_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `boards` DROP FOREIGN KEY `boards_simple_id_fkey`;

-- AlterTable
ALTER TABLE `boards` DROP COLUMN `admin_id`,
    DROP COLUMN `simple_id`;

-- CreateTable
CREATE TABLE `usersboards` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `board_id` VARCHAR(191) NOT NULL,
    `user_level` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boardscards` (
    `id` VARCHAR(191) NOT NULL,
    `board_id` VARCHAR(191) NOT NULL,
    `card_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usersboards` ADD CONSTRAINT `usersboards_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersboards` ADD CONSTRAINT `usersboards_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `boards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boardscards` ADD CONSTRAINT `boardscards_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `boards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boardscards` ADD CONSTRAINT `boardscards_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `cards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
