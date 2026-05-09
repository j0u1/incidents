/*
  Warnings:

  - You are about to drop the column `tickets_id` on the `statuses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "statuses" DROP CONSTRAINT "statuses_tickets_id_fkey";

-- DropIndex
DROP INDEX "statuses_tickets_id_key";

-- AlterTable
ALTER TABLE "statuses" DROP COLUMN "tickets_id";

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "status_id" TEXT;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
