/*
  Warnings:

  - The primary key for the `tblHuntersQuests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `tblHuntersQuests` DROP FOREIGN KEY `tblHuntersQuests_questId_fkey`;

-- DropForeignKey
ALTER TABLE `tblHuntersQuests` DROP FOREIGN KEY `tblHuntersQuests_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tblProfiles` DROP FOREIGN KEY `tblProfiles_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tblQuests` DROP FOREIGN KEY `tblQuests_customerId_fkey`;

-- AlterTable
ALTER TABLE `tblHuntersQuests` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tblProfiles` ADD CONSTRAINT `tblProfiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tblUsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblQuests` ADD CONSTRAINT `tblQuests_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `tblUsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblHuntersQuests` ADD CONSTRAINT `tblHuntersQuests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tblUsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblHuntersQuests` ADD CONSTRAINT `tblHuntersQuests_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `tblQuests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
