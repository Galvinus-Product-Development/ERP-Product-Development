-- CreateTable
CREATE TABLE "Inventory" (
    "inventoryId" UUID NOT NULL,
    "productId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "stockLevel" INTEGER NOT NULL,
    "lastRestockedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "Inventory"("productId");
