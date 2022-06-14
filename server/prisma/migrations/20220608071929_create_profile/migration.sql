/*
  Warnings:

  - You are about to drop the column `picture` on the `tblUsers` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `tblUsers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `tblUsers_username_key` ON `tblUsers`;

-- AlterTable
ALTER TABLE `tblUsers` DROP COLUMN `picture`,
    DROP COLUMN `username`;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_username_key`(`username`),
    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tblUsers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
