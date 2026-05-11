/*
  Warnings:

  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `name` on the `statuses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `color` on the `statuses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(16)`.
  - You are about to alter the column `description` on the `statuses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `title` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `description` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "statuses" ALTER COLUMN "name" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "color" SET DATA TYPE VARCHAR(16),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "title" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE VARCHAR(42);
