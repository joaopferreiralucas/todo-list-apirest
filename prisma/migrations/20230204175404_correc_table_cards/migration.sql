/*
  Warnings:

  - You are about to drop the `boardscards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `board_id` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `boardscards` DROP FOREIGN KEY `boardscards_board_id_fkey`;

-- DropForeignKey
ALTER TABLE `boardscards` DROP FOREIGN KEY `boardscards_card_id_fkey`;

-- AlterTable
ALTER TABLE `cards` ADD COLUMN `board_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `boardscards`;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `boards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
