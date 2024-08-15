/*
  Warnings:

  - A unique constraint covering the columns `[contractId]` on the table `FactoryPairIndexSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FactoryPairIndexSubscription_contractId_key" ON "FactoryPairIndexSubscription"("contractId");
