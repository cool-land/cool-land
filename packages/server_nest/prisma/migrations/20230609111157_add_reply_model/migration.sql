/*
  Warnings:

  - A unique constraint covering the columns `[keyword]` on the table `Reply` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `botId` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remark` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reply` ADD COLUMN `botId` INTEGER NOT NULL,
    ADD COLUMN `factor` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `remark` VARCHAR(191) NOT NULL,
    ADD COLUMN `roomId` INTEGER NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `type` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Reply_keyword_key` ON `Reply`(`keyword`);

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_botId_fkey` FOREIGN KEY (`botId`) REFERENCES `Bot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
