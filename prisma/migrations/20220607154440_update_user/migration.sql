/*
  Warnings:

  - You are about to drop the `HuntersQuests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `HuntersQuests` DROP FOREIGN KEY `HuntersQuests_questId_fkey`;

-- DropForeignKey
ALTER TABLE `HuntersQuests` DROP FOREIGN KEY `HuntersQuests_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Quest` DROP FOREIGN KEY `Quest_customerId_fkey`;

-- DropTable
DROP TABLE `HuntersQuests`;

-- DropTable
DROP TABLE `Quest`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `tblUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `rank` ENUM('COPPER', 'IRON', 'SILVER', 'GOLD', 'PLATINUM', 'MITHRIL', 'ORICHALCUM', 'ADAMANTITE') NOT NULL DEFAULT 'COPPER',
    `exp` INTEGER NOT NULL,
    `coin` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblUsers_email_key`(`email`),
    UNIQUE INDEX `tblUsers_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblQuests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `reward` INTEGER NOT NULL,
    `difficultyLevel` ENUM('F', 'E', 'D', 'C', 'B', 'A', 'A_PLUS', 'A_PLUS_PLUS') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `endAt` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'COMPLETED', 'FROZE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblHuntersQuests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `questId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblQuests` ADD CONSTRAINT `tblQuests_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `tblUsers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblHuntersQuests` ADD CONSTRAINT `tblHuntersQuests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tblUsers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblHuntersQuests` ADD CONSTRAINT `tblHuntersQuests_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `tblQuests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
