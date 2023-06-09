/*
  Warnings:

  - You are about to drop the column `token` on the `Bot` table. All the data in the column will be lost.
  - Added the required column `pid` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bot` DROP COLUMN `token`,
    ADD COLUMN `pid` INTEGER NOT NULL;
