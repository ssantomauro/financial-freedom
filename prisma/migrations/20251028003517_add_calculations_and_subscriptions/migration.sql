-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hasLifetimeAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subscriptionDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "calculations" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "calculatorType" TEXT NOT NULL,
    "inputData" JSONB NOT NULL,
    "resultData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calculations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "calculations_userId_idx" ON "calculations"("userId");

-- CreateIndex
CREATE INDEX "calculations_calculatorType_idx" ON "calculations"("calculatorType");

-- CreateIndex
CREATE INDEX "calculations_userId_calculatorType_idx" ON "calculations"("userId", "calculatorType");

-- AddForeignKey
ALTER TABLE "calculations" ADD CONSTRAINT "calculations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
