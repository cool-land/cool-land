/*
  Warnings:

  - You are about to drop the column `botId` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `factor` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `remark` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Reply` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_botId_fkey`;

-- DropIndex
DROP INDEX `Reply_factor_key` ON `Reply`;

-- DropIndex
DROP INDEX `Reply_keyword_key` ON `Reply`;

-- DropIndex
DROP INDEX `Reply_roomId_key` ON `Reply`;

-- AlterTable
ALTER TABLE `Reply` DROP COLUMN `botId`,
    DROP COLUMN `factor`,
    DROP COLUMN `remark`,
    DROP COLUMN `roomId`,
    DROP COLUMN `status`,
    DROP COLUMN `type`;
