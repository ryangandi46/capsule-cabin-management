-- CreateTable
CREATE TABLE "public"."Unit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_key" ON "public"."Unit"("name");

-- CreateIndex
CREATE INDEX "Unit_type_idx" ON "public"."Unit"("type");

-- CreateIndex
CREATE INDEX "Unit_status_idx" ON "public"."Unit"("status");
