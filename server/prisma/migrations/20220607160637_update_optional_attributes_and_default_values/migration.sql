/*
  Warnings:

  - The primary key for the `tblQuests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tblUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `tblHuntersQuests` DROP FOREIGN KEY `tblHuntersQuests_questId_fkey`;

-- DropForeignKey
ALTER TABLE `tblHuntersQuests` DROP FOREIGN KEY `tblHuntersQuests_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tblQuests` DROP FOREIGN KEY `tblQuests_customerId_fkey`;

-- AlterTable
ALTER TABLE `tblHuntersQuests` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `questId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tblQuests` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `reward` INTEGER NOT NULL DEFAULT 0,
    MODIFY `customerId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tblUsers` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `picture` VARCHAR(191) NULL,
    MODIFY `exp` INTEGER NOT NULL DEFAULT 0,
    MODIFY `coin` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tblQuests` ADD CONSTRAINT `tblQuests_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `tblUsers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblHuntersQuests` ADD CONSTRAINT `tblHuntersQuests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tblUsers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblHuntersQuests` ADD CONSTRAINT `tblHuntersQuests_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `tblQuests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
