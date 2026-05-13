-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "default_status_id" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_default_status_id_fkey" FOREIGN KEY ("default_status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
