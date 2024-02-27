-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "item" INTEGER NOT NULL,
    "units" INTEGER NOT NULL,
    "subscribers" INTEGER NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);
