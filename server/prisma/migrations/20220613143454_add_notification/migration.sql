-- CreateTable
CREATE TABLE `tblNotifications` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblNotifications` ADD CONSTRAINT `tblNotifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tblUsers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
